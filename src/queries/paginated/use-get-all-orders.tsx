import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import {
  IExceptionResponse,
  TOrderStatus,
  paginatedQueryEndpoints,
  useAlert,
  ordersQueryKeys,
} from '@zblash/op-web-fronted';

export interface UseGetAllOrdersProps {
  userId?: string;
  userName?: string;
  startDate?: string;
  pageNumber: number;
  sortBy?: string;
  sortType?: string;
  status?: TOrderStatus;
}

async function getAllOrders(s: UseGetAllOrdersProps) {
  return paginatedQueryEndpoints.getAllOrders(s);
}

export const useGetAllOrders = (s: UseGetAllOrdersProps) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(ordersQueryKeys.list(s), () => getAllOrders(s), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
