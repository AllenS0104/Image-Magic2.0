import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.aiengineer.photomagicai',
  appName: '照片魔法AI',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  }
};

export default config;
