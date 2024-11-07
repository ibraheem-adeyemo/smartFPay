import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { imageUrl } from '../../../constants/imagesUrl'
import { useSelector } from 'react-redux'
import { formatVitualCardContent } from '../../../function'

const VitualCard = () => {
    const { queriedUser } = useSelector(state=> state.userReducer)
    
    const cardHolderName = queriedUser?.virtualCardDetails?.cardHolderName || '######## ########'
    const cardNumber = queriedUser?.virtualCardDetails?.cardNumber || '0000000000000000'
    const expirationDate = queriedUser?.virtualCardDetails?.expirationDate || '00/00'
    
  return (
    <Box bgColor='red.100' width='100%' position='relative'>
        <Image src={imageUrl.virtualCard2} alt="Virtual Card" width='1000px' />
        <Box position='absolute' top='130px' left='60px' py='20px' px='20px' color='white' h='200px' w='100%'>
            <Box fontWeight='bold' fontSize='35px' letterSpacing={4}>{formatVitualCardContent(cardNumber)}</Box>
            <Flex mt='17px' >
                <Box mr='30px'>
                    <Text fontSize={'xs'}>VALID</Text>
                    <Text fontSize={'xs'}>TILL</Text>
                </Box>
                <Flex fontWeight='bold' fontSize='22px'>{expirationDate}</Flex>
            </Flex>
            <Box fontWeight='bold' fontSize='20px' mt='14px' letterSpacing={4}>{cardHolderName}</Box>
        </Box>
    </Box>
  )
}

export default VitualCard