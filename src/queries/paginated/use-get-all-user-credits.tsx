import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, paginatedQueryEndpoints, useAlert, creditsQueryKeys } from '@zblash/op-web-fronted';

export interface UseGetAllUserCreditsProps {
  pageNumber: number;
  sortBy?: string;
  sortType?: string;
  userName?: string;
  userId?: string;
}

async function getAllUserCredits(s: UseGetAllUserCreditsProps) {
  return paginatedQueryEndpoints.getAllUserCredits(s);
}

export const useGetAllUserCredits = (s: UseGetAllUserCreditsProps) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(creditsQueryKeys.list(s), () => getAllUserCredits(s), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
