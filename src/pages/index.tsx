import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Footer } from '@/components/common/footer/index';
import { Header } from '@/components/common/header/index';
import { FullScreenLoading } from '@onlineplasiyer/op-web-fronted';
import { css } from '@/styled';
import { useAuth } from '@/contexts/auth-context';
import { useMainCategories } from '@/contexts/main-categories-context';
import { useCartContext } from '@/contexts/cart-context';
import { LoginRegisterPage } from './login-register';

const Page404 = React.lazy(() => import('./404-component').then(module => ({ default: module.Page404 })));
const OrdersPage = React.lazy(() => import('./orders/index').then(module => ({ default: module.OrdersPage })));

const OrderPage = React.lazy(() => import('./order/index').then(module => ({ default: module.OrderPage })));

const ProfilePage = React.lazy(() => import('./profile/index').then(module => ({ default: module.ProfilePage })));

const CustomerHome = React.lazy(() =>
  import('./customer-home/index').then(module => ({
    default: module.CustomerHome,
  })),
);

const CategoryProducts = React.lazy(() =>
  import('./category-products').then(module => ({
    default: module.CategoryProducts,
  })),
);

const CreateTicketPage = React.lazy(() =>
  import('./create-ticket/index').then(module => ({
    default: module.CreateTicketPage,
  })),
);

const CartPage = React.lazy(() =>
  import('./cart/index').then(module => ({
    default: module.CartPage,
  })),
);

const CreditActivitiesPage = React.lazy(() =>
  import('./credit-activities/index').then(module => ({
    default: module.CreditActivitiesPage,
  })),
);

const MerchantCreditsPage = React.lazy(() =>
  import('./merchant-credits/index').then(module => ({
    default: module.MerchantCreditsPage,
  })),
);

const MerchantsPage = React.lazy(() => import('./merchants').then(module => ({ default: module.MerchantsPage })));

interface IRoute {
  path: string;
  basePath: string;
  component: React.ComponentClass | React.FunctionComponent;
  disabled?: boolean;
  isPrivate: boolean;
}

export const RoutesList: IRoute[] = [
  { path: '/', basePath: '/', component: CustomerHome, isPrivate: true },
  { path: '/create-ticket', basePath: '/create-ticket', component: CreateTicketPage, isPrivate: true },
  { path: '/orders/:userId?', basePath: '/orders', component: OrdersPage, isPrivate: true },
  { path: '/order/:orderId', basePath: '/order', component: OrderPage, isPrivate: true },
  { path: '/profile', basePath: '/profile', component: ProfilePage, isPrivate: true },
  {
    path: '/category-products/:categoryId',
    basePath: '/category-products',
    component: CategoryProducts,
    isPrivate: true,
  },
  {
    path: '/credits',
    basePath: '/credits',
    component: MerchantCreditsPage,
    isPrivate: true,
  },
  {
    path: '/credit-activities',
    basePath: '/credit-activities',
    component: CreditActivitiesPage,
    isPrivate: true,
  },
  { path: '/merchants', basePath: '/merchants', component: MerchantsPage, isPrivate: true },
  { path: '/customer/home', basePath: '/customer/home', component: CustomerHome, isPrivate: true },
  { path: '/cart', basePath: '/cart', component: CartPage, isPrivate: true },
  { path: '/login', basePath: '/login', component: LoginRegisterPage, isPrivate: false },
  { path: '/register', basePath: '/register', component: LoginRegisterPage, isPrivate: false },
];
const opacityLoading = css`
  opacity: 0.7;
`;
const Routes = React.memo(() => {
  const { isAuthenticated, userDetails, logout } = useAuth();
  const { mainCategories } = useMainCategories();
  const { count: cartCount } = useCartContext();

  return (
    <>
      <Header
        mainCategories={mainCategories}
        isAuthenticated={isAuthenticated}
        userDetails={userDetails}
        logout={logout}
        cartCount={cartCount}
      />
      <div style={{ minHeight: '100%' }}>
        <React.Suspense fallback={<FullScreenLoading className={opacityLoading} />}>
          <Switch>
            {RoutesList.map(route => (
              <Route key={route.path} path={route.path} component={route.component} exact />
            ))}
            <Route component={Page404} />
          </Switch>
        </React.Suspense>
      </div>
      <Footer />
    </>
  );
});

export default Routes;
