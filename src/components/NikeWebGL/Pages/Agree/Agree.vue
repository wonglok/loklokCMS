<template>
  <transition
      @enter="(el, done) => { pageFadeIn(el, done); animateAll(); }"
      @leave="pageFadeOut"
    >
    <keep-alive>
      <Object3D ref="page-content">
        <!-- <ImageMesh
          :gclick="() => { $router.push('/nike/game/play') }"
          vms="@agree@cta@enter-now"
          :link="require('./img/enter.png')"
        /> -->

        <ShakeMesh
          :gclick="() => {  }"
          vms="@agree@header@title"
          ref="@agree@header@title"
          :link="require('./img/header/title1.png')"
          @shake="(v) => { shakeStack.title1 = v }"
          @exec="(v) => { execStack.title1 = v }"
        />
        <RevealMesh
          :gclick="() => {  }"
          vms="@agree@header@title2"
          ref="@agree@header@title2"
          :link="require('./img/header/title2.png')"
          @reveal="(v) => { revealStack.title2 = v }"
          @exec="(v) => { execStack.titl2 = v }"
        />
        <!-- <ImageMesh
          vms="@agree@header@title"
          :link="require('./img/header/title.png')"
        /> -->

        <ShakeMesh
          :gclick="() => {  }"
          vms="@agree@bg@rex"
          ref="@agree@bg@rex"
          :link="require('./img/bg/rex.png')"
          @shake="(v) => { shakeStack.rexBG = v }"
          @exec="(v) => { execStack.rexBG = v }"
        />
        <!-- <ImageMesh
          vms="@agree@bg@rex"
          :link="require('./img/bg/rex.png')"
        /> -->


        <RevealMesh
          :gclick="() => {  }"
          vms="@agree@tagline@title"
          ref="@agree@tagline@title"
          :link="require('./img/tagline/title.png')"
          @reveal="(v) => { revealStack.tagline = v }"
          @exec="(v) => { execStack.tagline = v }"
        />
        <!-- <ImageMesh
          vms="@agree@tagline@title"
          :link="require('./img/tagline/title.png')"
        /> -->

        <RevealMesh
          :gclick="() => {  }"
          vms="@agree@desc@punch-icon"
          ref="@agree@desc@punch-icon"
          :link="require('./img/desc/punch-icon.png')"
          @reveal="(v) => { revealStack.punchIcon = v }"
          @exec="(v) => { execStack.punchIcon = v }"
        />
        <!-- <ImageMesh
          vms="@agree@desc@punch-icon"
          :link="require('./img/desc/punch-icon.png')"
        /> -->

        <RevealMesh
          :gclick="() => {  }"
          vms="@agree@desc@punch-about"
          ref="@agree@desc@punch-about"
          :link="require('./img/desc/punch-about.png')"
          @reveal="(v) => { revealStack.punchAbout = v }"
          @exec="(v) => { execStack.punchAbout = v }"
        />
        <!-- <ImageMesh
          vms="@agree@desc@punch-about"
          :link="require('./img/desc/punch-about.png')"
        /> -->

        <GrungeMesh
          ref="@agree@grunge@bg"
          vms="@agree@grunge@bg"
          :gOpacity="0.53"
          :color="0xefefef"
          @exec="(v) => { execStack.grungeBg = v }"
        />

        <GrungeMesh
          ref="@agree@grunge@punch-icon"
          vms="@agree@grunge@punch-icon"
          :gOpacity="0.9"
          :color="0xefefef"
          @exec="(v) => { execStack.grungePunchIcon = v }"
        />

        <GrungeMesh
          ref="@agree@grunge@punch-about"
          vms="@agree@grunge@punch-about"
          :gOpacity="0.9"
          :color="0xefefef"
          @exec="(v) => { execStack.grungePunchAbout = v }"
        />


        <RevealMesh
          ref="@agree@grunge@enter-now"
          vms="@agree@grunge@enter-now"
          :link="require('./img/enter.png')"
          :gclick="() => { $router.push('/nike/game/login') }"
          @reveal="(v) => { revealStack.enterNow = v }"
          @exec="(v) => { execStack.enterNow = v }"
        />
        <!-- <GrungeMesh
          ref="@agree@grunge@enter-now"
          vms="@agree@grunge@enter-now"
          :link="require('./img/enter.png')"
          :gclick="() => { $router.push('/nike/game/login') }"
          :gOpacity="1.0"
          :color="0xbababa"
          @exec="(v) => { execStack.grungeEnterNow = v }"
        /> -->


        <RevealMesh
          :d-visible="!checkedBox"
          :gclick="() => { toggleBox() }"
          ref="@agree@agree@box-unchecked"
          vms="@agree@agree@box-unchecked"
          :link="require('./img/agree/box-unchecked.png')"
          @reveal="(v) => { revealStack.uncheckBox = v }"
          @exec="(v) => { execStack.uncheckBox = v }"
        />
        <!-- <ImageMesh
          :d-visible="!checkedBox"
          :gclick="() => { toggleBox() }"
          vms="@agree@agree@box-unchecked"
          :link="require('./img/agree/box-unchecked.png')"
        /> -->

        <RevealMesh
          :d-visible="checkedBox"
          :gclick="() => { toggleBox() }"
          ref="@agree@agree@box-checked"
          vms="@agree@agree@box-checked"
          :link="require('./img/agree/box-checked.png')"
          @reveal="(v) => { revealStack.checkedBox = v }"
          @exec="(v) => { execStack.checkedBox = v }"
        />
        <!-- <ImageMesh
          :d-visible="checkedBox"
          :gclick="() => { toggleBox() }"
          vms="@agree@agree@box-checked"
          :link="require('./img/agree/box-checked.png')"
        /> -->

        <RevealMesh
          :gclick="() => { $router.push('/nike/game/rules') }"
          ref="@agree@agree@agree-rule"
          vms="@agree@agree@agree-rule"
          :link="require('./img/agree/agree-rule.png')"
          @reveal="(v) => { revealStack.agreeRule = v }"
          @exec="(v) => { execStack.agreeRule = v }"
        />
        <!-- <ImageMesh
          :gclick="() => { $router.push('/nike/game/rules') }"
          vms="@agree@agree@agree-rule"
          :link="require('./img/agree/agree-rule.png')"
        /> -->

      </Object3D>

    </keep-alive>
  </transition>
</template>

<script>
import TWEEN from '@tweenjs/tween.js'
import fadeInOut from '@/components/WebGL/Mixins/FadeInOut'
import * as THREE from 'three'
import Bundle from '@/components/WebGL/Bundle'
export default {
  name: 'Agree',
  mixins: [fadeInOut],
  components: {
    ...Bundle
  },
  props: ['aspect'],
  data () {
    return {
      readyAgree: false,
      checkedBox: false,
      visiStack: {
        enterNow: false
      },
      revealStack: {},
      shakeStack: {
        s1 () {}
      },
      execStack: {
        grungeBg () {}
      },
      tweening: false
    }
  },
  mounted () {
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
    this.animateAll()
  },
  deactivated () {
    this.$emit('exec', () => {})
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
    opacity (mesh, v) {
      mesh.material.opacity = v
      if (mesh.material.uniforms) {
        mesh.material.uniforms.opacity.value = v
      }
    },
    revealMove (item, revaler, time, pos) {
      return new Promise((resolve, reject) => {
        if (item) {
          revaler({ initPos: pos, time })
          setTimeout(() => {
            resolve()
          }, 500)
        }
      })
    },
    scale (mesh, v) {
      mesh.scale.x = v
      mesh.scale.y = v
      mesh.scale.z = v
    },
    scaleTHREE (mesh, v) {
      mesh.scale.set(v.x, v.y, v.z)
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
    moveInRight (mesh, { time, initPosX, posX }) {
      return new Promise((resolve, reject) => {
        var tween1 = new TWEEN.Tween(mesh.position)
          .to({ x: '+' + posX }, 0)
          .onComplete(() => {
            resolve()
          })

        var tween2 = new TWEEN.Tween(mesh.position)
          .to({ x: '-' + posX }, time)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onUpdate(() => {
            // this.opacity(mesh, v.opacity)
          })
          .onComplete(() => {
            resolve()
          })

        tween1.chain(tween2).start()
      })
    },
    stretchIn (mesh, { time, scale, opacity, initScale, initOpacity, delay }) {
      return new Promise((resolve, reject) => {
        var temp = new THREE.Vector3(initScale.x, initScale.y, initScale.z)
        var v = {
          scaleX: initScale.x || 0,
          scaleY: initScale.y || 0,
          scaleZ: initScale.z || 0,
          opacity: initOpacity || 0
        }
        delay = delay || 0

        new TWEEN.Tween(v)
          .to({ scaleX: scale, scaleY: scale, scaleZ: scale, opacity }, time)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onUpdate(() => {
            this.opacity(mesh, v.opacity)
            temp.set(v.scaleX, v.scaleY, v.scaleZ)
            this.scaleTHREE(mesh, temp)
          })
          .delay(delay)
          .onComplete(() => {
            resolve()
          })
          .start()
      })
    },
    async animateAll () {
      this.opacity(this.$refs['@agree@header@title'].mesh, 0)
      this.opacity(this.$refs['@agree@header@title2'].mesh, 0)
      this.opacity(this.$refs['@agree@bg@rex'].mesh, 0)
      this.opacity(this.$refs['@agree@tagline@title'].mesh, 0)

      this.stretchIn(this.$refs['@agree@grunge@punch-icon'].mesh, { time: 0, scale: 0.0000001, opacity: 0.0, initScale: { x: 0.00000001, y: 0.00000001, z: 1 }, initOpacity: 0, delay: 0 })
      this.stretchIn(this.$refs['@agree@grunge@punch-about'].mesh, { time: 0, scale: 0.0000001, opacity: 0.0, initScale: { x: 0.00000001, y: 0.00000001, z: 1 }, initOpacity: 0, delay: 0 })

      this.opacity(this.$refs['@agree@desc@punch-icon'].mesh, 0)
      this.opacity(this.$refs['@agree@desc@punch-about'].mesh, 0)

      this.opacity(this.$refs['@agree@grunge@enter-now'].mesh, 0)
      this.opacity(this.$refs['@agree@agree@agree-rule'].mesh, 0)
      this.opacity(this.$refs['@agree@agree@box-unchecked'].mesh, 0)
      this.opacity(this.$refs['@agree@agree@box-checked'].mesh, 0)

      await this.sleep(100)
      this.opacity(this.$refs['@agree@grunge@enter-now'].mesh, 0)

      await this.sleep(500)
      this.shakeShake(this.shakeStack.title1, { x: 0, y: 10, z: 0 }, 700, 1.0)
      await this.sleep(0)
      this.revealMove(this.$refs['@agree@header@title2'].mesh, this.revealStack.title2, 400, { x: 0, y: 3, z: 0 })
      await this.sleep(0)
      this.scaleIn(this.$refs['@agree@bg@rex'].mesh, { time: 1500, scale: 0.5, opacity: 1.0, initScale: 0.45, initOpacity: 0, delay: 0 })
      await this.sleep(0)
      await this.shakeShake(this.shakeStack.rexBG, { x: 0, y: 0, z: 50 }, 500, 1.0)

      await this.sleep(500)
      // this.shakeShake(this.shakeStack.tagline, { x: 0, y: 10, z: 0 }, 500, 1.0)
      this.revealMove(this.$refs['@agree@tagline@title'].mesh, this.revealStack.tagline, 400, { x: 0, y: 3, z: 0 })
      this.stretchIn(this.$refs['@agree@grunge@punch-icon'].mesh, { time: 500, scale: this.aspect, opacity: 1.0, initScale: { x: this.aspect, y: this.aspect, z: 1 }, initOpacity: 0, delay: 0 })
      this.stretchIn(this.$refs['@agree@grunge@punch-about'].mesh, { time: 500, scale: this.aspect, opacity: 1.0, initScale: { x: this.aspect, y: this.aspect, z: 1 }, initOpacity: 0, delay: 0 })

      await this.sleep(100)
      this.revealMove(this.$refs['@agree@desc@punch-icon'].mesh, this.revealStack.punchIcon, 300, { x: 0, y: 3, z: 0 })
      this.revealMove(this.$refs['@agree@desc@punch-about'].mesh, this.revealStack.punchAbout, 300, { x: 0, y: 3, z: 0 })
      this.revealMove(this.$refs['@agree@agree@agree-rule'].mesh, this.revealStack.agreeRule, 500, { x: 0, y: 3, z: 0 })

      // checker
      await this.revealMove(this.$refs['@agree@agree@box-unchecked'].mesh, this.revealStack.uncheckBox, 500, { x: 0, y: 3, z: 0 })

      // check action
      this.stretchIn(this.$refs['@agree@agree@box-checked'].mesh, { time: 500, scale: this.aspect, opacity: 1.0, initScale: { x: 1, y: 1, z: 1 }, initOpacity: 0, delay: 0 })
      await this.revealMove(this.$refs['@agree@agree@box-checked'].mesh, this.revealStack.checkedBox, 500, { x: 0, y: 0, z: 0 })

      await this.sleep(250)
      // enter now
      await this.revealMove(this.$refs['@agree@grunge@enter-now'].mesh, this.revealStack.enterNow, 300, { x: -100, y: 0, z: 0 })
    },
    __add (v) {
      this.$nextTick(() => {
        this.$parent.scene.add(v)
      })
    },
    __remove (v) {
      this.$nextTick(() => {
        this.$parent.scene.remove(v)
      })
    },
    toggleBox () {
      this.checkedBox = !this.checkedBox
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
