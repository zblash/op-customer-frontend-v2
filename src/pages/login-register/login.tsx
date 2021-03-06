import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Loading, UIInput, PasswordInput, UILink } from '@zblash/op-web-fronted';
import { useCustomerLoginMutation, LoginInputType } from '@/queries/mutations/auth/use-customer-login';
import { Button } from 'react-bootstrap';
/*
  LoginComponent Helpers
*/
interface LoginComponentProps {}
/*
  LoginComponent Colors // TODO : move theme.json
*/

/*
  LoginComponent Strings
*/

/*
  LoginComponent Styles
*/
const LoginComponent: React.SFC<LoginComponentProps> = () => {
  const { mutate: login, isLoading } = useCustomerLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>();

  function onSubmit({ username, password }: LoginInputType) {
    login({
      username,
      password,
    });
  }

  return (
    <div>
      <form className="w-75 mx-auto mb-3" onSubmit={handleSubmit(onSubmit)}>
        <UIInput
          labelKey="Kullanici Adi"
          labelClassName="font-weight-bold"
          type="text"
          className="mb-4"
          variant="solid"
          {...register('username', {
            required: 'Bu Alan Zorunludur.',
          })}
          errorKey={errors.username?.message}
        />
        <PasswordInput
          labelKey="Şifre"
          labelClassName="font-weight-bold"
          className="mb-5"
          errorKey={errors.password?.message}
          {...register('password', {
            required: 'Bu Alan Zorunludur.',
          })}
        />
        <div>
          <Button type="submit" className="w-100">
            {isLoading ? <Loading color="currentColor" size={24} /> : 'Giriş Yap'}
          </Button>
        </div>
      </form>

      <div className="w-75 mx-auto d-flex justify-content-end">
        <UILink className="text-underline" to="/register">
          Şifremi unuttum
        </UILink>
      </div>
    </div>
  );
};

export { LoginComponent };
