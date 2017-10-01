<template>
<span class="scene-root">
  <PerspectiveCamera :fov="75" :aspect="aspect" :near="1" :far="1000" @camera="(v) => { $emit('camera', v) }" />
  <Scene @scene="(v) => { $emit('scene', v) }">
    <Mesh ref="mesh-1">
      <MeshPhongMaterial  />
      <SphereGeometry />
    </Mesh>
    <PointLight />
  </Scene>
</span>
</template>

<script>
import Bundle from '@/components/WebGL/Bundle'
import fadeInOut from '@/components/WebGL/Tween/FadeInOutMixin'
export default {
  mixins: [fadeInOut],
  props: ['aspect'],
  components: {
    ...Bundle
  },
  mounted () {
    this.$emit('exec', this.exec)
    this.fadeInTween((v) => {
      this.$refs['mesh-1'].mesh.material.opacity = v
      this.$refs['mesh-1'].mesh.position.z = -2 * (1 - v)
    }, () => {

    })
  },
  beforeRouteLeave (to, from, next) {
    this.fadeOutTween((v) => {
      this.$refs['mesh-1'].mesh.material.opacity = v
    }, () => {
      next()
    })
  },
  beforeDestroy () {
    this.$emit('exec', () => {})
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
