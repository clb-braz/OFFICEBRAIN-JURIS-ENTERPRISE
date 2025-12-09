import { Test, TestingModule } from '@nestjs/testing';
import { ProcessesService } from './processes.service';
import { PrismaService } from '../../prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ProcessesService', () => {
  let service: ProcessesService;
  let prisma: PrismaService;

  const mockPrismaService = {
    processo: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    audiencia: {
      create: jest.fn(),
    },
    prazo: {
      create: jest.fn(),
    },
    andamentoProcessual: {
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProcessesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ProcessesService>(ProcessesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deve criar processo com CNJ válido', async () => {
      const processData = {
        numeroCnj: '00001234567890123456',
        tipoAcao: 'Ação de Cobrança',
        area: 'CIVIL' as any,
      };

      mockPrismaService.processo.findUnique.mockResolvedValue(null);
      mockPrismaService.processo.create.mockResolvedValue({
        id: '1',
        ...processData,
      });

      const result = await service.create(processData as any);

      expect(result).toBeDefined();
      expect(mockPrismaService.processo.create).toHaveBeenCalled();
    });

    it('deve lançar erro para CNJ inválido', async () => {
      const processData = {
        numeroCnj: '12345678901234567890',
        tipoAcao: 'Ação de Cobrança',
        area: 'CIVIL' as any,
      };

      await expect(service.create(processData as any)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findOne', () => {
    it('deve retornar processo encontrado', async () => {
      const processId = '1';
      const mockProcess = {
        id: processId,
        numeroCnj: '0000123-45.2023.8.26.0001',
        tipoAcao: 'Ação de Cobrança',
      };

      mockPrismaService.processo.findUnique.mockResolvedValue(mockProcess);

      const result = await service.findOne(processId);

      expect(result).toEqual(mockProcess);
    });

    it('deve lançar erro se processo não encontrado', async () => {
      mockPrismaService.processo.findUnique.mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

