import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert, statesQueryKeys } from '@zblash/op-web-fronted';

async function getStatesForShippingDays() {
  return queryEndpoints.getAllowedStateForShippingDays();
}

export const useGetStatesForShippingDays = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(statesQueryKeys.forShippingDays(), () => getStatesForShippingDays(), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
    staleTime: 300 * 60 * 1000,
  });
};
