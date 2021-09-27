import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints } from '@/utils/api/query-endpoints';
import { useAlert } from '@/utils/hooks';

async function getProductSpecifyById(id: string) {
  return queryEndpoints.getProductSpecifyById({ id });
}

export const useGetProductSpecifyById = (id: string) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['product-by-id', id], () => getProductSpecifyById(id), {
    onError: () => {
      alert.show(`${t('forms:login-error')}`, {
        type: 'error',
      });
    },
  });
};
