import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert, creditsQueryKeys } from '@zblash/op-web-fronted';

async function getCreditByUser(userId: string) {
  return queryEndpoints.getUsersCreditByUser({ userId });
}

export const useGetCreditByUser = (userId: string) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(creditsQueryKeys.getDetailByUser(userId), () => getCreditByUser(userId), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
