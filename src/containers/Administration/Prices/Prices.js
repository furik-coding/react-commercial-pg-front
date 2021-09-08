import { AdminTopLayout } from '../AdminTopLayout/AdminTopLayout';
import { routes } from '../../../routes';
import React from 'react';

const Prices = () => {
  return (
    <AdminTopLayout activeRoute={routes.administration.prices} buttonName="Сохранить изменения">
    </AdminTopLayout>
  );
};
export default Prices;
