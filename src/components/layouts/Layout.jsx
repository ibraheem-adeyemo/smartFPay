import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '../sidebar/Sidebar';
import DashboardHeading from '../headingComponent/DashboardHeading';

const Layout = ({ pageHeading, children }) => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box ml={["80px","80px","80px","100px","350px"]} w="full">
        <Box borderBottom="1px solid" paddingY='10px' borderColor="main_light_gray">
            <DashboardHeading title={pageHeading} firstName={'Omolade'} lastName={'john'} />
        </Box>
        <Box p='32px' color='primary-text' bgColor="primary_light_gray" height='92vh' fontFamily='sans-serif'>
            {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
