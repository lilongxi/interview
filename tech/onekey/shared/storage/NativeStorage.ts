import { CoreStorage } from "./interface";

export class NativeStorage extends CoreStorage {
    async getItem(key: string): Promise<string> {
        return ''
    }
    async setItem<T>(key: string, value: string): Promise<void> {
    }
}