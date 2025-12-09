import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { PublicLeadDto } from './dto/public-lead.dto';

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaService) {}

  async createPublicLead(dto: PublicLeadDto) {
    const areas = dto.practiceAreas?.length ? dto.practiceAreas : ['Geral'];

    return this.prisma.lead.create({
      data: {
        nomeEscritorio: dto.officeName || 'Não informado',
        nomeAdvogado: dto.name,
        email: dto.email,
        telefone: dto.phone,
        areasAtuacao: areas,
        origem: 'SITE_PUBLIC',
        mensagem: dto.message,
      },
    });
  }

  async create(createLeadDto: CreateLeadDto) {
    const lead = await this.prisma.lead.create({
      data: {
        nomeEscritorio: createLeadDto.nomeEscritorio,
        nomeAdvogado: createLeadDto.nomeAdvogado,
        email: createLeadDto.email,
        telefone: createLeadDto.telefone,
        areasAtuacao: createLeadDto.areasAtuacao,
        mediaNovosClientes: createLeadDto.mediaNovosClientes,
        tamanhoEquipe: createLeadDto.tamanhoEquipe,
        desafiosPrincipais: createLeadDto.desafiosPrincipais,
        mensagem: createLeadDto.mensagem,
        origem: createLeadDto.origem || 'SITE',
      },
    });

    // Enviar notificação (log por enquanto, email será implementado)
    console.log('='.repeat(60));
    console.log('NOVO LEAD RECEBIDO DO SITE');
    console.log('='.repeat(60));
    console.log(`Escritório: ${lead.nomeEscritorio}`);
    console.log(`Advogado: ${lead.nomeAdvogado}`);
    console.log(`Email: ${lead.email}`);
    console.log(`Telefone: ${lead.telefone || 'Não informado'}`);
    console.log(`Áreas: ${lead.areasAtuacao.join(', ')}`);
    console.log(`Equipe: ${lead.tamanhoEquipe || 'Não informado'}`);
    console.log(`Novos Clientes/Mês: ${lead.mediaNovosClientes || 'Não informado'}`);
    if (lead.desafiosPrincipais) {
      console.log(`Desafios: ${lead.desafiosPrincipais}`);
    }
    if (lead.mensagem) {
      console.log(`Mensagem: ${lead.mensagem}`);
    }
    console.log('='.repeat(60));
    console.log('');
    
    // TODO: Implementar envio de email para contato@officebrain.com.br
    // Quando o email institucional estiver configurado, usar nodemailer ou serviço de email

    return lead;
  }

  async findAll() {
    return this.prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.lead.findUnique({
      where: { id },
    });
  }
}

