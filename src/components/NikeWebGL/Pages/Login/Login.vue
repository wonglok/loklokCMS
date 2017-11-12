<template>
  <transition
      @enter="(el, done) => { pageFadeIn(el, done); fadeInCurtain(); }"
      @leave="pageFadeOut"
    >
    <keep-alive>
      <Object3D ref="page-content">
        <!--
          <ImageMesh
            d-gclick="() => {  }"
            :position="{ x: 0, y: 20.0, z: -0.1 }"
            :scale="{ x: 1 / 3 * 1.35, y: 1 / 3 * 1.35, z: 1.0 }"
            :link="require('./img/bg/rex.png')"
          />
        -->

        <ImageMesh
          desc="blackarea"
          :gclick="() => {  }"
          @ready="() => { fadeInCurtain() }"
          ref="@login@bg@hider"
          vms="@login@bg@hider"
          :blending="THREE.NormalBlending"
          :opacity="1"
          :depthTest="true"
          :transparent="true"
          :link="require('./img/bg/hider.png')"
        />

        <ImageMesh
          :gclick="() => {  }"
          vms="@login@form@login-start-game"
          :link="require('./img/form/login-start-game.png')"
        />

        <ImageMesh
          :gclick="() => { demo('This is a demo website. You can click the red sbumit button.') }"
          vms="@login@form@login-facebook"
          :link="require('./img/form/login-facebook.png')"
        />

        <ImageMesh
          :gclick="() => {  }"
          vms="@login@form@login-field-desc"
          :link="require('./img/form/login-field-desc.png')"
        />


        <ImageMesh
          :gclick="() => {  }"
          vms="@login@form@login-email-text"
          :link="require('./img/form/login-email-text.png')"
        />

        <ImageMesh
          :gclick="() => { $router.push({ path: '/nike/game/play' }) }"
          vms="@login@form@login-submit"
          :link="require('./img/form/login-submit.png')"
        />

        <GrungeMesh
          vms="@login@grunge@email-field"
          :gclick="() => { demo('This is a demo website. You can click the red sbumit button.') }"
          :gOpacity="1.0"
          :color="0xffffff"
          @exec="(v) => { execStack.grungeEnterNow = v }"
        />

        <Woody ref="woody" @api="(v) => { execStack.woody = v.render; /*mouseStack.woody = v.setMouse*/ }" :position="{ x: 0, y: 0, z: 0.0 }" />

      </Object3D>
    </keep-alive>
  </transition>
</template>

<script>
import TWEEN from '@tweenjs/tween.js'

import * as THREE from 'three'

import Woody from '@/components/Prototypes/Visual/Woody/Woody.vue'

import fadeInOut from '@/components/WebGL/Mixins/FadeInOut'

import Bundle from '@/components/WebGL/Bundle'
export default {
  name: 'Rules',
  mixins: [fadeInOut],
  components: {
    ...Bundle,
    Woody
  },
  props: ['aspect'],
  data () {
    return {
      TWEEN,
      THREE,
      execStack: {},
      tweening: false
    }
  },
  mounted () {

  },
  activated () {
    this.fadeInCurtain()
    this.$emit('exec', this.exec)
  },
  deactivated () {
    this.$emit('exec', () => {})
  },
  methods: {
    fadeInCurtain () {
      var mesh = this.$refs['@login@bg@hider'].mesh
      var posGettter = {
        get pos () {
          return mesh.position
        }
      }
      var tween = new this.TWEEN.Tween(posGettter.pos)
      .to({
        y: '-100'
      }, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)

      var tween2 = new this.TWEEN.Tween(posGettter.pos)
      .to({
        y: '+100'
      }, 0)

      setTimeout(() => {
        tween2.chain(tween).start()
      }, 0)
    },
    demo (msg) {
      alert(msg)
    },
    __add (v) {
      this.$parent.scene.add(v)
    },
    __remove (v) {
      this.$parent.scene.remove(v)
    },
    exec () {
      for (var exe in this.execStack) {
        this.execStack[exe]()
      }
    }
  }
}
</script>

<style scoped>

</style>
