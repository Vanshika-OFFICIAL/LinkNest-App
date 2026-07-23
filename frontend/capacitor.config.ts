import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.linknest.app',
  appName: 'LinkNest',

  server: {
    url: 'https://link-nest-app.vercel.app',
    cleartext: true
  }
};

export default config;