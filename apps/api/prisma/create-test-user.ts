import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🔧 Criando usuário de teste...');

  const email = 'clb.braz@gmail.com';
  const senha = 'OfficeBrain@2024';
  const hashedPassword = await bcrypt.hash(senha, 10);

  // Verificar se usuário já existe
  const existingUser = await prisma.usuario.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log('✅ Usuário já existe. Atualizando senha...');
    await prisma.usuario.update({
      where: { email },
      data: { senha: hashedPassword },
    });
    console.log(`✅ Senha atualizada para: ${senha}`);
  } else {
    const user = await prisma.usuario.create({
      data: {
        email,
        senha: hashedPassword,
        nome: 'Usuário Teste',
        perfil: 'ADMIN',
        ativo: true,
        oab: 'TESTE123',
      },
    });
    console.log(`✅ Usuário criado com sucesso!`);
    console.log(`   Email: ${email}`);
    console.log(`   Senha: ${senha}`);
  }
}

main()
  .catch((e) => {
    console.error('❌ Erro:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

