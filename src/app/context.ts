import * as React from 'react';
import { ApplicationContextValues } from './helpers';

export const applicationContextInitialValue: ApplicationContextValues = {
  user: {
    name: '',
    email: '',
    id: '',
    role: 'ADMIN',
    username: '',
    isAdmin: false,
    isCustomer: false,
    isMerchant: false,
    activeStates: [],
    address: {
      cityId: '',
      cityName: '',
      stateId: '',
      stateName: '',
      details: '',
      id: '',
    },
  },
  setUserActiveState: () => {},
};

const ApplicationContext = React.createContext<ApplicationContextValues>(applicationContextInitialValue);
function useApplicationContext() {
  return React.useContext(ApplicationContext);
}

export { ApplicationContext, useApplicationContext };