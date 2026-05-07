// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.

export interface Environment {
  production: boolean;
  androidAppTroveSdkKey: string;
  androidAppTroveSecretId: string;
  androidAppTroveSecretKey: string;
  iosAppTroveSdkKey: string;
  iosAppTroveSecretId: string;
  iosAppTroveSecretKey: string;
}

export const environment: Environment = {
  production: false,
  androidAppTroveSdkKey: '',
  androidAppTroveSecretId: '',
  androidAppTroveSecretKey: '',
  iosAppTroveSdkKey: '',
  iosAppTroveSecretId: '',
  iosAppTroveSecretKey: '',
};
