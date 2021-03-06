import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/auth-context';
import { mutationEndPoints, IExceptionResponse, ILoginResponse, useAlert } from '@zblash/op-web-fronted';

export interface LoginInputType {
  username: string;
  password: string;
}
async function login(input: LoginInputType) {
  return mutationEndPoints.customerLogin({
    username: input.username,
    password: input.password,
  });
}

export const useCustomerLoginMutation = () => {
  const { authenticate } = useAuth();
  const { t } = useTranslation();
  const alert = useAlert();

  return useMutation((input: LoginInputType) => login(input), {
    onSuccess: (data: ILoginResponse) => {
      authenticate(data.accessToken);
      alert.show(`${t('Başarıyla Giriş Yapıldı')}`, {
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
