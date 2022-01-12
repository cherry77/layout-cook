import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from '@/store';

import('ant-design-vue/dist/antd.less');

async function bootstrap() {
  const app = createApp(App)

  setupStore(app)

  app.mount('#app')
}
bootstrap()
