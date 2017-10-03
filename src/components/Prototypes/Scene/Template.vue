<template>
<span class="scene-root">
  <PerspectiveCamera
    :fov="75"
    :aspect="aspect"
    :near="1"
    :far="1000"
    @camera="(v) => { camera = v; }"
  />
  <Scene @scene="(v) => { scene = v; }">

    <Mesh ref="mesh-1">
      <MeshPhongMaterial :opacity="0" />
      <SphereGeometry  />
    </Mesh>

    <PointLight />
  </Scene>
  <!-- <Raycaster
    v-if="camera && scene"
    :camera="camera"
    :scene="scene"
    @setMouse="(v) => { $emit('setMouse', v); setMouse = v; }"
    @hover="(v) => { hover = v }"
    @glClick="handleHit"
  /> -->
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
        this.camera.position.z = 10
        this.$refs['mesh-1'].mesh.material.opacity = v
        this.$refs['mesh-1'].mesh.position.z = 5 * (1 - v)
      }, () => {
      })
    })
  },
  beforeRouteLeave (to, from, next) {
    this.fadeOutTween((v) => {
      this.camera.position.z = 10
      this.$refs['mesh-1'].mesh.material.opacity = v
      this.$refs['mesh-1'].mesh.position.z = -5 * (1.0 - v)
    }, () => {
      next()
    })
  },
  deactivated () {
    this.$emit('setMouse', () => {})
    this.$emit('exec', () => {})
  },
  methods: {
    handleHit ({ mouse, found }) {
      if (found[0]) {
        this.stopAllTween()
        this.fadeOutTween((v) => {
          found[0].object.material.opacity = v
        }, () => {
          this.fadeInTween((v) => {
            found[0].object.material.opacity = v
          }, () => {
          })
        })
      }
    },
    highlight (result, color) {
      if (result.length === 0) { return }
      for (var i = 0; i < result.length; i++) {
        result[i].object.material.color.set(color)
      }
    },
    exec () {
      // this.$refs['mesh-1'].mesh.material.color.set(0xffffff)

      // this.highlight(this.lastResult, 0x00ffff)
      // var result = this.hover()
      // this.highlight(result, 0xff00ff)
      // this.lastResult = result

      this.execTween()
    }
  }
}
</script>

<style scoped>
.scene-root{
  display: none;
}
</style>
