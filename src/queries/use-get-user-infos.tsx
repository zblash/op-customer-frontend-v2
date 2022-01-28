import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert, userInfosQueryKeys } from '@zblash/op-web-fronted';

async function getUserInfos() {
  return queryEndpoints.getUserInfos();
}

export const useGetUserInfos = (isEnabled: boolean) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(userInfosQueryKeys.all, () => getUserInfos(), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
    enabled: isEnabled,
  });
};
