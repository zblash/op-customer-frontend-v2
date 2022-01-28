import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
import {
  mutationEndPoints,
  IRegisterResponse,
  IExceptionResponse,
  ICustomerRegisterRequest,
  useAlert,
} from '@zblash/op-web-fronted';

async function register(input: ICustomerRegisterRequest) {
  return mutationEndPoints.customerRegister(input);
}

export const useCustomerRegisterMutation = () => {
  const { t } = useTranslation();
  const alert = useAlert();

  return useMutation((input: ICustomerRegisterRequest) => register(input), {
    onSuccess: (data: IRegisterResponse) => {
      alert.show(`${t('Kayıt Işlemi Başarılı')}`, {
        type: 'success',
      });
    },
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
