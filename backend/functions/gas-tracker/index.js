const fetch = require('node-fetch');

const { ETHERSCAN_API_KEY } = process.env;

exports.handler = async () => {
    const {
        result,
        status,
        message,
    } = await fetch(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`).then(res => res.json());

    if (status === '0' && message === 'NOTOK') {
        return {
            statusCode: 500,
            body: JSON.stringify(result),
        }
    }

    const {
        SafeGasPrice,
        ProposeGasPrice,
        FastGasPrice,
    } = result;

    return {
        statusCode: 200,
        body: JSON.stringify({
            slow: SafeGasPrice,
            average: ProposeGasPrice,
            fast: FastGasPrice,
        }),
    };
};
