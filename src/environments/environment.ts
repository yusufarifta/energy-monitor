export interface Environment {
  production: boolean;
  version: string;
  appUrl: string;
  webUrl: string;
  hmr: boolean;
}

const environment: Environment = {
  appUrl: 'https://powermonitor.elgibor-solution.com/api/console',
  // appUrl: 'http://192.168.1.20:8000/api',
  hmr: false,
  production: false,
  version: 'VERSION',
  webUrl: 'https://powermonitor.elgibor-solution.com',
};

export default environment;
