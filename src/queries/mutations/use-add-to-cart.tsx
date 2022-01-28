import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, mutationEndPoints, useAlert } from '@zblash/op-web-fronted';
import { useCartContext } from '@/contexts/cart-context';

export interface AddToCartProps {
  id: string;
  quantity: number;
}

async function addToCart(props: AddToCartProps) {
  return mutationEndPoints.addToCard({
    specifyProductId: props.id,
    quantity: props.quantity,
  });
}

export const useAddToCartMutation = () => {
  const { t } = useTranslation();
  const alert = useAlert();
  const { setCart } = useCartContext();

  return useMutation((input: AddToCartProps) => addToCart(input), {
    onSuccess: data => {
      setCart(data);
      alert.show(`${t('Urun sepete eklendi')}`, {
        type: 'success',
      });
    },
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
