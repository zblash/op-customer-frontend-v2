import { useMutation } from 'react-query';

import { IExceptionResponse } from '@/utils/api/api-models';
import { useAlert } from '@/utils/hooks';
import { mutationEndPoints } from '@/utils/api/mutation-endpoints';
import { useCartContext } from '@/contexts/cart-context';
import { useTranslation } from 'react-i18next';

export interface RemoveCartItemProps {
  id: string;
}

async function removeCartItem(props: RemoveCartItemProps) {
  return mutationEndPoints.removeItemFromCart({
    id: props.id,
  });
}

export const useRemoveCartItemMutation = () => {
  const { setCart } = useCartContext();
  const { t } = useTranslation();
  const alert = useAlert();

  return useMutation((input: RemoveCartItemProps) => removeCartItem(input), {
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
