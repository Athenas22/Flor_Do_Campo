export const formatPrice = (price: number): string => {
  return price.toLocaleString('pt-BR', { 
    style: 'currency', 
    currency: 'BRL' 
  });
};

export const generateOrderId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId);
  element?.scrollIntoView({ behavior: 'smooth' });
};
