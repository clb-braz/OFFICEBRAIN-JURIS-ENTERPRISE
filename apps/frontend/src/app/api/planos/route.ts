import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Aqui você salvaria os dados no banco de dados
    // Por enquanto, apenas retornamos sucesso
    console.log('Dados recebidos:', data);
    
    // TODO: Salvar no banco de dados usando Prisma
    // await prisma.lead.create({ data });
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Erro ao processar formulário:', error);
    return NextResponse.json(
      { error: 'Erro ao processar formulário' },
      { status: 500 }
    );
  }
}

