let environment = 'dev';

const generateEnvVariables = () => {
    if (environment === 'dev'){
        return {
            host:"https://payment-control-middleware.k13.isw.la:443"
        }
    } else {
        return {
            host:"https://payment-control-middleware.k13.isw.la:443"
        }
    }
}

export default  generateEnvVariables;
