export default interface PersistantStorage {
    store(data: object): Promise<void>;
}
