import React from 'react';
import { useGetCategories } from '@/queries/use-get-categories';
import { ICategoryResponse } from '@onlineplasiyer/op-web-fronted';
import { useAuth } from './auth-context';

const MainCategoriesContext = React.createContext(
  {} as {
    mainCategories: ICategoryResponse[];
    mainCategoriesError: any;
  },
);

export const MainCategoriesContextProvider = ({ children }: any) => {
  const { isAuthenticated } = useAuth();
  const { data: mainCategories, error: mainCategoriesError } = useGetCategories({ type: 'parent' }, isAuthenticated);

  return (
    <MainCategoriesContext.Provider
      value={{
        mainCategories,
        mainCategoriesError,
      }}
    >
      {children}
    </MainCategoriesContext.Provider>
  );
};

export const useMainCategories = () => React.useContext(MainCategoriesContext);
