import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert, productsQueryKeys } from '@onlineplasiyer/op-web-fronted';

async function getProductById(id: string) {
  return queryEndpoints.getProductById({ id });
}

export const useGetProductById = (productId: string) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(productsQueryKeys.details(productId), () => getProductById(productId), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
