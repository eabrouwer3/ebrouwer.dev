const fetch = require('node-fetch');

const { ETHERSCAN_API_KEY } = process.env;

exports.handler = async () => {
    const res = await fetch(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`).then(res => res.json());

    console.log(JSON.stringify(res));

    const {
        result,
        status,
        message,
    } = res;

    if (status === '0' && message === 'NOTOK') {
        return {
            statusCode: 200,
            body: JSON.stringify({
                text: 'Something went wrong... please try again later',
                response_type: 'ephemeral',
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }
    }

    const {
        SafeGasPrice,
        ProposeGasPrice,
        FastGasPrice,
    } = result;

    const text = `:zap: *Fast*: ${FastGasPrice} Gwei\n`
                 + `:walking: *Average*: ${ProposeGasPrice} Gwei\n`
                 + `:turtle: *Slow*: ${SafeGasPrice} Gwei`;

    return {
        statusCode: 200,
        body: JSON.stringify({
            text,
            response_type: 'in_channel',
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    };
};
