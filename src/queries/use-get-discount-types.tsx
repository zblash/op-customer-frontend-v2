import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert, discountTypesQueryKeys } from '@zblash/op-web-fronted';

async function getDiscountTypes() {
  return queryEndpoints.getDiscountTypes();
}

export const useGetDiscountTypes = (isEnabled: boolean) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(discountTypesQueryKeys.all, () => getDiscountTypes(), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
    enabled: isEnabled,
  });
};
