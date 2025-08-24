export interface Product {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  categoria: string;
}

export interface CartItem extends Product {
  quantidade: number;
}

export interface CustomerInfo {
  nome: string;
  email: string;
  telefone: string;
  endereco: {
    cep: string;
    rua: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
}

export interface PaymentInfo {
  tipo: 'cartao' | 'pix' | 'boleto';
  cartao?: {
    numero: string;
    nome: string;
    validade: string;
    cvv: string;
  };
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerInfo;
  payment: PaymentInfo;
  total: number;
  status: 'pendente' | 'confirmado' | 'enviado' | 'entregue';
  date: Date;
}

export type Category = 'todos' | 'cha' | 'cosmetico' | 'alimento' | 'suplemento' | 'oleo';
