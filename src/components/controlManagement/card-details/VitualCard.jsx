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
    <Box width='100%' position='relative'>
        <Image src={imageUrl.virtualCard2} alt="Virtual Card" width='600px' />
        <Box position='absolute' top={{xl:'80px', '2xl':'130px','3xl':'130px',}} left={{xl:'10px', '2xl':'30px',}} py='20px' px='20px' color='white' h='200px' w='100%'>
            <Box fontWeight='bold' fontSize={{xl:'1.3rem','2xl':'2rem','3xl':'2rem'}} letterSpacing={4}>{formatVitualCardContent(cardNumber)}</Box>
            <Flex mt={{xl:'10px', '2xl':'22px','3xl':'22px'}} >
                <Box mr='30px'>
                    <Text fontSize={'xs'}>VALID</Text>
                    <Text fontSize={'xs'}>TILL</Text>
                </Box>
                <Flex fontWeight='bold' fontSize='22px'>{expirationDate}</Flex>
            </Flex>
            <Box fontWeight='bold' fontSize='18px' mt={{xl:'10px', '2xl':'20px',}} letterSpacing={2}>{cardHolderName}</Box>
        </Box>
    </Box>
  )
}

export default VitualCard