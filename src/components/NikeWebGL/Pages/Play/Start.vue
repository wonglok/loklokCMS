<template>
  <transition
    @enter="(el, done) => { pageFadeIn(el, done); animateAll(); }"
    @leave="pageFadeOut"
  >
    <keep-alive>
      <Object3D ref="sub-page-content">

        <ShakeMesh
          :gclick="() => {  }"
          vms="@play@start@hold-tight"
          ref="@play@start@hold-tight"
          :link="require('./img/start/hold-tight.png')"
          @shake="(v) => { shakeStack.s1 = v }"
          @exec="(v) => { execStack.s1 = v }"
        />

        <ShakeMesh
          :gclick="() => {  }"
          vms="@play@start@start-icon"
          ref="@play@start@start-icon"
          :link="require('./img/start/start-icon.png')"
          @shake="(v) => { shakeStack.s2 = v }"
          @exec="(v) => { execStack.s2 = v }"
        />

        <!--
        <ImageMesh
          :gclick="() => {  }"
          vms="@play@start@start-btn-bg"
          :link="require('./img/start/start-btn-bg.png')"
        /> -->

        <!-- <ImageMesh
          :gclick="() => { $router.push({ path: '/nike/game/play/countdown' }) }"
          vms="@play@start@start-btn"
          :link="require('./img/start/start-btn.png')"
        /> -->

        <!-- <ImageMesh
          :gclick="() => {  }"
          vms="@play@start@start-icon"
          :link="require('./img/start/start-icon.png')"
        /> -->

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

        <ImageMesh
          :gclick="() => {  }"
          @ready="() => { }"
          ref="@play@start@white-ball"
          vms="@play@start@white-ball"
          :blending="THREE.NormalBlending"
          :opacity="0"
          :depthTest="true"
          :transparent="true"
          :link="require('./img/start/white-ball.png')"
        />
        <ImageMesh
          :gclick="() => { $router.push({ path: '/nike/game/play/countdown' }) }"
          @ready="() => { }"
          ref="@play@start@white-ball-text"
          vms="@play@start@white-ball-text"
          :blending="THREE.NormalBlending"
          :opacity="0"
          :depthTest="true"
          :transparent="true"
          :link="require('./img/start/white-ball-text.png')"
        />

        <StartAnimation
          ref="@play@canvas@start-canvas"
          vms="@play@canvas@start-canvas"
          @exec="(v) => { this.execStack.startAnimation = v }"
        >
        </StartAnimation>

      </Object3D>
    </keep-alive>
  </transition>
</template>

<script>
import TWEEN from '@tweenjs/tween.js'
import StartAnimation from './StartAnimation/StartAnimation.vue'
import * as THREE from 'three'
import fadeInOut from '@/components/WebGL/Mixins/FadeInOut'
import Bundle from '@/components/WebGL/Bundle'
export default {
  name: 'Start',
  mixins: [fadeInOut],
  components: {
    ...Bundle,
    StartAnimation
  },
  props: ['aspect', 'camera'],
  data () {
    return {
      TWEEN,
      THREE,
      shakeStack: {
        s1 () {}
      },
      execStack: {},
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

    this.hideAll()
    this.animateAll()
  },
  deactivated () {
    this.$refs['@play@canvas@start-canvas'].reset()
  },
  methods: {
    shakeShake (shaker, pos, time, ratio) {
      return new Promise((resolve, reject) => {
        shaker({ initPos: pos, timeRatio: ratio || 2.0 })
        setTimeout(() => {
          resolve()
        }, time)
      })
    },
    runBoxy () {
      return new Promise((resolve, reject) => {
        this.$refs['@play@canvas@start-canvas'].start()
        resolve()
      })
    },
    opacity (mesh, v) {
      mesh.material.opacity = v
      if (mesh.material.uniforms) {
        mesh.material.uniforms.opacity.value = v
      }
    },
    scale (mesh, v) {
      mesh.scale.x = v
      mesh.scale.y = v
      mesh.scale.z = v
    },
    scaleIn (mesh, { time, scale, opacity, initScale, initOpacity, delay }) {
      return new Promise((resolve, reject) => {
        var v = {
          scale: initScale || 0,
          opacity: initOpacity || 0
        }
        delay = delay || 0

        new TWEEN.Tween(v)
          .to({ scale, opacity }, time)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onUpdate(() => {
            this.opacity(mesh, v.opacity)
            this.scale(mesh, v.scale)
          })
          .delay(delay)
          .onComplete(() => {
            resolve()
          })
          .start()
      })
    },
    hideAll () {
      this.opacity(this.$refs['@play@start@hold-tight'].mesh, 0)
      this.opacity(this.$refs['@play@start@start-icon'].mesh, 0)
      this.opacity(this.$refs['@play@start@white-ball'].mesh, 0)
      this.opacity(this.$refs['@play@start@white-ball-text'].mesh, 0)
    },
    async animateAll () {
      this.hideAll()
      await this.sleep(100)
      this.hideAll()

      await this.sleep(1000)
      await this.shakeShake(this.shakeStack.s1, { x: 0, y: 30, z: 0 }, 700)
      await this.runBoxy()

      await this.sleep(1500)

      this.scaleIn(this.$refs['@play@start@white-ball'].mesh, { time: 1000, scale: this.aspect * 0.85, opacity: 1 })
      await this.scaleIn(this.$refs['@play@start@white-ball-text'].mesh, { delay: 500, time: 1000, scale: this.aspect * 0.85, opacity: 1, initScale: this.aspect * 0.85 })

      await this.shakeShake(this.shakeStack.s2, { x: -80, y: 0, z: 0 }, 700)

      await this.sleep(300)
      await this.shakeShake(this.shakeStack.s2, { x: -15, y: 3, z: 0 }, 400, 2.0)
      await this.shakeShake(this.shakeStack.s2, { x: -20, y: -3, z: 0 }, 400, 2.0)
      await this.shakeShake(this.shakeStack.s2, { x: -15, y: 0, z: 0 }, 400, 2.0)

      await this.sleep(1300)
      await this.shakeShake(this.shakeStack.s2, { x: -15, y: 3, z: 0 }, 400, 2.0)
      await this.shakeShake(this.shakeStack.s2, { x: -20, y: -3, z: 0 }, 400, 2.0)
      await this.shakeShake(this.shakeStack.s2, { x: -15, y: 0, z: 0 }, 400, 2.0)

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
