// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as backend from '@/backend/firebase'
import { preLoad, homeLinks, menuLinks, getFonts } from '@/components/WebGL/Shared/cache'
import { initLoad } from '@/components/WebGL/Mixins/llvms'
// import { appState } from './backend/firebase';

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

var state = {
  appState: backend.appState
}

Vue.config.productionTip = false
function exec () {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    template: `
      <App />
    `,
    data () {
      return {
        state
      }
    },
    components: { App }
  })
}

function initPrep () {
  var loadTargets = []
  loadTargets = [...homeLinks, ...menuLinks]

  var prepItems = [
    initLoad(),
    preLoad(loadTargets),
    ...getFonts()
  ]

  if (window.location.pathname.indexOf('/cms') === 0) {
    prepItems.push(backend.readyRT())
  }

  Promise.all(prepItems)
    .then(() => {
      setTimeout(() => {
        exec()
      }, 500)
    })
}

initPrep()
export { router }
