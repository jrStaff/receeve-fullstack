import Publishable from "../../domain/models/publishable";

export default class MailgunPublishable implements Publishable {
    public type: string;
    public timestamp: number;
    public provider: string;

    constructor(type: string, timestamp: number) {
        this.type = type;
        this.timestamp = timestamp;
        this.provider = "Mailgun";
    }
}
