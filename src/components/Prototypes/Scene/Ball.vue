<template>
<span class="scene-root">
  <PerspectiveCamera :fov="75" :aspect="aspect" :near="1" :far="1000" @camera="(v) => { camera = v; }" />
  <Scene @scene="(v) => { scene = v; }">

    <Points ref="ball-p">
      <SphereGeometry />
      <PointsMaterial :color="0x00ff00" :opacity="0" />
    </Points>

    <Points ref="box-p">
      <BoxGeometry />
      <PointsMaterial :color="0xff00ff" :opacity="0" />
    </Points>

  </Scene>
  <Raycaster v-if="camera && scene" :camera="camera" :scene="scene" @setMouse="(v) => { $emit('setMouse', v); setMouse = v }" @hover="(v) => { hover = v }" @glClick="handleHit" />
</span>
</template>
<script>
import Bundle from '@/components/WebGL/Bundle'
import fadeInOut from '@/components/WebGL/Mixins/FadeInOut'
export default {
  mixins: [fadeInOut],
  props: ['aspect'],
  components: {
    ...Bundle
  },
  data () {
    return {
      camera: false,
      scene: false,
      setMouse: () => {},
      hover: () => { return [] },
      lastResult: []
    }
  },
  activated () {
    this.$emit('scene', this.scene)
    this.$emit('camera', this.camera)
    this.$emit('setMouse', this.setMouse)

    this.$nextTick(() => {
      this.$emit('exec', this.exec)
      this.fadeInTween((v) => {
        this.$refs['ball-p'].points.material.opacity = v
        this.$refs['box-p'].points.material.opacity = v
      }, () => {
      })
    })
  },
  deactivated () {
    this.$emit('setMouse', () => {})
    this.$emit('exec', () => {})
  },
  beforeRouteLeave (to, from, next) {
    this.fadeOutTween((v) => {
      this.$refs['ball-p'].points.material.opacity = v
      this.$refs['box-p'].points.material.opacity = v
    }, () => {
      next()
    })
  },
  methods: {
    handleHit ({ mouse, found }) {
      if (found[0]) {
        this.stopAllTween()
        this.fadeOutTween((v) => {
          found[0].object.rotation.z = Math.PI * -2.0 * v
        }, () => {
          this.fadeInTween((v) => {
            found[0].object.rotation.z = Math.PI * -2.0 * (1.0 - v)
          }, () => {
          })
        })
      }
    },
    highlight (result, color) {
      for (var i = 0; i < result.length; i++) {
        result[i].object.material.color.set(color)
      }
    },
    exec () {
      this.execTween()

      // this.highlight(this.lastResult, 0x00ffff)
      // var result = this.hover()
      // this.highlight(result, 0xff00ff)
      // this.lastResult = result

      this.camera.position.z = 20
      this.$refs['ball-p'].points.position.z = 8.5 + 8.5 * Math.sin(window.performance.now() / 1000)
      this.$refs['box-p'].points.position.z = 8.5 + 8.5 * Math.sin(window.performance.now() / 1000)
      this.$refs['box-p'].points.rotation.z = 8.5 + 8.5 * Math.sin(window.performance.now() / 1000)
    }
  }
}
</script>

<style scoped>
.scene-root{
  display: none;
}
</style>
