export abstract class CoreStorage {
    abstract getItem(key: string): Promise<string>
    abstract setItem<T>(key: string, value: string): Promise<void>
}