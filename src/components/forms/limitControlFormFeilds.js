import { Input } from "@chakra-ui/react";
import DatePicker from "react-datepicker";

export const accountControlFields = [
    { label: 'Transaction Limit Amount', name: 'transactionLimitAmount', type: 'number', placeholder:'Enter amount', component:Input, componentName:Input },
    { label: 'Select Period', name: 'selectedPeriod', component: 'select' , componentName:'select',
        options: [
            { value: 'Daily', label: 'Daily' },
            { value: 'Weekly', label: 'Weekly' },
            { value: 'Monthly', label: 'Monthly' },
        ] ,
    },
    {label: 'Interbank Transaction', name: 'interbankTransaction', component: 'radioGroup', defaultValue:'yes', bgColor: 'none', componentName:'radioGroup',
        options: [
            {label: 'yes', value: 'yes'},
            {label: 'no', value: 'no'},
        ]
    }
  ];

export const timeLimitFields = [
    {label: 'Start Date', name: 'startDate', component: DatePicker, placeholder:'Please Select', componentName:'datePicker'},
    {label: 'End Date', name: 'endDate', component: DatePicker, placeholder:'Please Select', componentName:'datePicker'},
]

export const cardAccountfields = [
    { label: 'Transaction Limit Amount', name: 'transactionLimitAmount', type: 'number', placeholder:'Enter amount', component:Input, componentName:Input },
    { label: 'Select Period', name: 'selectedPeriod', component: 'select', componentName:'select',
        options: [
            { value: 'Daily', label: 'Daily' },
            { value: 'Weekly', label: 'Weekly' },
            { value: 'Monthly', label: 'Monthly' },
        ] ,
    },
    {label: 'Start Date', name: 'startDate', component: DatePicker, placeholder:'Please Select', componentName:'datePicker'},
    {label: 'End Date', name: 'endDate', component: DatePicker, placeholder:'Please Select', componentName:'datePicker'},
    {label: 'Enabled Channels', name: 'enabledChannels', component: 'select', componentName:'select', options: [
        {value:"ATM", label: 'ATM'},
        {value:"POS", label: 'POS'},
        {value:"WEB", label: "WEB"},
        {value:"USSD", label: "USSD"}
    ]},
    {label: 'Enabled Countries', name: 'enabledCountries', component: 'select', componentName:'select', options: [
        {value:"Ghana", label: 'Ghana'},
        {value:"Kenya", label: 'Kenya'},
        {value:"Mozanbique", label: "Mozanbique"},
        {value:"Nigeria", label: "Nigeria"},
        {value:"Uruguay", label: "Uruguay"}
    ]},
    {label: 'Card Status', name: 'cardStatus', component: 'radioGroup', componentName:'radioGroup', defaultValue:'active', bgColor: 'none',
        options: [
            {label: 'Active', value: 'active'},
            {label: 'Blocked', value: 'blocked'},
        ]
    }
]

export const countLimitFields = [
    { label: 'Count Limit ', name: 'countLimit', type: 'number', placeholder:'Enter amount', component:Input, componentName:Input },
    { label: 'Select Period', name: 'selectedPeriod', component: 'select', componentName:'select',
        options: [
            { value: 'Daily', label: 'Daily' },
            { value: 'Weekly', label: 'Weekly' },
            { value: 'Monthly', label: 'Monthly' },
        ] ,
    },
    {label: 'Start Date', name: 'startDate', component: DatePicker, placeholder:'Please Select', componentName:'datePicker'},
    {label: 'End Date', name: 'endDate', component: DatePicker, placeholder:'Please Select', componentName:'datePicker'},
    {label: 'Enabled Channels', name: 'enabledChannels', component: 'select', componentName:'select', options: [
        {value:"ATM", label: 'ATM'},
        {value:"POS", label: 'POS'},
        {value:"WEB", label: "WEB"},
        {value:"USSD", label: "USSD"},
    ]},
    {label: 'Enabled Countries', name: 'enabledCountries',  component: 'select', componentName:'select', options: [
        {value:"Ghana", label: 'Ghana'},
        {value:"Kenya", label: 'Kenya'},
        {value:"Mozanbique", label: "Mozanbique"},
        {value:"Nigeria", label: "Nigeria"},
        {value:"Uruguay", label: "Uruguay"}
    ]},
    {label: 'Card Status', name: 'cardStatus', component: 'radioGroup', componentName: 'radioGroup', defaultValue:'active', bgColor: 'none',
        options: [
            {label: 'Active', value: 'active'},
            {label: 'Blocked', value: 'blocked'},
        ]
    }
]

export const downloadControlDatafeilds = [
    {label: 'Date From', value: '2024-02-12', component: DatePicker, placeholder:'Please Select', componentName:'datePicker' },
    {label: 'Date To', value: '2024-02-12', component: DatePicker, placeholder:'Please Select', componentName:'datePicker' },
]