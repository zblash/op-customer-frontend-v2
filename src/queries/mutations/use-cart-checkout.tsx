import { useMutation } from 'react-query';
import { IExceptionResponse } from '@/utils/api/api-models';
import { useAlert } from '@/utils/hooks';
import { useCartContext } from '@/contexts/cart-context';
import { useTranslation } from 'react-i18next';
import { mutationEndPoints } from '@/utils/api/mutation-endpoints';

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
