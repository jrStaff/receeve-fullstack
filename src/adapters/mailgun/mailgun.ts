import crypto, { KeyObject } from "crypto";
import getConfig from "../../config/config";
import Input from "../../ports/input";
import MailgunPublishable from "./mailgunPublishable";

class MailgunEncodingError extends Error {
  constructor(message?: string) {
      super(message);
      this.name = MailgunEncodingError.name; // stack traces display correctly now
  }
}

class MailgunEventFormatError extends Error {
  constructor(message?: string) {
      super(message);
      this.name = MailgunEventFormatError.name; // stack traces display correctly now
  }
}

export default class MailgunInput implements Input {
  private webhookSigningKey?: crypto.KeyObject;

  constructor() {
    this.webhookSigningKey = null;
    // this.webhookSigningKey = crypto.createSecretKey(getConfig().webhookSigningKey);
  }

  public process(data: any): MailgunPublishable {
    if (!this.verifyEncoding(data)) {
      throw new MailgunEncodingError("Mailgun encoding verification failed.");
    }
    return this.parse(data);
  }

  private verifyEncoding({ timestamp, token, signature }): boolean  {
    if (!this.webhookSigningKey) {
      return true;
    }

    const encodedToken = crypto
        .createHmac("sha256", this.webhookSigningKey)
        .update(timestamp.concat(token))
        .digest("hex");

    return (encodedToken === signature);
  }

  private parse(data: any): MailgunPublishable {
    try {
      const timestamp: number = data["event-data"].timestamp;
      const type: string = data["event-data"].event;

      return new MailgunPublishable(type, timestamp);
    } catch (e) {
      throw new MailgunEventFormatError("The Mailgun event data isn't formatted correctly.");
    }
  }
}
