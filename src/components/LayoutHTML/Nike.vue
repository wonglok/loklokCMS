<template>
  <div class="full">
    <div :class="{'full-v' : appState.useCMS, 'full': !appState.useCMS }">
      <Controllers v-if="appState.useCMS" @api="(v) => { apis.controllers = v }" />
      <div class="baseline">
        <div class="maxer" v-show="isTallEnough">
          <div class="maxer-desc"></div>
          <GLView @refresh="(v) => { refresh.maxer1 = v }" @glClick="passer"></GLView>
        </div>
        <div class="maxer2" v-show="isTallEnough && isBigEnough" v-if="isBigEnough || isBigEnoughAtStart">
          <div class="maxer-desc"></div>
          <GLView @refresh="(v) => { refresh.maxer2 = v }" @glClick="passer"></GLView>
        </div>
        <!-- <div class="maxer" v-show="isTallEnough" v-if="isBigEnough">
          <div class="maxer-desc"></div>
          <GLView @refresh="(v) => { refresh.maxer2 = v }" @glClick="passer"></GLView>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import * as backend from '@/backend/firebase'
import GLView from '@/components/WebGL/GLView'
import Controllers from '@/components/CMS/Controllers/Controllers'
export default {
  components: {
    GLView,
    Controllers
  },
  data () {
    return {
      appState: backend.appState,
      apis: {},
      refresh: {},
      isBigEnoughAtStart: window.innerWidth > 828,
      isTallEnough: false,
      isBigEnough: false
    }
  },
  methods: {
    passer (args) {
      if (this.apis.controllers) {
        this.apis.controllers.glClick(args)
      }
    }
  },
  created () {
    var resizer = () => {
      this.isTallEnough = window.innerHeight > 462
      this.isBigEnough = window.innerWidth > 828
      // auto refresh size info :D
      for (var exec in this.refresh) {
        var exe = this.refresh[exec]
        if (exe) {
          this.$nextTick(() => {
            exe()
          })
        }
      }
    }
    resizer()
    window.addEventListener('resize', resizer)
  },
  computed: {
  }
}
</script>

<style scoped>

@font-face {
  font-family: DINCond-Regular;
  src: url("../NikeWebGL/Fonts/DinCondense/regular.otf") format("opentype");
}
@font-face {
  font-family: DINCond-Medium;
  src: url("../NikeWebGL/Fonts/DinCondense/medium.otf") format("opentype");
}
@font-face {
  font-family: Futura-CondensedMedium;
  src: url("../NikeWebGL/Fonts/Futura/condensed-medium.ttf") format("truetype");
}

.full {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.full-v {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.baseline {
  /* max-height: 736px; */
  max-height: 628px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: baseline;
}
.maxer {
  font-family: DINCond-Regular;
  width: 100%;
  height: 100%;
  max-width: 414px;
  max-height: 628px;
  outline: grey solid 1px;
  position: relative;
}
.maxer2 {
  font-family: DINCond-Medium;
  width: 100%;
  height: 100%;
  max-width: 375px;
  max-height: 562px;
  outline: grey solid 1px;
  position: relative;
}

/* .maxer-desc {
  position: absolute;
  top: -40px;
  left: 0px;
  width: 100%;
  height: 40px;
} */

</style>
