let environment = 'dev';

const generateEnvVariables = () => {
    if (environment === 'dev'){
        return {
            host="http://payment-control-middleware.k13.isw.la/"
        }
    } else {
        return {
            host="http://payment-control-middleware.k13.isw.la/"
        }
    }
}

export default  generateEnvVariables;

