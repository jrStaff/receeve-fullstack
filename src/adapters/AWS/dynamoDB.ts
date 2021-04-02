import AWS from "aws-sdk";
import Model from "../../domain/models/model";
import PersistantStorage from "../../ports/persistantStorage";

class DynamoDB implements PersistantStorage {
    public tableName: string;
    public DynamoDB: AWS.DynamoDB;

    constructor(tableName: string) {
        this.tableName = tableName;
        this.DynamoDB = new AWS.DynamoDB();
    }

    public async store(data: object): Promise<boolean> {
        const primaryId = data["event-data"].id;
        const params = {
            TableName: this.tableName,
            Item: {
                id: {S: primaryId},
                data: {S: JSON.stringify(data)},
            },
        };

        await this.DynamoDB.putItem(params).promise();

        return true;
    }
}

export default DynamoDB;
