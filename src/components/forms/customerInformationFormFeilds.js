import { Input } from "@chakra-ui/react";

export const customerInfoFormFeild = [
    {label: 'Account Number', name: 'accountNumber', type: 'number', placeholder: 'Enter Number', component: Input, componentName: Input, isRequired:true},
    {label: 'Core Banking ID', name: 'coreBankingId', type: 'number', placeholder: 'Enter ID', component: Input, componentName: Input, isRequired:true},
    {label: 'Customer Name', name: 'customerName', type: 'text', placeholder: 'Enter Name', component: Input, componentName: Input, isRequired:true},
    {label: 'Enabled Payment Channels', name: 'enabledPaymentChannels',  component: 'checkBoxGroup', componentName: 'checkBoxGroup', isRequired:true, options: [
        [{label: 'ATM', value: 'ATM'},
        {label: 'USSD', value: 'USSD'},
        {label: 'POS', value: 'POS'}],
        [{label: 'Web', value: 'Web'},
        {label: 'All Channels', value: 'allChannels'}]
    ]},
    {label: 'Status', name: 'subscriptionStatus', component: 'radioGroup', componentName:'radioGroup', isRequired:true, defaultValue:'active', bgColor: 'none',
        options: [
            {label: 'Subscribed', value: 'subscribed'},
            {label: 'Unsubscribed', value: 'unsubscribed'},
        ]
    }
]