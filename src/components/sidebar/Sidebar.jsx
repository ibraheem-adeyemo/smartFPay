import React from 'react';
import { Box, VStack, Image, Link, Flex, Text } from '@chakra-ui/react';
import { FaHome, FaUsers, FaList, FaFileAlt } from 'react-icons/fa';
import { imageUrl } from '../../constants/imagesUrl';
import { RxDashboard } from "react-icons/rx";
import { PiUsers, PiFoldersBold, PiNotepadBold, PiTrendUpBold, PiBrowsersBold } from "react-icons/pi";
import { GrNotification } from "react-icons/gr";
import { RiUserSettingsLine } from "react-icons/ri";
import { Link as RouterLink, NavLink, useLocation } from 'react-router-dom';
import { pageLinks } from '../../constants/pageLinks';

const Sidebar = () => {

    const location = useLocation();
    // const isActive = location.pathname === to;

    const sidebarContent = [
        {
            name: 'Dashboard',
            icon: RxDashboard,
            href: pageLinks.dashboard,
        },
        {
            name: 'User Management',
            icon: PiUsers,
            href: pageLinks.userManagement,
        },
        {
            name: 'Control Management',
            icon: FaList,
            href: pageLinks.controlManagement,
        },
        // {
        //     name: 'Limit Management',
        //     icon: FaList,
        //     href: '/',
        // },
        {
            name: 'Customer Information',
            icon: PiFoldersBold,
            href: pageLinks.customerInformation,
        },
        {
            name: 'Audit Trail',
            icon: PiNotepadBold,
            href: pageLinks.auditTrail,
        },
        {
            name: 'Transactions',
            icon: PiTrendUpBold,
            href: pageLinks.transactions,
        },
        {
            name: 'Report',
            icon: PiBrowsersBold,
            href: pageLinks.reports,
        },
        {
            name: 'Notification',
            icon: GrNotification,
            href: pageLinks.notification,
        },
        {
            name: 'Roles Management',
            icon: RiUserSettingsLine,
            href: pageLinks.roleManagement,
        }
    ]

    const activeStyle = {
        backgroundColor: 'light-blue',
        color: '#0275D8',
        border: '1px solid #0275D8'
    }
  return (
    <Box      
    //   w={["80px","80px","80px","100px","350px"]}
      h="100vh"
      bg="white"
      color="text_gray"
      position="fixed"
      fontSize='1.2rem'
      borderRight="1px solid"
      borderColor="main_light_gray"
    >
      {/* <VStack spacing={5} align="flex-start"> */}
        <Box>
        <Box borderBottom="1px solid" borderColor="main_light_gray" >
            <Flex py='10.5px' display={['none','none','none','none','block','block']}>
                <Image src={imageUrl.iswLogo} alt='interswitch logo' width={['200px','200px','200px','200px','200px','200px',]} margin='auto' />
            </Flex>
            <Flex py='10.5px' display={['block','block','block','block','none','none']}>
                <Image src={imageUrl.iswFavLogo} alt='interswitch logo' height='50px' margin='auto' />
            </Flex>
        </Box>
        <VStack spacing={3} align="flex-start" pt={10} as="nav">
            {sidebarContent.map((item, index) => (
                <Link key={index} as={RouterLink} to={item.href} borderRadius='7px' p='10px 20px' mr='20px' display="flex" style={location.pathname === item.href ? activeStyle : {}} alignItems="center" marginLeft='30px'>
                    <item.icon /> <Text ml='20px' display={['none','none','none','none','block','block']}>{item.name}</Text>
                </Link>
        ))}
        </VStack>      
        </Box>            
      {/* </VStack> */}
    </Box>
  );
};

export default Sidebar;
