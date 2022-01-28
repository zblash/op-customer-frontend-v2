import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert, paymentMethodsQueryKeys } from '@onlineplasiyer/op-web-fronted';

async function getPaymentMethods() {
  return queryEndpoints.getPaymentMethods();
}

export const useGetPaymentMethods = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(paymentMethodsQueryKeys.all, () => getPaymentMethods(), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
