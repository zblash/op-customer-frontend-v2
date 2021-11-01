import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints } from '@/utils/api/query-endpoints';
import { useAlert } from '@/utils/hooks';

async function getCustomerCreditSummary() {
  return queryEndpoints.getCredit();
}

export const useGetCustomerCreditSummary = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery('customer-credit-summary', () => getCustomerCreditSummary(), {
    onError: () => {
      alert.show(`${t('forms:login-error')}`, {
        type: 'error',
      });
    },
  });
};
