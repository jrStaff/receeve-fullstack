import Model from "./model";

export default class Publishable implements Model {
    public provider: string;
    public timestamp: number;
    public type: string;
}
