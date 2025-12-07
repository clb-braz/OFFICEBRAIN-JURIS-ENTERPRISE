import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SearchArticleDto } from './dto/search-article.dto';

@Injectable()
export class LegislationService {
  constructor(private prisma: PrismaService) {}

  async findAllLegislations() {
    return this.prisma.legislacao.findMany({
      where: { vigente: true },
      include: {
        _count: {
          select: { artigos: true },
        },
      },
      orderBy: { nome: 'asc' },
    });
  }

  async findLegislationByCode(codigo: string) {
    const legislation = await this.prisma.legislacao.findUnique({
      where: { codigo: codigo.toUpperCase() },
      include: {
        artigos: {
          where: { vigente: true },
          orderBy: [
            { livro: 'asc' },
            { numeroArtigo: 'asc' },
          ],
        },
      },
    });

    if (!legislation) {
      throw new NotFoundException(`Legislacao ${codigo} nao encontrada`);
    }

    return legislation;
  }

  async findArticle(codigo: string, numeroArtigo: string) {
    const legislation = await this.prisma.legislacao.findUnique({
      where: { codigo: codigo.toUpperCase() },
    });

    if (!legislation) {
      throw new NotFoundException(`Legislacao ${codigo} nao encontrada`);
    }

    const artigo = await this.prisma.artigoLei.findFirst({
      where: {
        legislacaoId: legislation.id,
        numeroArtigo: numeroArtigo,
        vigente: true,
      },
      include: {
        legislacao: true,
      },
    });

    if (!artigo) {
      throw new NotFoundException(`Artigo ${numeroArtigo} do ${codigo} nao encontrado`);
    }

    return artigo;
  }

  async searchArticles(searchDto: SearchArticleDto) {
    const { query, codigo, livro, limit = 20, offset = 0 } = searchDto;

    const where: any = {
      vigente: true,
    };

    if (codigo) {
      const legislation = await this.prisma.legislacao.findUnique({
        where: { codigo: codigo.toUpperCase() },
      });
      if (legislation) {
        where.legislacaoId = legislation.id;
      }
    }

    if (livro) {
      where.livro = { contains: livro, mode: 'insensitive' };
    }

    if (query) {
      where.OR = [
        { texto: { contains: query, mode: 'insensitive' } },
        { caput: { contains: query, mode: 'insensitive' } },
        { numeroArtigo: { contains: query } },
        { titulo: { contains: query, mode: 'insensitive' } },
        { capitulo: { contains: query, mode: 'insensitive' } },
      ];
    }

    const [artigos, total] = await Promise.all([
      this.prisma.artigoLei.findMany({
        where,
        include: {
          legislacao: {
            select: { codigo: true, nome: true },
          },
        },
        orderBy: [
          { legislacao: { codigo: 'asc' } },
          { livro: 'asc' },
          { numeroArtigo: 'asc' },
        ],
        take: limit,
        skip: offset,
      }),
      this.prisma.artigoLei.count({ where }),
    ]);

    return {
      data: artigos,
      total,
      limit,
      offset,
      hasMore: offset + artigos.length < total,
    };
  }

  async getArticlesByBook(codigo: string, livro: string) {
    const legislation = await this.prisma.legislacao.findUnique({
      where: { codigo: codigo.toUpperCase() },
    });

    if (!legislation) {
      throw new NotFoundException(`Legislacao ${codigo} nao encontrada`);
    }

    return this.prisma.artigoLei.findMany({
      where: {
        legislacaoId: legislation.id,
        livro: { contains: livro, mode: 'insensitive' },
        vigente: true,
      },
      orderBy: { numeroArtigo: 'asc' },
    });
  }

  async getStructure(codigo: string) {
    const legislation = await this.prisma.legislacao.findUnique({
      where: { codigo: codigo.toUpperCase() },
    });

    if (!legislation) {
      throw new NotFoundException(`Legislacao ${codigo} nao encontrada`);
    }

    // Buscar estrutura unica de livros/titulos/capitulos
    const artigos = await this.prisma.artigoLei.findMany({
      where: {
        legislacaoId: legislation.id,
        vigente: true,
      },
      select: {
        livro: true,
        titulo: true,
        capitulo: true,
        secao: true,
      },
      distinct: ['livro', 'titulo', 'capitulo', 'secao'],
      orderBy: [
        { livro: 'asc' },
        { titulo: 'asc' },
        { capitulo: 'asc' },
        { secao: 'asc' },
      ],
    });

    // Organizar em estrutura hierarquica
    const structure: any = {};
    
    for (const artigo of artigos) {
      const livro = artigo.livro || 'Geral';
      const titulo = artigo.titulo || 'Sem titulo';
      const capitulo = artigo.capitulo || 'Sem capitulo';
      
      if (!structure[livro]) {
        structure[livro] = {};
      }
      if (!structure[livro][titulo]) {
        structure[livro][titulo] = [];
      }
      if (!structure[livro][titulo].includes(capitulo)) {
        structure[livro][titulo].push(capitulo);
      }
    }

    return {
      codigo: legislation.codigo,
      nome: legislation.nome,
      structure,
    };
  }

  async getRelatedArticles(codigo: string, numeroArtigo: string, limit = 5) {
    const artigo = await this.findArticle(codigo, numeroArtigo);
    
    // Buscar artigos do mesmo capitulo/titulo
    const related = await this.prisma.artigoLei.findMany({
      where: {
        legislacaoId: artigo.legislacaoId,
        vigente: true,
        id: { not: artigo.id },
        OR: [
          { capitulo: artigo.capitulo },
          { titulo: artigo.titulo },
        ],
      },
      include: {
        legislacao: {
          select: { codigo: true },
        },
      },
      take: limit,
    });

    return related;
  }

  // Metodo para buscar artigos por tema (para IA/RAG)
  async findArticlesByKeywords(keywords: string[], codigoLegislacao?: string) {
    const where: any = {
      vigente: true,
    };

    if (codigoLegislacao) {
      const legislation = await this.prisma.legislacao.findUnique({
        where: { codigo: codigoLegislacao.toUpperCase() },
      });
      if (legislation) {
        where.legislacaoId = legislation.id;
      }
    }

    where.OR = keywords.flatMap(keyword => [
      { texto: { contains: keyword, mode: 'insensitive' } },
      { caput: { contains: keyword, mode: 'insensitive' } },
      { titulo: { contains: keyword, mode: 'insensitive' } },
      { capitulo: { contains: keyword, mode: 'insensitive' } },
    ]);

    return this.prisma.artigoLei.findMany({
      where,
      include: {
        legislacao: {
          select: { codigo: true, nome: true },
        },
      },
      take: 10,
    });
  }
}

