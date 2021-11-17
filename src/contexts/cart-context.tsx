import React, { useContext } from 'react';
import { ICardResponse, IExceptionResponse } from '@onlineplasiyer/op-web-fronted';
import { useGetCart } from '@/queries/use-get-cart';
import { RefetchOptions, QueryObserverResult } from 'react-query';
import { useAuth } from './auth-context';

const CartContextContext = React.createContext(
  {} as {
    cart: ICardResponse | undefined;
    count: number;
    setCart: (count: ICardResponse) => void;
    removeCart: () => void;
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<ICardResponse, IExceptionResponse>>;
    cartError: any;
    cartLoading: boolean;
  },
);

interface CartContextProviderProps {
  children: any;
}

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const { isAuthenticated } = useAuth();
  const { data: cartData, error: cartError, isLoading: cartLoading, refetch } = useGetCart(isAuthenticated);
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
        refetch,
        cartError,
        cartLoading,
      }}
    >
      {children}
    </CartContextContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContextContext);
