export const dummy = {
    users: [{
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        virtualCardDetails: {
            cardNumber: '1234567890234567',
            cardHolderName: 'John Doe',
            expirationDate: '12/24',
            cvv: '123'
        },
        accountDetails: {
            accountNumber: '3235567190',
            accountName: 'John Doe',
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
        email: 'janesmith@example.com',
        virtualCardDetails: {
            cardNumber: '9876543210987654',
            cardHolderName: 'Jane Smith',
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
        email: 'alicejohnson@example.com',
        virtualCardDetails: {
            cardNumber: '0034523890654321',
            cardHolderName: 'Alice Johnson',
            expirationDate: '02/26',
            cvv: '789'
        },
        accountDetails: {
            accountNumber: '5234997090',
            accountName: 'Alice Johnson',
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
    }
}