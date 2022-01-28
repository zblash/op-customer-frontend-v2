import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert, statesQueryKeys } from '@zblash/op-web-fronted';

async function getStatesByCity(cityId: string) {
  return queryEndpoints.getStatesByCityId({ cityId });
}

export const useGetStatesByCity = (cityId: string, isEnabled: boolean) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(statesQueryKeys.listByCity(cityId), () => getStatesByCity(cityId), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
    enabled: isEnabled,
  });
};
