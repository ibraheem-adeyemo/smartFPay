import React from 'react';
import { Flex, Text, Box } from "@chakra-ui/react";
import { TbCaretUpDownFilled } from "react-icons/tb";
import { GoDotFill } from "react-icons/go";
import { HiDotsVertical } from "react-icons/hi";
import { ActionOptions } from './CustomerInfoTableAction';

const badgeRed = "#A4251A",
badgeRedBgColor = "#F4B7B5",
badgeGreen = "#36743D"

export const SubscribeComponent = ({isSubscribe}) => {

    const subscriptionText = isSubscribe ? 'Subscribed' : 'Unsubscribed';
    return (<Flex p='8px' borderRadius='10px' width='fit-content' border='solid 1px' style={isSubscribe? {borderColor:badgeGreen, color:badgeGreen, backgroundColor:'#BEF2B9'} : {borderColor:badgeRed, color:badgeRed, backgroundColor:badgeRedBgColor}}>
                <Box alignSelf='center' mr='8px'>
                    <GoDotFill />    
                </Box> <Text>{subscriptionText}</Text>
            </Flex>
    )
  }

export const customerTableColumns = () => {
    return [
        {
            Header: ()=> {
                return (
                    <Flex justifyContent='center'><Text mr='8px'>Date Created</Text> <TbCaretUpDownFilled /></Flex>
                )
            },
            accessor: 'date',
        },
        { 
            Header: 'Account Number', 
            accessor: 'account_number' 
        },
        { 
            Header: 'Customer Name', 
            accessor: 'first_name', // Ensure that this matches the key in your data exactly
            Cell: ({ row }) => {
                const { first_name, last_name } = row.original; // Assuming `Last_name` is another key in your data
                return <Text>{first_name} {last_name}</Text>;
            }
        },
        
        { 
            Header: 'Core Banking ID', 
            accessor: 'core_banking_id', // Ensure that this matches the key in your data exactly
            
        },
        {
            Header: 'Channels',
            accessor: 'channels', // Ensure that this matches the key in your data exactly
        },
        { 
            Header: 'Status', 
            accessor: 'subscribe' ,
            Cell: (props) => {
                return <SubscribeComponent isSubscribe={props.value} />//subscribeComponent({isSubscribe:props.value})
            }
        },
        // {
        //     Header: 'Actions',
        //     id: 'actions', 
        //     disableSortBy: true,
        //     // accessor: '',
        //     Cell: (props) => {
        //         return (
        //             <Box>
        //                 <Text _hover={{cursor:'pointer'}} onClick={() => toggleActiveRow(props.row.id)}>
        //                     <HiDotsVertical />
        //                 </Text>
        //                 {
        //                     activeRow && activeRow === props.row.id && <ActionOptions isShown={activeRow === props.row.id} rowProps={props} onCloseOption={() => setActiveRow(null)} />
        //                 }
        //             </Box>
        //         )
        //     }
        // }
    ]
}
