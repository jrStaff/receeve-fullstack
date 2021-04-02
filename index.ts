import MailgunEventHandler from './src/domain/mailgunEventHandler';

exports.mailgunEventHandler = async (event: any) => {
  let response = {};
  try {
    await MailgunEventHandler.handle(event);
    response = {
      statusCode: 200,
      body: `Successfully processed Mailgun Event!`,
    };
  }
  catch (e) {
      response = formatError(e);
  } finally {
    return response;
  }
};


const formatError = function(error){
  return {
    "statusCode": error.statusCode,
    "headers": {
      "Content-Type": "text/plain",
      "x-amzn-ErrorType": error.code
    },
    "isBase64Encoded": false,
    "body": error.code + ": " + error.message
  }
}