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

export const cardAccountfields = [
    { label: 'Transaction Limit Amount', name: 'transactionLimitAmount', type: 'number', placeholder:'Enter amount', component:Input },
    { label: 'Select Period', name: 'selectedPeriod', component: 'select',
        options: [
            { value: 'Daily', label: 'Daily' },
            { value: 'Weekly', label: 'Weekly' },
            { value: 'Monthly', label: 'Monthly' },
        ] ,
    },
    {label: 'Start Date', name: 'startDate', component: 'datePicker', placeholder:'Please Select'},
    {label: 'End Date', name: 'endDate', component: 'datePicker', placeholder:'Please Select'},
    {label: 'Enabled Channels', name: 'enabledChannels', component: 'select', options: [
        {value:"ATM", label: 'ATM'},
        {value:"POS", label: 'POS'},
        {value:"WEB", label: "WEB"},
        {value:"USSD", USSD: "USSD"}
    ]},
    {label: 'Enabled Countries', name: 'enabledCountries', component: 'select', options: [
        {value:"Ghana", label: 'Ghana'},
        {value:"Kenya", label: 'Kenya'},
        {value:"Mozanbique", label: "Mozanbique"},
        {value:"Nigeria", USSD: "Nigeria"},
        {value:"Uruguay", USSD: "Uruguay"}
    ]},
    {label: 'Card Status', name: 'cardStatus', component: 'radioGroup', defaultValue:'active', bgColor: 'none',
        options: [
            {label: 'Active', value: 'active'},
            {label: 'Blocked', value: 'blocked'},
        ]
    }
]

export const countLimitFields = [
    { label: 'Count Limit ', name: 'countLimit', type: 'number', placeholder:'Enter amount', component:Input },
    { label: 'Select Period', name: 'selectedPeriod', component: 'select',
        options: [
            { value: 'Daily', label: 'Daily' },
            { value: 'Weekly', label: 'Weekly' },
            { value: 'Monthly', label: 'Monthly' },
        ] ,
    },
    {label: 'Start Date', name: 'startDate', component: 'datePicker', placeholder:'Please Select'},
    {label: 'End Date', name: 'endDate', component: 'datePicker', placeholder:'Please Select'},
    {label: 'Enabled Channels', name: 'enabledChannels', component: 'select', options: [
        {value:"ATM", label: 'ATM'},
        {value:"POS", label: 'POS'},
        {value:"WEB", label: "WEB"},
        {value:"USSD", USSD: "USSD"}
    ]},
    {label: 'Enabled Countries', name: 'enabledCountries', component: 'select', options: [
        {value:"Ghana", label: 'Ghana'},
        {value:"Kenya", label: 'Kenya'},
        {value:"Mozanbique", label: "Mozanbique"},
        {value:"Nigeria", USSD: "Nigeria"},
        {value:"Uruguay", USSD: "Uruguay"}
    ]},
    {label: 'Card Status', name: 'cardStatus', component: 'radioGroup', defaultValue:'active', bgColor: 'none',
        options: [
            {label: 'Active', value: 'active'},
            {label: 'Blocked', value: 'blocked'},
        ]
    }
]