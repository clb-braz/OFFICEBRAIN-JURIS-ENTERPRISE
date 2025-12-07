import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.usuario.findUnique({
      where: { email },
      include: {
        workspaces: {
          include: { workspace: true },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais invalidas');
    }

    if (!user.ativo) {
      throw new UnauthorizedException('Usuario desativado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.senha);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais invalidas');
    }

    const { senha, ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.senha);

    // Atualizar ultimo login
    await this.prisma.usuario.update({
      where: { id: user.id },
      data: { ultimoLogin: new Date() },
    });

    const payload = {
      sub: user.id,
      email: user.email,
      nome: user.nome,
      perfil: user.perfil,
      workspaces: user.workspaces.map((m: any) => ({
        id: m.workspace.id,
        nome: m.workspace.nome,
        funcao: m.funcao,
      })),
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    // Salvar refresh token
    await this.prisma.refreshToken.create({
      data: {
        usuarioId: user.id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    // Criar sessao
    await this.prisma.sessaoLogin.create({
      data: {
        usuarioId: user.id,
        token: accessToken,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: user.id,
        email: user.email,
        nome: user.nome,
        perfil: user.perfil,
        avatarUrl: user.avatarUrl,
        workspaces: user.workspaces.map((m: any) => ({
          id: m.workspace.id,
          nome: m.workspace.nome,
          slug: m.workspace.slug,
          funcao: m.funcao,
        })),
      },
    };
  }

  async register(registerDto: RegisterDto) {
    // Verificar se email ja existe
    const existingUser = await this.prisma.usuario.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email ja cadastrado');
    }

    const hashedPassword = await bcrypt.hash(registerDto.senha, 10);

    const user = await this.prisma.usuario.create({
      data: {
        email: registerDto.email,
        senha: hashedPassword,
        nome: registerDto.nome,
        oab: registerDto.oab,
        telefone: registerDto.telefone,
        perfil: registerDto.perfil || 'ADVOGADO',
      },
    });

    const { senha, ...result } = user;
    return result;
  }

  async refreshToken(token: string) {
    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { token },
      include: { usuario: true },
    });

    if (!storedToken || storedToken.revogado || storedToken.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token invalido ou expirado');
    }

    // Revogar token antigo
    await this.prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { revogado: true },
    });

    const payload = {
      sub: storedToken.usuario.id,
      email: storedToken.usuario.email,
      nome: storedToken.usuario.nome,
      perfil: storedToken.usuario.perfil,
    };

    const newAccessToken = this.jwtService.sign(payload);
    const newRefreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    // Salvar novo refresh token
    await this.prisma.refreshToken.create({
      data: {
        usuarioId: storedToken.usuario.id,
        token: newRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    };
  }

  async logout(userId: string, token: string) {
    // Revogar todas as sessoes
    await this.prisma.sessaoLogin.deleteMany({
      where: { usuarioId: userId },
    });

    // Revogar refresh tokens
    await this.prisma.refreshToken.updateMany({
      where: { usuarioId: userId, revogado: false },
      data: { revogado: true },
    });

    return { message: 'Logout realizado com sucesso' };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.usuario.findUnique({
      where: { id: userId },
      include: {
        workspaces: {
          include: { workspace: true },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario nao encontrado');
    }

    const { senha, ...result } = user;
    return result;
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await this.prisma.usuario.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario nao encontrado');
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.senha);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha atual incorreta');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.usuario.update({
      where: { id: userId },
      data: { senha: hashedPassword },
    });

    return { message: 'Senha alterada com sucesso' };
  }
}

