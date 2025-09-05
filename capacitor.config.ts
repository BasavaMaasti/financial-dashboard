import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.financialdashboard',
  appName: 'Financial Dashboard',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;