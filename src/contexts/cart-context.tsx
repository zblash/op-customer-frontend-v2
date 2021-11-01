import React, { useContext } from 'react';
import { ICardResponse } from '@/utils/api/api-models';
import { useAuth } from './auth-context';
import { useGetCart } from '@/queries/use-get-cart';

const CartContextContext = React.createContext(
  {} as {
    cart: ICardResponse | undefined;
    count: number;
    setCart: (count: ICardResponse) => void;
    removeCart: () => void;
  },
);

interface CartContextProviderProps {
  children: any;
}

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const { isAuthenticated } = useAuth();
  const { data: cartData, error: cartError, isLoading: cartLoading } = useGetCart(isAuthenticated);
  const [cart, setCart] = React.useState<ICardResponse | undefined>();
  const removeCart = () => {
    setCart(undefined);
  };

  React.useEffect(() => {
    if (!cartLoading && !cartError) {
      setCart(cartData);
    }
  }, [cartData, cartError, cartLoading]);

  return (
    <CartContextContext.Provider
      value={{
        count: cart?.quantity || 0,
        cart,
        setCart,
        removeCart,
      }}
    >
      {children}
    </CartContextContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContextContext);
