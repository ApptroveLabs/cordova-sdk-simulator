export interface Environment {
  production: boolean;
  androidAppTroveSdkKey: string;
  iosAppTroveSdkKey: string;
}

export const environment: Environment = {
  production: true,
  androidAppTroveSdkKey: 'b621c97c-d3f7-4030-9f6a-ccaa20729e42',
  iosAppTroveSdkKey: 'de6a7e6b-6d09-4309-8b7c-0837397613b6',
};
