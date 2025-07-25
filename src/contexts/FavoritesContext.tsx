import React, { createContext, useContext, ReactNode } from 'react';
import { useFavorites } from '../hooks/useFavorites';

interface FavoritesContextType {
  favorites: number[];
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  getFavoritesCount: () => number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavoritesContext deve ser usado dentro de um FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const favoritesMethods = useFavorites();

  return (
    <FavoritesContext.Provider value={favoritesMethods}>
      {children}
    </FavoritesContext.Provider>
  );
};
