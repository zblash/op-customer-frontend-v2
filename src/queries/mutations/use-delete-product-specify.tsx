import { useMutation, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import { mutationEndPoints } from '@/utils/api/mutation-endpoints';
import { ISpecifyProductResponse } from '@/utils/api/api-models';
import { useAlert } from '@/utils/hooks';

async function deleteProductSpecify(id: string) {
  return mutationEndPoints.removeProductSpecify({ id });
}

export const useDeleteProductSpecify = () => {
  const { t } = useTranslation();
  const alert = useAlert();
  const queryClient = useQueryClient();

  return useMutation((id: string) => deleteProductSpecify(id), {
    onSuccess: (data: ISpecifyProductResponse) => {
      queryClient.invalidateQueries('all-product-specifies');
    },
    onError: () => {
      alert.show(`${t('forms:login-error')}`, {
        type: 'error',
      });
    },
  });
};