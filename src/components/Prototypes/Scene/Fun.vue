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
      <SphereGeometry />
    </Mesh>

    <PointLight />
  </Scene>
  <Raycaster v-if="rect && camera && scene" :camera="camera" :scene="scene" :rect="rect" @setMouse="(v) => { $emit('setMouse', v); setMouse = v }" @finder="(v) => { finder = v }" />
</span>
</template>

<script>
import Bundle from '@/components/WebGL/Bundle'
import fadeInOut from '@/components/WebGL/Mixins/FadeInOut'
export default {
  mixins: [fadeInOut],
  props: ['aspect', 'rect'],
  components: {
    ...Bundle
  },
  data () {
    return {
      camera: false,
      scene: false,
      setMouse: () => {},
      finder: () => { return [] }
    }
  },
  activated () {
    this.$emit('setMouse', this.setMouse)
    this.$emit('scene', this.scene)
    this.$emit('camera', this.camera)
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
    this.$emit('exec', () => {})
  },
  methods: {
    highlight (result) {
      for (var i = 0; i < result.length; i++) {
        result[i].object.material.color.set(0xff00ff)
      }
    },
    exec () {
      this.$refs['mesh-1'].mesh.material.color.set(0xffffff)
      var result = this.finder()
      this.highlight(result)
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
