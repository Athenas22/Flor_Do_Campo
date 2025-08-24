import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  // Carregar favoritos do localStorage na inicialização
  useEffect(() => {
    const savedFavorites = localStorage.getItem('florDoCampo_favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      }
    }
  }, []);

  // Salvar favoritos no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('florDoCampo_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (productId: number) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(productId)) {
        return prevFavorites.filter(id => id !== productId);
      } else {
        return [...prevFavorites, productId];
      }
    });
  };

  const isFavorite = (productId: number) => {
    return favorites.includes(productId);
  };

  const getFavoritesCount = () => {
    return favorites.length;
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoritesCount
  };
};
