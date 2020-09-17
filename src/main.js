import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import {createOidcAuth, SignInType } from 'vue-oidc-client'


//const axios = require('axios').default;

Vue.config.productionTip = false

// const appUrl = 'http://localhost:8080/';

// // SignInType could be Window or Popup
// var mainOidc = createOidcAuth('main', SignInType.Window, appUrl , {
//   "realm": "strava_realm",
//   "auth-server-url": "https://mpgubu18:30226/auth/",
//   "ssl-required": "external",
//   "resource": "strava-public",
//   //"public-client": true,
//   "confidential-port": 0
// });

// mainOidc.startup().then(ok => {
//   console.info("mpg mainoidc")
//   if (ok) {
//     console.info("mpg mainoidc ok")
//     console.info(mainOidc.accessToken)
//     mainOidc.startSilentRenew()
//     console.info(mainOidc.userProfile)
//     new Vue({
//       router,
//       render: h => h(App)
//     }).$mount('#app');
//   }
// });


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
