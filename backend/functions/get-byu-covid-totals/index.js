const AWS = require('aws-sdk');
const DDB = new AWS.DynamoDB();

const {TABLE} = process.env;

exports.handler = async () => {
    const {Items: results} = await DDB.scan({
        TableName: TABLE
    }).promise();

    const retVal = results.map(({date: {S: date}, caseCount: {N: caseCount}}) => ({date, caseCount: +caseCount}));

    return {
        statusCode: 200,
        body: JSON.stringify(retVal)
    };
};