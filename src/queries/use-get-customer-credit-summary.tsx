import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints, useAlert, creditsQueryKeys } from '@zblash/op-web-fronted';

async function getCustomerCreditSummary() {
  return queryEndpoints.getCredit();
}

export const useGetCustomerCreditSummary = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(creditsQueryKeys.summary(), () => getCustomerCreditSummary(), {
    onError: () => {
      alert.show(`${t('forms:login-error')}`, {
        type: 'error',
      });
    },
  });
};
