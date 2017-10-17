<template>
  <transition
      @enter="pageFadeIn"
      @leave="pageFadeOut"
    >
    <keep-alive>
      <Object3D ref="page-content">
        <!-- <ImageMesh
          d-gclick="() => {  }"
          :position="{ x: 0, y: 20.0, z: -0.1 }"
          :scale="{ x: 1 / 3 * 1.35, y: 1 / 3 * 1.35, z: 1.0 }"
          :link="require('./img/bg/rex.png')"
        /> -->

        <Woody ref="woody" @api="(v) => { execStack.woody = v.render; /*mouseStack.woody = v.setMouse*/ }" :position="{ x: 0, y: 0, z: 0.0 }" />

        <component
          ref="sub-page-content"
          v-bind:is="'router-view'"
          @exec="(v) => { execStack.currentSubPage = v }"
          @punched="tweenWoody"
          :aspect="aspect"
          :camera="camera"
        >
        </component>
        <!-- <transition
          @enter="pageFadeIn"
          @leave="pageFadeOut"
        >
          <keep-alive>
          </keep-alive>
        </transition> -->
      </Object3D>

    </keep-alive>
  </transition>
</template>

<script>
import Woody from '@/components/Prototypes/Visual/Woody/Woody.vue'
import { glSystem } from '@/components/WebGL/Shared/system'

import fadeInOut from '@/components/WebGL/Mixins/FadeInOut'
import Bundle from '@/components/WebGL/Bundle'
export default {
  name: 'Play',
  mixins: [fadeInOut],
  components: {
    Woody,
    ...Bundle
  },
  props: ['aspect', 'camera'],
  data () {
    return {
      execStack: {},
      glSystem,
      tweening: false
    }
  },
  activated () {
    this.$emit('exec', () => {
      for (var execItem in this.execStack) {
        let exec = this.execStack[execItem]
        if (exec) {
          exec()
        }
      }
    })
  },
  deactivated () {

  },
  methods: {
    tweenWoody () {
      this.$refs.woody.punch({ magnitude: Math.abs(1.5 - Math.random()) })
    },
    __add (v) {
      this.$parent.scene.add(v)
    },
    __remove (v) {
      this.$parent.scene.remove(v)
    }
  }
}
</script>

<style scoped>

</style>
