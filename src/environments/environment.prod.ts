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
  production: true,
  androidAppTroveSdkKey: '',
  androidAppTroveSecretId: '',
  androidAppTroveSecretKey: '',
  iosAppTroveSdkKey: '',
  iosAppTroveSecretId: '',
  iosAppTroveSecretKey: '',
};
