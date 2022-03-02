// For CSS
declare module "*.module.css" {
    const classes: { [key: string]: string };
    export default classes;
  }

declare module 'axios-oauth-client';
declare module 'react-google-login';