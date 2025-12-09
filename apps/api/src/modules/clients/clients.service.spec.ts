import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { PrismaService } from '../../prisma/prisma.service';
import { BadRequestException, ConflictException } from '@nestjs/common';

describe('ClientsService', () => {
  let service: ClientsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    cliente: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deve criar cliente PF com CPF válido', async () => {
      const clientData = {
        tipo: 'FISICA',
        nome: 'João Silva',
        cpfCnpj: '12345678909',
        email: 'joao@example.com',
      };

      mockPrismaService.cliente.findUnique.mockResolvedValue(null);
      mockPrismaService.cliente.create.mockResolvedValue({
        id: '1',
        ...clientData,
        cpfCnpj: '123.456.789-09',
      });

      const result = await service.create(clientData);

      expect(result).toBeDefined();
      expect(mockPrismaService.cliente.create).toHaveBeenCalled();
    });

    it('deve lançar erro para CPF inválido', async () => {
      const clientData = {
        tipo: 'FISICA',
        nome: 'João Silva',
        cpfCnpj: '12345678900',
      };

      await expect(service.create(clientData)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('deve lançar erro se cliente já existe', async () => {
      const clientData = {
        tipo: 'FISICA',
        nome: 'João Silva',
        cpfCnpj: '12345678909',
      };

      mockPrismaService.cliente.findUnique.mockResolvedValue({
        id: '1',
        cpfCnpj: '123.456.789-09',
      });

      await expect(service.create(clientData)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});

