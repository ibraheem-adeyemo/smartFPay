import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    users: [{
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        virtualCardDetails: {
            cardNumber: '1234567890',
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
            transactionDate: new Date(),
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
            transactionDate: new Date(),
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
            cardNumber: '0034523890',
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
            transactionDate: new Date(),
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
            transactionDate: new Date(),
            transactionType: 'transfer',
        }],
        country: '',
        state: '',
        city: '',
        address: '',
        zipCode: ''
    }
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        removeUser: (state, action) => {
            state.users = state.users.filter(user => user.id!== action.payload);
        },
        updateUser: (state, action) => {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if(index!== -1) {
                state.users[index] = action.payload;
            }
        },
        searchUser: (state, action) => {
            state.users = state.users.filter(user => user.id === action.pay);
        },
        resetQueriedUsers: (state, action) => {
            state.queriedUser = initialState.queriedUser;
        },
        searchUserAccount: (state, action) => {
            state.queriedUser = state.users.filter(user => {
                return user.accountDetails.accountNumber === action.payload.accountNumber.toString();
            })[0]
            
        },
       
        updateQueriedUser: (state, action) => {
            state.queriedUser = action.payload;
        }
    }
})

export const { addUser, removeUser, updateUser, searchUser, searchUserAccount, resetQueriedUsers } = userSlice.actions;
export default userSlice.reducer