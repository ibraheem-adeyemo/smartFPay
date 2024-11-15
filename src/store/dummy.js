export const dummy = {
    users: [{
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        virtualCardDetails: {
            cardNumber: '1234567890234567',
            cardHolderName: 'Olivia Nwachinemere',
            expirationDate: '12/24',
            cvv: '123'
        },
        accountDetails: {
            accountNumber: '3235567190',
            accountName: 'Olivia Nwachinemere',
            accountType: 'savings',
            accountBalance: 10000,
        },
        transactions: [{
            id: 1,
            amount: 1000,
            transactionDate: new Date().toISOString(),
            transactionType: 'deposit',
        }],
        country: 'NIG',
        state: 'Lagos',
        city: 'Lagos',
        address: '123 Main St',
        zipCode: '12345',        
    }, {
        id: 2,
        name: 'Jane Smith',
        email: 'chinedudamilare@example.com',
        virtualCardDetails: {
            cardNumber: '9876543210987654',
            cardHolderName: 'Chinedu Damilare',
            expirationDate: '01/25',
            cvv: '456'
        },
        accountDetails: {
            accountNumber: '6234347890',
            accountName: 'Jane Smith',
            accountType: 'savings',
            accountBalance: 10000,
        },
        transactions: [{
            id: 2,
            amount: 500,
            transactionDate: new Date().toISOString(),
            transactionType: 'withdrawal',
        }],
        country: 'KEN',
        state: 'Nairobi',
        city: 'Nairobi',
        address: '456 Elm St',
        zipCode: '67890'
    },
    {
        id: 3,
        name: 'Alice Johnson',
        email: 'kemiadeyi@example.com',
        virtualCardDetails: {
            cardNumber: '0034523890654321',
            cardHolderName: 'Oluwakemi Adeyi',
            expirationDate: '02/26',
            cvv: '789'
        },
        accountDetails: {
            accountNumber: '5234997090',
            accountName: 'Oluwakemi Adeyi',
            accountType: 'savings',
            accountBalance: 10000,
        },
        transactions: [{
            id: 3,
            amount: 200,
            transactionDate: new Date().toISOString(),
            transactionType: 'transfer',
        }],
        country: 'GHA',
        state: 'Ashanti',
        city: 'Accra',
        address: '789 Oak St',
        zipCode: '32109'
    }],
    queriedUser: {
        id: null,
        name: '',
        email: '',
        virtualCardDetails: {
            cardNumber: '',
            cardHolderName: '',
            expirationDate: '',
            cvv: ''
        },
        accountDetails: {
            accountNumber: '',
            accountName: '',
            accountType: 'savings',
            accountBalance: 0,
        },
        transactions: [{
            id: NaN,
            amount: 0,
            transactionDate: new Date().toISOString(),
            transactionType: 'transfer',
        }],
        country: '',
        state: '',
        city: '',
        address: '',
        zipCode: ''
    },
    customerInfo: [
        {
            date:"09/09/2024",
            first_name:"Homer",
            last_name:"McGivena",
            account_number:1409345689,
            core_banking_id:88543607,
            channels:"ATM,POS,WEB,USSD,Cards",
            subscribe:true
        },
        {
            date:"05/09/2024",
            first_name:"Asher",
            last_name:"Pyson",
            account_number:1409345689,
            core_banking_id:85432607,
            channels:"ATM,POS,WEB,USSD,Cards",
            subscribe:false
        },
        {
            date:"10/09/2024",
            first_name:"Celestia_check",
            last_name:"Ollerhad",
            account_number:1409345689,
            core_banking_id:85026079,
            channels:"ATM,POS,WEB,USSD,Cards",
            subscribe:true
        },
        {
            date:"09/13/2024",
            first_name:"Erma",
            last_name:"Ianinotti",
            account_number:1319345689,
            core_banking_id:18543600,
            channels:"ATM,POS,WEB,USSD,Cards",
            subscribe:true
        },
        {
            date:"07/12/2024",
            first_name:"Imogene_check",
            last_name:"Ablitt",
            account_number:1014093456,
            core_banking_id:85426078,
            channels:"ATM,POS,WEB,USSD,Cards",
            subscribe:true
        },
        {
            date:"10/13/2024",
            first_name:"Karlene",
            last_name:"Morales",
            account_number:1140956890,
            core_banking_id:85412607,
            channels:"ATM,POS,WEB,USSD,Cards",
            subscribe:true
        }
    ]
}