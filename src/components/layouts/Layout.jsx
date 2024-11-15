import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '../sidebar/Sidebar';
import DashboardHeading from '../headingComponent/DashboardHeading';

const Layout = ({ pageHeading, children }) => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box ml={{sm:"80px",md:"80px",lg:"80px",xl:"20rem",'2xl':"20rem",'3xl':"20rem"}} w="full">
        <Box borderBottom="1px solid" paddingY='10px' borderColor="main_light_gray">
            <DashboardHeading title={pageHeading} firstName={'Omolade'} lastName={'john'} />
        </Box>
        <Box px='2rem' color='primary-text' bgColor="primary_light_gray" height='92vh' fontFamily='AvertaRegular'>
            {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
