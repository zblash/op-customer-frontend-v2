import { useMutation } from 'react-query';
import { IExceptionResponse, mutationEndPoints, useAlert } from '@zblash/op-web-fronted';

import { useCartContext } from '@/contexts/cart-context';
import { useTranslation } from 'react-i18next';

export interface CartCheckoutProps {
  sellerIdList: string[];
}

async function cartCheckout(props: CartCheckoutProps) {
  return mutationEndPoints.cartCheckout({
    sellerIdList: props.sellerIdList,
  });
}

export const useCartCheckoutMutation = () => {
  const { t } = useTranslation();
  const alert = useAlert();
  const { removeCart } = useCartContext();

  return useMutation((input: CartCheckoutProps) => cartCheckout(input), {
    onSuccess: () => {
      removeCart();
    },
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
