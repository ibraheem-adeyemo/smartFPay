import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '../sidebar/Sidebar';
import DashboardHeading from '../headingComponent/DashboardHeading';

const Layout = ({ pageHeading, children }) => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box ml={["80px","80px","80px","100px","250px"]} w="full">
        <Box borderBottom="1px solid" paddingY='10px' borderColor="main_light_gray">
            <DashboardHeading title={pageHeading} firstName={'Omolade'} lastName={'john'} />
        </Box>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
