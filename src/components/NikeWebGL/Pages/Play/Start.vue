<template>
  <transition
    @enter="(el, done) => { pageFadeIn(el, done); fadeInCurtain(); }"
    @leave="pageFadeOut"
  >
    <keep-alive>
      <Object3D ref="sub-page-content">
        <ImageMesh
          :gclick="() => {  }"
          vms="@play@start@hold-tight"
          :link="require('./img/start/hold-tight.png')"
        />

        <ImageMesh
          :gclick="() => {  }"
          vms="@play@start@start-btn-bg"
          :link="require('./img/start/start-btn-bg.png')"
        />

        <ImageMesh
          :gclick="() => { $router.push({ path: '/nike/game/play/countdown' }) }"
          vms="@play@start@start-btn"
          :link="require('./img/start/start-btn.png')"
        />

        <ImageMesh
          :gclick="() => {  }"
          vms="@play@start@start-icon"
          :link="require('./img/start/start-icon.png')"
        />

        <ImageMesh
          :gclick="() => {  }"
          @ready="() => { }"
          ref="@play@start@hider"
          vms="@play@start@hider"
          :blending="THREE.NormalBlending"
          :opacity="1"
          :depthTest="true"
          :transparent="true"
          :position="{ x: 0, y: -32.7, z: -1 }"
          :link="require('./img/start/hider-reverse.png')"
        />

      </Object3D>
    </keep-alive>
  </transition>
</template>

<script>
import TWEEN from '@tweenjs/tween.js'

import * as THREE from 'three'
import fadeInOut from '@/components/WebGL/Mixins/FadeInOut'
import Bundle from '@/components/WebGL/Bundle'
export default {
  name: 'Start',
  mixins: [fadeInOut],
  components: {
    ...Bundle
  },
  props: ['aspect', 'camera'],
  data () {
    return {
      TWEEN,
      THREE,
      execStack: {},
      tweening: false
    }
  },
  activated () {
    this.fadeInCurtain()
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
    fadeInCurtain () {
      // var vm = this
      // setTimeout(() => {
      //   // var mesh = this.$refs['@login@bg@hider'].mesh
      //   var posGettter = {
      //     get pos () {
      //       var ans = { x: 0, y: 0, z: 0 }
      //       try {
      //         ans = vm.$refs['@play@start@hider'].mesh.position
      //       } catch (e) {
      //       }

      //       return ans
      //     }
      //   }
      //   var tween2 = new this.TWEEN.Tween(posGettter.pos)
      //   .to({
      //     y: '-100'
      //   }, 0)

      //   var tween = new this.TWEEN.Tween(posGettter.pos)
      //   .to({
      //     y: '+100'
      //   }, 1000)
      //   .easing(TWEEN.Easing.Quadratic.Out)

      //   setTimeout(() => {
      //     tween2.chain(tween).start()
      //   }, 10)
      // }, 10)
    },
    __add (v) {
      this.$parent.$parent.$parent.scene.add(v)
    },
    __remove (v) {
      this.$parent.$parent.$parent.scene.remove(v)
    }
  }
}
</script>

<style scoped>

</style>
