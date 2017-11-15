// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as backend from '@/backend/firebase'
import { preLoad, homeLinks, menuLinks } from '@/components/WebGL/Shared/cache'

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
  allLoaded: false
}

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: `
    <App v-if="state.allLoaded" />
    <div id="app" v-else>

      <div style="width: 100vw; height: 100vh; background-color: black; display: flex; justify-content: center; align-items: center;">
        <svg style="transform: scale(1.5)" width="141px" height="18px" viewBox="0 0 141 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <!-- Generator: Sketch 46.2 (44496) - http://www.bohemiancoding.com/sketch -->
          <desc>Created with Sketch.</desc>
          <defs></defs>
          <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Nav-bar-scroll" transform="translate(-16.000000, -16.000000)">
                  <g id="Group-4">
                      <g id="Page-1" transform="translate(16.000000, 17.000000)" fill="#FFFFFF">
                          <path d="M2.73179167,9.94204167 C2.73179167,11.1199583 2.33679167,11.7087083 1.546375,11.7087083 C0.953458333,11.7087083 0.438041667,11.4249583 0.000125,10.8570417 L0.000125,14.6962083 C0.956791667,14.9882917 1.796375,15.1349583 2.51845833,15.1349583 C3.88304167,15.1349583 4.91679167,14.737875 5.62054167,13.942875 C5.985125,13.530375 6.235125,13.0782917 6.37054167,12.5870417 C6.51845833,12.0899583 6.59304167,11.4249583 6.59304167,10.5937083 L6.59304167,0.837875 L2.73179167,0.837875 L2.73179167,9.94204167 Z" id="Fill-1"></path>
                          <path d="M13.81025,10.0156667 C13.81025,10.6535833 13.7394167,11.0985833 13.5973333,11.35025 C13.45525,11.5885833 13.1994167,11.7085833 12.829,11.7085833 C12.4706667,11.7085833 12.2160833,11.58025 12.0648333,11.3223333 C11.9135833,11.0644167 11.83775,10.6260833 11.83775,10.0065 L11.83775,0.83775 L7.97691667,0.83775 L7.97691667,10.239 C7.97691667,12.04025 8.54441667,13.3515 9.68066667,14.17025 C10.5756667,14.814 11.6835833,15.1348333 13.0048333,15.1348333 C14.1715,15.1348333 15.1623333,14.8444167 15.9773333,14.2610833 C16.5819167,13.8248333 17.0144167,13.3360833 17.2735833,12.7960833 C17.539,12.2810833 17.6719167,11.6073333 17.6719167,10.7760833 L17.6719167,0.83775 L13.81025,0.83775 L13.81025,10.0156667 Z" id="Fill-3"></path>
                          <path d="M23.9530833,6.62883333 L23.3418333,6.19216667 C22.8168333,5.82925 22.55475,5.46341667 22.55475,5.09425 C22.55475,4.86841667 22.6535,4.67466667 22.851,4.51383333 C23.04225,4.34716667 23.286,4.26425 23.58225,4.26425 C23.971,4.26425 24.3664167,4.40466667 24.7676667,4.6855 C25.1689167,4.96633333 25.52725,5.35091667 25.8418333,5.83841667 L25.8418333,1.54841667 C24.90975,1.07508333 23.9835,0.838 23.0639167,0.838 C22.0330833,0.838 21.1530833,1.1355 20.4251667,1.73133333 C20.1593333,1.94008333 19.92475,2.17925 19.721,2.4505 C19.51725,2.72133333 19.3380833,3.0205 19.1839167,3.34841667 C18.8751667,4.05091667 18.7205833,4.72383333 18.7205833,5.36675 C18.7205833,5.74216667 18.7643333,6.09925 18.8505833,6.43883333 C18.9368333,6.778 19.0730833,7.10675 19.2580833,7.42591667 C19.4435,7.74466667 19.6839167,8.05383333 19.9805833,8.35466667 C20.2764167,8.6555 20.63475,8.95758333 21.05475,9.26175 L21.6839167,9.73508333 C22.141,10.0859167 22.3693333,10.44675 22.3693333,10.8159167 C22.3693333,11.0721667 22.2643333,11.2846667 22.0543333,11.4550833 C21.8443333,11.6246667 21.5730833,11.7088333 21.2393333,11.7088333 C20.3568333,11.7088333 19.536,11.1905 18.7764167,10.153 L18.7764167,14.5521667 C19.8139167,14.9409167 20.786,15.1350833 21.6935,15.1350833 C23.0080833,15.1350833 24.09475,14.6950833 24.9530833,13.81425 C25.8105833,12.9334167 26.23975,11.8150833 26.23975,10.4588333 C26.23975,9.6605 26.0605833,8.96425 25.7030833,8.36966667 C25.351,7.77466667 24.7676667,7.19466667 23.9530833,6.62883333" id="Fill-5"></path>
                          <polygon id="Fill-7" points="27.0339583 4.264125 29.1635417 4.264125 29.1635417 15.1349583 33.0247917 15.1349583 33.0247917 4.264125 35.238125 4.264125 35.238125 0.837875 27.0339583 0.837875"></polygon>
                          <path d="M44.8552083,11.7092083 L44.8552083,4.43045833 L44.975625,4.43045833 C45.574375,4.43045833 46.0497917,4.764625 46.401875,5.430875 C46.7539583,6.09129167 46.9297917,6.993375 46.9297917,8.13504167 C46.9297917,10.4500417 46.238125,11.640875 44.8552083,11.7092083 M44.3277083,0.837958333 L40.9939583,0.837958333 L40.9939583,15.1350417 L44.6052083,15.1350417 C46.599375,15.1350417 48.099375,14.585875 49.105625,13.4867083 C50.2847917,12.197125 50.8739583,10.365875 50.8739583,7.995875 C50.8739583,5.58795833 50.1764583,3.71504167 48.7814583,2.37504167 C47.7197917,1.35045833 46.2352083,0.837958333 44.3277083,0.837958333" id="Fill-9"></path>
                          <path d="M58.577125,10.7460833 C58.3304583,11.3881667 57.978375,11.709 57.5212917,11.709 C57.077125,11.709 56.729625,11.3835833 56.479625,10.7331667 C56.229625,10.0819167 56.1050417,9.16733333 56.1050417,7.9865 C56.1050417,6.78775 56.2375417,5.88066667 56.5029583,5.26275 C56.774625,4.59733333 57.1387917,4.264 57.595875,4.264 C58.5087917,4.264 58.9662917,5.53191667 58.9662917,8.06816667 C58.9662917,9.21233333 58.8362917,10.10525 58.577125,10.7460833 M57.577125,0.83775 C56.2312917,0.83775 55.0679583,1.31816667 54.085875,2.27733333 C52.7650417,3.5715 52.104625,5.43983333 52.104625,7.88316667 C52.104625,10.4348333 52.737125,12.3485833 54.0025417,13.624 C55.0092083,14.6315 56.215875,15.1348333 57.6229583,15.1348333 C59.209625,15.1348333 60.4967083,14.4794167 61.4850417,13.16775 C62.478375,11.8506667 62.9754583,10.14025 62.9754583,8.03566667 C62.9754583,5.83608333 62.4875417,4.0865 61.5125417,2.78733333 C60.537125,1.48775 59.2254583,0.83775 57.577125,0.83775" id="Fill-11"></path>
                          <polygon id="Fill-13" points="69 15.1349167 72.8616667 15.1349167 72.8616667 0.837833333 69 0.837833333"></polygon>
                          <polygon id="Fill-15" points="74.1652917 4.264125 76.294875 4.264125 76.294875 15.1349583 80.156125 15.1349583 80.156125 4.264125 82.3694583 4.264125 82.3694583 0.837875 74.1652917 0.837875"></polygon>
                      </g>
                      <path d="M145.381454,19.5467377 C142.02149,20.4325675 139.097287,21.2002613 136.599349,21.8729905 C134.098752,22.5442002 131.984527,23.1014525 130.248318,23.5512048 C128.518187,24.0096939 127.078691,24.3853738 125.92717,24.6991368 C123.247633,25.4075727 121.662629,25.8250371 121.17178,25.9492508 C120.94801,26.0050899 120.694987,26.0563708 120.419929,26.1209468 C120.138412,26.1813442 119.844738,26.2417417 119.544606,26.286565 C119.239535,26.3427841 118.937882,26.3796303 118.633571,26.4092593 C118.334578,26.4461055 118.038625,26.4567416 117.765846,26.4544624 C117.090738,26.4491444 116.447543,26.3602575 115.811946,26.1957789 C115.190785,26.0320599 114.63497,25.7578021 114.141082,25.4011151 C113.646813,25.0432885 113.25702,24.5775821 112.959167,23.9937398 C112.671572,23.4155954 112.529104,22.7234934 112.535943,21.8992007 C112.541261,21.1903849 112.695127,20.3664721 112.981582,19.401252 C113.271077,18.4565442 113.761547,17.3260856 114.440834,16 C114.188951,16.2282949 113.824233,16.5811833 113.34744,17.0560063 C112.879385,17.5543805 112.374479,18.1215091 111.823603,18.7874008 C111.282225,19.462789 110.717672,20.1947761 110.164896,20.994378 C109.587426,21.7962591 109.074161,22.6304281 108.604967,23.4866289 C108.136912,24.3439692 107.755478,25.2089068 107.459905,26.0837206 C107.163191,26.9513172 107.006287,27.7843466 107.000208,28.5942047 C106.994129,29.3562006 107.121401,30.0627372 107.372524,30.7271095 C107.627827,31.3903422 107.999003,31.9555715 108.497451,32.4372319 C108.994759,32.9162334 109.620478,33.3052084 110.384867,33.5806057 C111.134058,33.8510648 112.016979,33.9923722 113.016155,33.9995895 C113.714058,34.0052874 114.424878,33.9517273 115.132279,33.8354907 C115.845758,33.7215331 116.536443,33.5787064 117.194455,33.3937154 C117.855126,33.2174611 118.478946,33.0203146 119.059455,32.8163306 C119.643764,32.6051294 120.154369,32.4197585 120.588611,32.2328681 C121.028932,32.0531951 121.379213,31.9027712 121.636035,31.7758985 C121.903875,31.6573827 122.042544,31.5969852 122.0604,31.5969852 L157,16.4759626 C152.608188,17.6349105 148.735339,18.6624274 145.381454,19.5467377" id="Fill-16" fill="#EE3932"></path>
                  </g>
              </g>
          </g>
        </svg>
      </div>

    </div>
  `,
  data () {
    return {
      state
    }
  },
  components: { App }
})
var loadTargets = []

if (router.currentRoute.path.indexOf('/game') !== -1) {
  loadTargets = [...homeLinks, ...menuLinks]
} else {
  loadTargets = [...menuLinks]
}

preLoad(loadTargets, () => {
  state.allLoaded = true
}, () => {
})

export { router }
