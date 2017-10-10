// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as backend from '@/backend/firebase'

router.beforeEach((to, from, next) => {
  if (to.fullPath.indexOf('/cms') === 0) {
    backend.appState.useRT = true
    backend.appState.useCMS = true
    next()
  } else if (backend.appState.useCMS) {
    next({ path: to.fullPath.replace('/nike', '/cms') })
  } else {
    next()
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

export { router }
