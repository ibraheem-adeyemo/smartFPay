import React from 'react';
import Layout from './components/layouts/Layout';
import { Box, Heading } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import CustomerInfomation from './pages/CustomerInfomation';
import ControlManagement from './pages/ControlManagement';
import AuditTrail from './pages/AuditTrail';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';
import RolesManagement from './pages/RolesManagement';
import { pageLinks } from './constants/pageLinks';

const App = () => {
  return (
    <Routes>
        <Route path={pageLinks.dashboard} element={<Dashboard />} />
         <Route path={pageLinks.userManagement} element={<UserManagement />} />
        <Route path={pageLinks.customerInformation} element={<CustomerInfomation />} />
        <Route path={pageLinks.controleManagement} element={<ControlManagement />} />
        <Route path={pageLinks.auditTrail} element={<AuditTrail />} />
        <Route path={pageLinks.transactions} element={<Transactions />} />
        <Route path={pageLinks.reports} element={<Reports />} />
        <Route path={pageLinks.notification} element={<Notifications />} />
        <Route path={pageLinks.roleManagement} element={<RolesManagement />} />
    </Routes>
  );
};

export default App;
