import { useMutation } from 'react-query';

import { useAlert } from '@/utils/hooks';
import { IExceptionResponse } from '@/utils/api/api-models';
import { mutationEndPoints } from '@/utils/api/mutation-endpoints';
import { useCartContext } from '@/contexts/cart-context';
import { useTranslation } from 'react-i18next';

export interface CartSetPaymentProps {
  paymentOption: string;
  holderId: string;
}

async function cartSetPayment(props: CartSetPaymentProps) {
  return mutationEndPoints.cartSetPayment({
    paymentOption: props.paymentOption,
    holderId: props.holderId,
  });
}

export const useCartSetPaymentMutation = () => {
  const { setCart } = useCartContext();
  const { t } = useTranslation();
  const alert = useAlert();

  return useMutation((input: CartSetPaymentProps) => cartSetPayment(input), {
    onSuccess: data => {
      setCart(data);
      alert.show(`${t(`${'Sepet guncellendi'}`)}`, {
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
