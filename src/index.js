import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import { extendTheme } from '@chakra-ui/react';
import { overrides } from './theme';
import { BrowserRouter } from 'react-router-dom';

const theme = extendTheme(overrides)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>        
            <ChakraProvider theme={theme}>
            <App />
            </ChakraProvider>      
        </Provider>
    </BrowserRouter>
    )