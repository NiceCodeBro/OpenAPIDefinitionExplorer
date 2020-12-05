export const getHostName = (): string => {
  const apiVersion = 'v1.0';
  const port = 3000;
  const apiUrl = `${window.location.protocol}//${window.location.hostname}:${port}/api/${apiVersion}`;

  return apiUrl;
};
