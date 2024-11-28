import React from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { ButtonComponent } from './ButtonComponent'
import { pageLinks } from '../../constants/pageLinks'
import { Link, useNavigate } from 'react-router-dom';
import { BsArrowCounterclockwise } from 'react-icons/bs';

export const TableTopComponent = ({tableTopTitle, tableTopText, linkTo, btnText}) => {
  return (
    <Flex py={{xl:'10px', '2xl':'20px', '3xl':'30px'}} px='20px' justifyContent='space-between'>
        <Box width='50%'>
            <Flex>
                <Heading fontSize={{xl:'1.8rem','2xl':'1.5rem','3xl':'2rem'}} mr='20px'>{tableTopTitle}</Heading>
                <Flex alignSelf='center' color='base_popblue' width='50px' pt='7px'>
                    <BsArrowCounterclockwise fontSize='1rem' fontWeight='700' mt='4px' />
                </Flex>
            </Flex>
            <Text mt='10px' color='text_gray'>{tableTopText}</Text>
        </Box>
        <Flex>
            <ButtonComponent size='lg' as={Link} to={linkTo} ml='20px' py='30px' btnText={btnText} />
        </Flex>
    </Flex>
  )
}
