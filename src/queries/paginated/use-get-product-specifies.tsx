import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import {
  IExceptionResponse,
  paginatedQueryEndpoints,
  useAlert,
  productSpecifiesQueryKeys,
} from '@onlineplasiyer/op-web-fronted';

export interface UseGetProductSpecifiesProps {
  userId?: string;
  productId?: string;
  pageNumber: number;
  sortBy?: string;
  sortType?: string;
  isEnabled?: boolean;
}

async function getProductSpecifies(s: UseGetProductSpecifiesProps) {
  return s.productId
    ? paginatedQueryEndpoints.getAllSpecifyProductsByProductId({
        productId: s.productId,
        pageNumber: s.pageNumber,
        sortBy: s.sortBy,
        sortType: s.sortType,
      })
    : paginatedQueryEndpoints.getAllSpecifies({
        pageNumber: s.pageNumber,
        sortBy: s.sortBy,
        sortType: s.sortType,
      });
}

export const useGetProductSpecifies = (s: UseGetProductSpecifiesProps) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(productSpecifiesQueryKeys.list(s), () => getProductSpecifies(s), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
    enabled: s.isEnabled,
  });
};
