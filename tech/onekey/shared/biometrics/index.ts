import { AdapterFactory, IPlatformEnum } from "../../common/factory/AdapterFactory";
import { NativeBiometrics } from './NativeBiometrics';
import { WebBiometrics } from "./WebBiometrics";

const registerFactory = new AdapterFactory
registerFactory.register(IPlatformEnum.native, NativeBiometrics)
registerFactory.register(IPlatformEnum.web, WebBiometrics)

// 从环境变量获取
export const biometrics = registerFactory.gAdapter(IPlatformEnum.native)
