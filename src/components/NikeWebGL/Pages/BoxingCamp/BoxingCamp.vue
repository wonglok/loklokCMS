<template>
  <transition
      @enter="(el, done) => { pageFadeIn(el, done); animateAll(); } "
      @leave="pageFadeOut"
    >
    <keep-alive>
      <Object3D ref="page-content">

        <ShakeMesh
          ref="@landing@shake@nike"
          vms="@landing@shake@nike"
          :link="require('./img/shake/nike.png')"
          @shake="(v) => { shakeStack.s1 = v }"
          @exec="(v) => { execStack.s1 = v }"
        />

        <ShakeMesh
          ref="@landing@shake@boxing"
          vms="@landing@shake@boxing"
          :link="require('./img/shake/boxing.png')"
          @shake="(v) => { shakeStack.s2 = v }"
          @exec="(v) => { execStack.s2 = v }"
        />

        <ShakeMesh
          ref="@landing@shake@camp"
          vms="@landing@shake@camp"
          :link="require('./img/shake/camp.png')"
          @shake="(v) => { shakeStack.s3 = v }"
          @exec="(v) => { execStack.s3 = v }"
        />

        <RevealMesh
          ref="@landing@reveal@box-txt-1"
          vms="@landing@reveal@box-txt-1"
          :link="require('./img/shake/box-txt-1.png')"
          @reveal="(v) => { revealStack.r1 = v }"
          @exec="(v) => { execStack.r1 = v }"
        />
        <RevealMesh
          ref="@landing@reveal@box-txt-2"
          vms="@landing@reveal@box-txt-2"
          :link="require('./img/shake/box-txt-2.png')"
          @reveal="(v) => { revealStack.r2 = v }"
          @exec="(v) => { execStack.r2 = v }"
        />
        <RevealMesh
          ref="@landing@reveal@box-btn-game"
          vms="@landing@reveal@box-btn-game"
          :gclick="(v) => { $router.push('/nike/game/agree') }"
          :link="require('./img/shake/box-btn-game.png')"
          @reveal="(v) => { revealStack.r3 = v }"
          @exec="(v) => { execStack.r3 = v }"
        />
        <RevealMesh
          ref="@landing@reveal@box-btn-comics"
          vms="@landing@reveal@box-btn-comics"
          :gclick="(v) => { $router.push('/nike/game/comic-list') }"
          :link="require('./img/shake/box-btn-comics.png')"
          @reveal="(v) => { revealStack.r4 = v }"
          @exec="(v) => { execStack.r4 = v }"
        />

        <BoxingArea
          ref="boxing-area"
          vms="@landing@shake@box-canvas"
        />

        <!-- <ImageMesh
          ref="@landing@hero@boxing"
          vms="@landing@hero@boxing"
          :link="require('./img/hero/nike-boxing.png')"
        /> -->

        <!-- <ImageMesh
          vms="@landing@hero@camp"
          ref="@landing@hero@camp"
          :link="require('./img/hero/camp.png')"
        /> -->

        <ImageMesh
          ref="@landing@bg@boxing"
          vms="@landing@bg@boxing"
          :link="require('./img/bg/boxing.jpg')"
        />

        <!-- <ImageMesh
          vms="@landing@button-area@bg"
          ref="@landing@button-area@bg"
          :link="require('./img/button-area/button-area.png')"
        /> -->

        <!-- <ImageMesh
          :gclick="(v) => { $router.push('/nike/game/agree') }"
          vms="@landing@button-area@enter-now"
          ref="@landing@button-area@enter-now"
          :link="require('./img/button-area/enter-now.png')"
        />
        <ImageMesh
          :gclick="(v) => { $router.push('/nike/game/comic-list') }"
          vms="@landing@button-area@watch-comics"
          ref="@landing@button-area@watch-comics"
          :link="require('./img/button-area/watch-comics.png')"
        /> -->

        <GrungeMesh
          vms="@landing@grunge@bg"
          :gOpacity="0.53"
          :color="0xbababa"
          @exec="(v) => { execStack.grungeBg = v }"
        />
      </Object3D>
    </keep-alive>
  </transition>
</template>

<script>
import fadeInOut from '@/components/WebGL/Mixins/FadeInOut'
import BoxingArea from '@/components/NikeWebGL/Pages/BoxingCamp/BoxingArea/BoxingArea.vue'

import Bundle from '@/components/WebGL/Bundle'
export default {
  name: 'BoxingCamp',
  mixins: [fadeInOut],
  components: {
    BoxingArea,
    ...Bundle
  },
  props: ['aspect'],
  data () {
    return {
      revealStack: {
      },
      shakeStack: {
      },
      execStack: {
        grungeBg () {}
      },
      tweening: false
    }
  },
  activated () {
    this.animateAll()
    this.$emit('exec', this.exec)
  },
  deactivated () {
    this.$emit('exec', () => {})
  },
  methods: {
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
    position (mesh, pos) {
      mesh.position.x = pos.x
      mesh.position.y = pos.y
      mesh.position.z = pos.z
    },
    strech (mesh, v) {
      mesh.scale.y = v
    },
    fadeInItems (item) {
      return new Promise((resolve, reject) => {
        var opacity = this.opacity

        var updater = (mesh) => {
          opacity(item.mesh, 0)
          let v = { v: 0 }
          new this.TWEEN.Tween(v)
            .to({ v: 1 }, 500)
            .onUpdate(() => {
              opacity(mesh, v.v)
            })
            .easing(this.TWEEN.Easing.Quadratic.Out)
            .onComplete(() => {
              resolve()
            })
            .start()
        }

        if (item) {
          updater(item.mesh)
        }
      })
    },
    fadeInZoom (item) {
      return new Promise((resolve, reject) => {
        var opacity = this.opacity
        var scale = this.scale

        var updater = (mesh) => {
          var origScale = item.mesh.scale.x
          scale(item.mesh, item.mesh.scale.x * 0.98)
          opacity(item.mesh, 0)
          let v = { v: 0, s: item.mesh.scale.x * 0.98 }
          new this.TWEEN.Tween(v)
            .to({ v: 1, s: origScale }, 2000)
            .onUpdate(() => {
              opacity(mesh, v.v)
              scale(mesh, v.s)
            })
            .easing(this.TWEEN.Easing.Quadratic.Out)
            .onComplete(() => {

            })
            .start()

          setTimeout(() => { resolve() }, 1500)
        }

        if (item) {
          updater(item.mesh)
        }
      })
    },
    shakeShake (item, shaker, pos) {
      return new Promise((resolve, reject) => {
        if (item) {
          shaker({ initPos: pos })
          setTimeout(() => {
            resolve()
          }, 333)
        }
      })
    },
    revealMove (item, revaler, pos) {
      return new Promise((resolve, reject) => {
        if (item) {
          revaler({ initPos: pos })
          setTimeout(() => {
            resolve()
          }, 500)
        }
      })
    },
    async animateAll () {
      this.$refs['boxing-area'].reset()
      this.opacity(this.$refs['@landing@bg@boxing'].mesh, 0)

      this.opacity(this.$refs['@landing@shake@nike'].mesh, 0)
      this.opacity(this.$refs['@landing@shake@boxing'].mesh, 0)
      this.opacity(this.$refs['@landing@shake@camp'].mesh, 0)

      this.opacity(this.$refs['@landing@reveal@box-txt-1'].mesh, 0)
      this.opacity(this.$refs['@landing@reveal@box-txt-2'].mesh, 0)
      this.opacity(this.$refs['@landing@reveal@box-btn-game'].mesh, 0)
      this.opacity(this.$refs['@landing@reveal@box-btn-comics'].mesh, 0)

      // this.opacity(this.$refs['@landing@hero@camp'].mesh, 0)
      // this.opacity(this.$refs['@landing@button-area@bg'].mesh, 0)
      // this.opacity(this.$refs['@landing@button-area@enter-now'].mesh, 0)
      // this.opacity(this.$refs['@landing@button-area@watch-comics'].mesh, 0)

      await this.waitSec(1000)
      await this.fadeInZoom(this.$refs['@landing@bg@boxing'])

      // await this.waitSec(1000)

      await this.shakeShake(this.$refs['@landing@shake@boxing'], this.shakeStack.s1, { x: 13, y: 0, z: 0 })
      await this.shakeShake(this.$refs['@landing@shake@nike'], this.shakeStack.s2, { x: 13, y: 0, z: 0 })
      await this.shakeShake(this.$refs['@landing@shake@camp'], this.shakeStack.s3, { x: -13, y: 0, z: 0 })

      await this.waitSec(100)

      this.$refs['boxing-area'].start()
      await this.waitSec(500)
      this.revealMove(this.$refs['@landing@reveal@box-btn-game'], this.revealStack.r3, { x: 0, y: 10, z: 0 })
      await this.waitSec(400)
      this.revealMove(this.$refs['@landing@reveal@box-txt-1'], this.revealStack.r1, { x: 0, y: 10, z: 0 })
      await this.waitSec(120)
      this.revealMove(this.$refs['@landing@reveal@box-txt-2'], this.revealStack.r2, { x: 0, y: 10, z: 0 })
      this.revealMove(this.$refs['@landing@reveal@box-btn-comics'], this.revealStack.r4, { x: 0, y: 10, z: 0 })

      // await this.fadeInItems(this.$refs['@landing@hero@camp'])
      // await this.fadeInItems(this.$refs['@landing@button-area@bg'])
      // this.fadeInItems(this.$refs['@landing@button-area@watch-comics'])
      // this.fadeInItems(this.$refs['@landing@button-area@enter-now'])
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
