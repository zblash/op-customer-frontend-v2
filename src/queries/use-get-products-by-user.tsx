import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert, productsQueryKeys } from '@onlineplasiyer/op-web-fronted';

async function getAllProductsByUser() {
  return queryEndpoints.getAllProducts();
}

export const useGetAllProductsByUser = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(productsQueryKeys.listByUser(), () => getAllProductsByUser(), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
