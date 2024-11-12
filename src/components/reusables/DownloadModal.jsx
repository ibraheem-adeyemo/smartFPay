import React from 'react'
import { ModalComponent } from './Modal'
import { DatePickerComponent } from './DatePicker'
import { Box, Flex, Radio, RadioGroup, Stack, Text, Divider, VStack } from '@chakra-ui/react'
import { imageUrl } from '../../constants/imagesUrl'


const CustomIcon = ({imgUrl, filName}) => (
    <Box
      as="img"
      src={imgUrl}
      alt={`${filName} icon` }
      boxSize="40px" // Set size similar to other icons
      objectFit="contain"
    />
  );

export const DownloadModal = () => {

    const DownloadForm = () => {
        return (
            <VStack 
                divider={<Divider />}
                spacing={5}
                align='stretch'>
                <Box>
                <Flex mb='30px'>                    
                    <DatePickerComponent label='Date From' bgColor='primary_light_gray' size='sm' borderRadius='8px' width='400px' />
                </Flex>
                <Flex>
                    <DatePickerComponent label='Date To' bgColor='primary_light_gray' size='sm' borderRadius='8px' width='400px' />
                </Flex>
                </Box>
                <Box>
                    <RadioGroup defaultValue='pdf'>
                        <Stack>
                        <Radio value='pdf'>
                            <Flex alignItems='center'>
                                <Text mr='30px'>PDF file</Text>
                                {/* <FaFilePdf color='red' fontSize={'30px'} /> */}
                                <CustomIcon imgUrl={imageUrl.pdfFileIcon} filName='PDF file' />
                            </Flex>
                        </Radio>
                        <Radio value='csv'>
                            <Flex alignItems='center'>
                                <Text mr='30px'>CSV file</Text>
                                <CustomIcon imgUrl={imageUrl.csvFileIcon} filName='CSV file' />
                            </Flex>
                        </Radio>
                        <Radio value='excel'>
                            <Flex alignItems='center'>
                                <Text mr='30px'>Excel file</Text>
                                <CustomIcon imgUrl={imageUrl.xlsFileIcon} filName='Excel file' />
                            </Flex>
                        </Radio>
                        </Stack>
                    </RadioGroup>
                </Box>
            </VStack>
        )
    }
  return (
    <ModalComponent modalTitle={'Download Data'} btnContent={'Download Data'} topPosition={'330px'} leftPosition={'500px'}>
        <DownloadForm />       
    </ModalComponent>
  )
}
