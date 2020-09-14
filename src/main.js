import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueKeyCloak from 'vue-keycloak-js'

// let initOptions = {
//   url: 'https://mpgubu18:30226/auth', realm: 'strava-realm', clientId: 'strava-public', responseType: 'id_token token', scope: 'openid profile email'
// }

//const axios = require('axios').default;

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
/*
function tokenInterceptor () {
  axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${Vue.prototype.$keycloak.token}`
    return config
  }, error => {
    return Promise.reject(error)
  })
}
*/
Vue.use(VueKeyCloak, {
  init: {
   onLoad: 'login-required',
   checkLoginIframe: false
  },
  config: {
    url: 'https://mpgubu18:30226/auth/realms/strava_realm/',
    realm: 'strava-realm', 
    clientId: 'strava-public', 
    responseType: 'id_token token', 
    scope: 'openid profile email'
  },
  onLoad:  (keycloak) => {
    console.log(`I wonder what Keycloak returns: ${keycloak}`)
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  },
  onReady: (keycloak) => {
    console.log(`I wonder what Keycloak returns: ${keycloak}`)
    //tokenInterceptor()
    /* eslint-disable no-new */
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})