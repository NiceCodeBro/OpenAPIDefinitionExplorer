import { environment } from './../../environments/environment';

export const getHostName = (): string => {
  const apiVersion = 'v1.0';
  const port = 3000;
  let apiUrl = `${window.location.protocol}//${window.location.hostname}:${port}/api/${apiVersion}`;

  if (environment.production === true) {
    apiUrl = `${window.location.protocol}//${window.location.hostname}/api/${apiVersion}`;
  }

  return apiUrl;
};
