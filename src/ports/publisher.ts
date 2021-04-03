import Model from "../domain/models/model";

export default interface Publisher {
    publish(model: Model): Promise<void>;
}
