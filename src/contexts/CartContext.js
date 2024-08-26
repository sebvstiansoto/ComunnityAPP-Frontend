import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [totalItems, setTotalItems] = useState(0);

  // Aquí puedes añadir lógica adicional para manejar el carrito si es necesario

  return (
    <CartContext.Provider value={{ totalItems, setTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
