export default interface PersistantStorage {
    store(data: object): boolean;
}
