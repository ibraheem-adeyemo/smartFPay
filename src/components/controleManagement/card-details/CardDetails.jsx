import { Box } from '@chakra-ui/react'
import React from 'react'
import VitualCard from './VitualCard'

const CardDetails = (props) => {
    const { cardNumber, expDate, cvv, cardHolderName } = props
  return (
    <Box>
        <VitualCard cardHolderName={cardHolderName} exp={expDate} cardDigits={cardNumber} />
    </Box>
  )
}

export default CardDetails