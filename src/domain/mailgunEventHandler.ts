
import DynamoDB from "../adapters/AWS/dynamoDB";
import SNS from "../adapters/AWS/SNS";
import MailgunInput from "../adapters/mailgun/mailgun";
import getConfig from "../config/config";
import ModelHandler from "./modelHandler";

const MailgunEventHandler = new ModelHandler(
    new DynamoDB(getConfig().mailgunEventTable),
    new SNS(getConfig().mailgunTopicArn),
    new MailgunInput(),
);

export default MailgunEventHandler;
