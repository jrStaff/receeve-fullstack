import AWS from "aws-sdk";
import Model from "../../domain/models/model";
import Publisher from "../../ports/publisher";

class SNS implements Publisher {
    public topicArn: string;
    public SNS: AWS.SNS;

    constructor(topicArn: string) {
        this.topicArn = topicArn;
        this.SNS = new AWS.SNS();
    }

    public publish(model: Model): Promise<void> {
        const event = {
            Message: JSON.stringify(model),
            TopicArn: this.topicArn,
        };

        return this.SNS.publish(event).promise();
    }
}

export default SNS;
