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
  androidAppTroveSdkKey: '68f83eac-34a0-4994-b4b7-3fd6296ce47b',
  androidAppTroveSecretId: '69eb0a03882de3632108297e',
  androidAppTroveSecretKey: '65520f3b-fe7b-481a-91bd-97b63e416223',
  iosAppTroveSdkKey: '131c597d-cf0a-44ae-9710-d4e362b04369',
  iosAppTroveSecretId: '69f046a31125c14ffc8b9200',
  iosAppTroveSecretKey: '30cc784f-5d7f-4461-91a0-630b908c3369',
};
