import React, { createContext, useCallback, useState, useContext } from 'react';

interface SharedContextData {
  ordersUpdated: boolean;
  favoritesUpdated: boolean;
  updateOrders(): void;
  updateFavorites(): void;
}

const SharedContext = createContext<SharedContextData>({} as SharedContextData);

export const SharedProvider: React.FC = ({ children }) => {
  const [ordersUpdated, setOrdersUpdated] = useState(false);
  const [favoritesUpdated, setFavoritesUpdated] = useState(false);

  const updateFavorites = useCallback(() => {
    setFavoritesUpdated(!favoritesUpdated);
  }, [favoritesUpdated]);

  const updateOrders = useCallback(() => {
    setOrdersUpdated(!ordersUpdated);
  }, [ordersUpdated]);

  return (
    <SharedContext.Provider
      value={{ ordersUpdated, favoritesUpdated, updateFavorites, updateOrders }}
    >
      {children}
    </SharedContext.Provider>
  );
};

export function useShared(): SharedContextData {
  const context = useContext(SharedContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
