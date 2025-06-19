


export enum IPlatformEnum {
    'web' = 'web',
    'webEmbed' = 'webEmbed',
    'desktop' = 'desktop',
    'ext' = 'ext',
    'native' = 'native'
}

export type IPlatform = keyof typeof IPlatformEnum

export interface AdapterConstructor {
    new (...arg: any): any
}

export class AdapterFactory<F extends AdapterConstructor> {

    private readonly AdapterPool: Map<IPlatform, InstanceType<F>>

    public get adp() {
        return this.AdapterPool
    }

    constructor() {
        this.AdapterPool = new Map
    }

    private hAdapterFactory(key: IPlatform) {
        return !!this.adp.has(key)
    }

    private sAdapterFactory(key: IPlatform, factory: F) {
        const newFactory: InstanceType<F> = new factory()
        this.adp.set(key, newFactory)
        return newFactory
    }

    private gAdapterFactory(key: IPlatform) {
        return this.adp.get(key)!
    }

    private dAdapterFactory(key: IPlatform) {
        return this.adp.delete(key)
    }

    public register(key: IPlatform, factory: F): InstanceType<F> {
        if (this.hAdapterFactory(key)) {
            return this.gAdapterFactory(key)
        }
        return this.sAdapterFactory(key, factory)
    }

    public gAdapter(k: IPlatform) {
        return this.gAdapterFactory(k)
    }

    public delete(key: IPlatform): boolean {
        this.dAdapterFactory(key)
        return true
    }

    public clear(): boolean {
        this.adp.clear()
        return true
    }

}
