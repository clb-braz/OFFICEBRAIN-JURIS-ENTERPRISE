import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { LegislationService } from './legislation.service';
import { SearchArticleDto } from './dto/search-article.dto';

@ApiTags('Legislacao')
@Controller('legislation')
export class LegislationController {
  constructor(private legislationService: LegislationService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as legislacoes disponiveis' })
  @ApiResponse({ status: 200, description: 'Lista de legislacoes' })
  async findAll() {
    return this.legislationService.findAllLegislations();
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar artigos por palavra-chave' })
  @ApiQuery({ name: 'query', required: false, description: 'Termo de busca' })
  @ApiQuery({ name: 'codigo', required: false, description: 'Codigo da legislacao (CC, CPC)' })
  @ApiQuery({ name: 'livro', required: false, description: 'Livro da legislacao' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Limite de resultados' })
  @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Offset para paginacao' })
  @ApiResponse({ status: 200, description: 'Artigos encontrados' })
  async search(@Query() searchDto: SearchArticleDto) {
    return this.legislationService.searchArticles(searchDto);
  }

  @Get(':codigo')
  @ApiOperation({ summary: 'Obter legislacao completa por codigo' })
  @ApiResponse({ status: 200, description: 'Legislacao com todos os artigos' })
  @ApiResponse({ status: 404, description: 'Legislacao nao encontrada' })
  async findByCode(@Param('codigo') codigo: string) {
    return this.legislationService.findLegislationByCode(codigo);
  }

  @Get(':codigo/structure')
  @ApiOperation({ summary: 'Obter estrutura da legislacao (livros/titulos/capitulos)' })
  @ApiResponse({ status: 200, description: 'Estrutura hierarquica da legislacao' })
  async getStructure(@Param('codigo') codigo: string) {
    return this.legislationService.getStructure(codigo);
  }

  @Get(':codigo/livro/:livro')
  @ApiOperation({ summary: 'Obter artigos de um livro especifico' })
  @ApiResponse({ status: 200, description: 'Artigos do livro' })
  async getByBook(
    @Param('codigo') codigo: string,
    @Param('livro') livro: string,
  ) {
    return this.legislationService.getArticlesByBook(codigo, livro);
  }

  @Get(':codigo/artigo/:numero')
  @ApiOperation({ summary: 'Obter artigo especifico' })
  @ApiResponse({ status: 200, description: 'Dados do artigo' })
  @ApiResponse({ status: 404, description: 'Artigo nao encontrado' })
  async findArticle(
    @Param('codigo') codigo: string,
    @Param('numero') numero: string,
  ) {
    return this.legislationService.findArticle(codigo, numero);
  }

  @Get(':codigo/artigo/:numero/relacionados')
  @ApiOperation({ summary: 'Obter artigos relacionados' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Artigos relacionados' })
  async getRelated(
    @Param('codigo') codigo: string,
    @Param('numero') numero: string,
    @Query('limit') limit?: number,
  ) {
    return this.legislationService.getRelatedArticles(codigo, numero, limit);
  }
}

