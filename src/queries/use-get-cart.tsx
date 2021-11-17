import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints, IExceptionResponse, useAlert } from '@onlineplasiyer/op-web-fronted';

async function getCart() {
  return queryEndpoints.getCart();
}

export const useGetCart = (isEnabled: boolean) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['user-cart'], () => getCart(), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
    enabled: isEnabled,
  });
};
