// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as backend from '@/backend/firebase'
import { preLoad, homeLinks, menuLinks, getFonts, preloadBundle, startAnimationLinks } from '@/components/WebGL/Shared/cache'
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
  progress: 0.14,
  appState: backend.appState
}

Vue.config.productionTip = false
function exec () {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    template: `
      <App v-if="state.progress === 1" />
      <div v-else class="main-loader">
        <div class="main-red-bar" :style="{ width: (w * state.progress) + 'px' }"></div>
      </div>
    `,
    data () {
      return {
        w: window.innerWidth,
        state
      }
    },
    components: { App }
  })
}

function initPrep () {
  var loadTargets = []
  loadTargets = [...homeLinks, ...menuLinks]
  if (window.location.pathname.indexOf('/play') !== -1) {
    loadTargets = [...loadTargets, ...startAnimationLinks]
  }

  var progressHandler = (progress) => {
    console.log(progress)
    if (progress === 1.0) {
      setTimeout(() => {
        state.progress = progress
      }, 500)
    } else {
      state.progress = progress
    }
  }
  var prepItems = [
    initLoad(),
    // preLoad(loadTargets),
    ...getFonts()
  ]

  if (window.location.pathname.indexOf('/cms') === 0) {
    prepItems.push(backend.readyRT())
  }
  Promise.all(prepItems)
    .then(() => {
      exec()
      setTimeout(() => {
        preLoad([...loadTargets, ...preloadBundle], progressHandler)
      }, 3000)
    })
}

initPrep()
export { router }
