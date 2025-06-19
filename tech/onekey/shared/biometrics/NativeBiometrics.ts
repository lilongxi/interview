import { MainBiometrics } from "./interface";

export class NativeBiometrics implements MainBiometrics {
    async getItem(key: string): Promise<string> {
        return ''
    }
    async setItem<T>(key: string, value: string): Promise<void> {
    }
}