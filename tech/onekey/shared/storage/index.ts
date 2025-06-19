import { AdapterFactory, IPlatformEnum } from "../../common/factory/AdapterFactory";
import { NativeStorage } from './NativeStorage';
import { WebStorage } from "./WebStorage";

const registerStorage = new AdapterFactory
registerStorage.register(IPlatformEnum.native, NativeStorage)
registerStorage.register(IPlatformEnum.web, WebStorage)

//
export const storage = registerStorage.gAdapter(IPlatformEnum.native)
