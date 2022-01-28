import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert, citiesQueryKeys } from '@zblash/op-web-fronted';

async function getCities() {
  return queryEndpoints.getCities();
}

export const useGetCities = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(citiesQueryKeys.all, () => getCities(), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
