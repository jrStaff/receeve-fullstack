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

    public async publish(model: Model): Promise<boolean> {
        const event = {
            Message: JSON.stringify(model),
            TopicArn: this.topicArn,
        };

        try {
            console.log(event);
            await this.SNS.publish(event).promise();
        } catch (e) {
            console.log(e);
            throw Error(`Failed to publish event: ${event}`);
        }

        return true;
    }
}

export default SNS;
