import { Input } from "@chakra-ui/react";

export const accountControlFields = [
    { label: 'Transaction Limit Amount', name: 'transactionLimitAmount', type: 'number', placeholder:'Enter amount', component:Input },
    { label: 'Select Period', name: 'selectedPeriod', component: 'select',
        options: [
            { value: 'Daily', label: 'Daily' },
            { value: 'Weekly', label: 'Weekly' },
            { value: 'Monthly', label: 'Monthly' },
        ] ,
    },
    {label: 'Interbank Transaction', name: 'interbankTransaction', component: 'radioGroup', defaultValue:'yes', bgColor: 'none',
        options: [
            {label: 'yes', value: 'yes'},
            {label: 'no', value: 'no'},
        ]
    }
  ];

export const timeLimitFields = [
    {label: 'Start Date', name: 'startDate', component: 'datePicker', placeholder:'Please Select'},
    {label: 'End Date', name: 'endDate', component: 'datePicker', placeholder:'Please Select'},
  ]