import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { FaChevronDown } from 'react-icons/fa';

const DashboardHeading = (props) => {

    const {title, firstName, lastName} = props
  return (
    <Flex marginInline={['20px','30px','50px','50px','50px' ]}justifyContent='space-between' color="primary-text">
        <Flex>
            <Box>        
                <Heading fontSize={['20px','20px','20px','20px','30px','30px',]}>{title}</Heading>
            </Box>
        </Flex>
        <Flex>
            <Flex width='250px' justifyContent='space-evenly'>
                <Flex flexDir='column' justifyContent='center'>
                    <Heading size={'sm'}>Hi, {firstName}</Heading>
                    <Text size="tag-text">{firstName} {lastName}</Text>
                </Flex>
                <Flex bgColor='light-blue' width='50px' height='50px' color='primary-blue' fontFamily='mono'  fontSize='27px' justifyContent='center' p='5px' borderRadius='50%'>
                    {firstName.charAt(0).toUpperCase()}{lastName.charAt(0).toUpperCase()}
                </Flex>
                <Flex margin='auto 0'>
                    <FaChevronDown />
                </Flex>
            </Flex>
            <Flex></Flex>
        </Flex>
    </Flex>
  )
}

export default DashboardHeading