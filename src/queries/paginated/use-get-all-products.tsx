import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import {
  IExceptionResponse,
  paginatedQueryEndpoints,
  useAlert,
  productsQueryKeys,
} from '@onlineplasiyer/op-web-fronted';

export interface UseGetAllProductsProps {
  userId?: string;
  pageNumber: number;
  sortBy?: string;
  sortType?: string;
}

async function getAllProducts(s: UseGetAllProductsProps) {
  return paginatedQueryEndpoints.getAllProducts(s);
}

export const useGetAllProducts = (s: UseGetAllProductsProps) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(productsQueryKeys.list(s), () => getAllProducts(s), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
