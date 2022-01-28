import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert, shippingDaysQueryKeys } from '@zblash/op-web-fronted';

async function getShippingDays() {
  return queryEndpoints.getShippingDays();
}

export const useGetShippingDays = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(shippingDaysQueryKeys.all, () => getShippingDays(), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
