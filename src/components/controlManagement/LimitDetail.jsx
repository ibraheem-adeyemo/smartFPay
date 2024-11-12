import { Box, Text, Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import BackButton from '../reusables/BackButton';

const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
};

const LimitDetailComp = (props) => {
    const { accountNumber,
         controlType, 
         amount, 
         enabledCountries, 
         frequencyControlRequest,
         transactionControlCount,
         cardStatus,
         controlStartDate,
         controlEndDate,
         createdDate,
         enabledChannel,
         cardExpiry,
         cardMaskedPin
        } = props;

    const CardStatus = ({content}) => {
        const successStyle = {
            color: 'green',
            fontSize: '20px',
            fontWeight: 'bold',
            backgroundColor: 'lightGreen1'
        }
        const errorStyle = {
            color:'red',
            fontSize: '20px',
            fontWeight: 'bold',
            backgroundColor:'red'
        }
        return (
            <Box style={content === 'success'?successStyle:errorStyle} width='150px' borderRadius='8px' p="5px 20px" border='1px solid green'>
                <Text>{content}</Text>
            </Box>
        )
    }

    const limitDetailsArr = [
        {
            label: 'ACCOUNT NUMBER',
            value: accountNumber
        },
        {
            label: 'CONTROL TYPE',
            value: controlType
        },
        {
            label: 'AMOUNT',
            value: amount
        },
        {
            label: 'FREQUENCY CONTROL RESET',
            value: frequencyControlRequest
        },
        {
            label: 'TRANSACTION CONTROL COUNT',
            value: transactionControlCount
        },
        {
            label: 'CARD STATUS',
            value: cardStatus
        },
        {
            label: 'CONTROL START DATE',
            value: controlStartDate
        },
        {
            label: 'CONTROL END DATE',
            value: controlEndDate
        },
        {
            label: 'CREATED DATE',
            value: createdDate
        },
        {
            label: 'CARD MASKED PIN',
            value: cardMaskedPin
        },
        {
            label: 'CARD EXPIRY',
            value: cardExpiry
        },
        {
            label: 'ENABLED CHANNEL',
            value: enabledChannel
        },
        {
            label: 'ENABLED COUNTRIES',
            value: enabledCountries
        },
        {
            label: 'CARD STATUS',
            value: <CardStatus content={cardStatus}/>
        }
    ]

    const chunkedDetails = chunkArray(limitDetailsArr, 3);

  return (
    <Box>
            {chunkedDetails.map((chunk, chunkIndex) => (
                <Flex key={chunkIndex} mb="10px"  alignItems="center">
                    {chunk.map((detail, index) => (
                        <Box key={index} p="2" width='480px'>
                            <Text fontSize='14px' mb='5px' color='text_gray'>{detail.label}</Text>
                            <Text fontWeight={700} fontSize='18px' color='gray1'>{detail.value}</Text>
                        </Box>
                    ))}
                </Flex>
            ))}
        </Box>
  )
}

export const LimitDetail = () => {
    return (
       <Box height='87vh'>
        <BackButton />
            <Box border='1px solid' borderColor='main_light_gray' borderRadius='8px' bg='white' mt='15px' p='20px'>
                <LimitDetailComp accountNumber="1234567890"
                    controlType="Limit"
                    amount="1000.00"
                    enabledCountries={['USA', 'UK', 'Canada']}
                    frequencyControlRequest="Monthly"
                    transactionControlCount="100"
                    cardStatus="success"
                    controlStartDate="01/01/2022"
                    controlEndDate="31/12/2022"
                    createdDate="01/01/2022"
                    enabledChannel="All Channels"
                    cardMaskedPin="1546"
                    cardExpiry="02/22"
                    />
        </Box>
       </Box>
    )
}