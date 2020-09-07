import Vue from 'vue'
import App from './App.vue'
import router from './router'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: '522814027928-abmnvubjhmlv3vjbjq0k6fph4623bj4u.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
Vue.use(GAuth, gauthOption)
