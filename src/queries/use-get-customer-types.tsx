import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert, customerTypesQueryKeys } from '@onlineplasiyer/op-web-fronted';

async function getCustomerTypes() {
  return queryEndpoints.getCustomerTypes();
}

export const useGetCustomerTypes = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(customerTypesQueryKeys.all, () => getCustomerTypes(), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
