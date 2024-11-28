import React from 'react'
import { ButtonComponent } from '../reusables/ButtonComponent';
import { TableActionModal } from '../reusables/Modal';
import { Text, Flex, Box } from '@chakra-ui/react';
import { pageLinks } from '../../constants/pageLinks';
import { useNavigation, useNavigate } from 'react-router-dom';
import { HiDotsVertical } from "react-icons/hi";

export const ActionOptions = ({isShown, onCloseOption, rowProps}) => {

    const unSubscribeText = 'This will deactivate Payment Control features temporarily. Are you sure you want to continue?'
    const subscribeText = 'This will enable Payment Control features for this customer. Are you sure you want to continue?'
    const isSubscribed = rowProps?.values?.subscribe

    const navigation = useNavigate()

    const handleViewBtn = () => {
        onCloseOption()
        navigation(`${pageLinks.customerInformation}/${pageLinks.editCustomer}`)
    }
    return (
        <Flex flexDir='column' bgColor='white'  position='absolute' border='1px solid' px='10px' width='160px' right='6rem' display={isShown ?'flex' :'none'} borderColor='main_light_gray' borderRadius={'7px'}>
            <ButtonComponent btnText='Edit Information' backgroundColor='white' onClick={handleViewBtn} _hover={{backgroundColor:'white', color:'main_light_gray'}} color='primary-text' width='fit-content' />
            
            <TableActionModal BtnComp={({onClick})=>(
                <ButtonComponent 
                    btnText={isSubscribed ? 'Unsubscribe' : 'Subscribe'} 
                    onClick={onClick} 
                    backgroundColor='white' 
                    _hover={{backgroundColor:'white', color:'main_light_gray'}} 
                    color='primary-text' 
                    width='fit-content' 
                />
            )}
            modalTitle={isSubscribed?'Unsubribe Customer':'Subscribe Customer'} >
                <Text>{isSubscribed?unSubscribeText:subscribeText}</Text>
            </TableActionModal>
        </Flex>
    )
}

export const ActionComponent = ({rowProps, activeRow, setActiveRow, toggleActiveRow}) => {
    return (
        <Box>
            <Text _hover={{cursor:'pointer'}} onClick={() => toggleActiveRow(rowProps.id)}>
                <HiDotsVertical />
            </Text>
            {
                activeRow && activeRow === rowProps.id && <ActionOptions isShown={activeRow === rowProps.id} rowProps={rowProps} onCloseOption={() => setActiveRow(null)} />
            }
        </Box>
    )
}

