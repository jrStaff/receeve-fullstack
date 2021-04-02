import Model from "../domain/models/model";

export default interface Input {
    process(data: any): Model;
}
