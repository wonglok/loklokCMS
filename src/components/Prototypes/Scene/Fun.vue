<template>
<span class="scene-root">
  <PerspectiveCamera :fov="75" :aspect="aspect" :near="1" :far="1000" @camera="(v) => { camera = v; }" />
  <Scene @scene="(v) => { scene = v; }">

    <Mesh ref="mesh-1">
      <MeshPhongMaterial :opacity="0" />
      <SphereGeometry />
    </Mesh>

    <PointLight />

  </Scene>
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
      scene: false
    }
  },
  activated () {
    this.$emit('scene', this.scene)
    this.$emit('camera', this.camera)
    this.$emit('exec', this.exec)

    this.$nextTick(() => {
      this.fadeInTween((v) => {
        this.camera.position.z = 10
        this.$refs['mesh-1'].mesh.material.opacity = v
        this.$refs['mesh-1'].mesh.position.z = 5 * (1 - v)
      }, () => {
      })
    })
  },
  deactivated () {
    this.$emit('exec', () => {})
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
  methods: {
    exec () {
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
