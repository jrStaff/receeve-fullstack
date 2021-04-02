import Input from "../ports/input";
import PersistantStorage from "../ports/persistantStorage";
import Publisher from "../ports/publisher";
import Model from "./models/model";

export default class ModelHandler {
    public storage ?: PersistantStorage;
    public publisher ?: Publisher;
    public input: Input;

    constructor(storage: PersistantStorage = null,  publisher: Publisher = null, input: Input) {
        this.storage = storage;
        this.publisher = publisher;
        this.input = input;
    }

    public async handle(data: object): Promise<void> {
        if (this.storage !== null) { await this.storage.store(data); }

        const model: Model = this.input.process(data);
        if (this.publisher !== null) { await this.publisher.publish(model); }
    }
}
