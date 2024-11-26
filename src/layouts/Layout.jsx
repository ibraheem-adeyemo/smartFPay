import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '../components/sidebar/Sidebar';
import DashboardHeading from '../components/headingComponent/DashboardHeading';

const Layout = ({ pageHeading, children }) => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box ml={{sm:"80px",md:"80px",lg:"80px",xl:"14rem",'2xl':"17rem",'3xl':"17rem"}} w="full">
        <Box borderBottom="1px solid" paddingY='10px' borderColor="main_light_gray">
            <DashboardHeading title={pageHeading} firstName={'Omolade'} lastName={'john'} />
        </Box>
        <Box px='2rem' py='2rem' color='primary-text' bgColor="primary_light_gray" minH='92vh' fontFamily='AvertaRegular'>
            {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
