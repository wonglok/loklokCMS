<template>
<span class="scene-root">
  <PerspectiveCamera :fov="75" :aspect="aspect" :near="1" :far="1000" @camera="(v) => { camera = v; $emit('camera', v) }" />
  <Scene @scene="(v) => { $emit('scene', v) }">
    <Points>
      <SphereGeometry />
      <PointsMaterial :color="0xff00ff" />
    </Points>
    <PointLight />
  </Scene>
</span>
</template>
<script>
import Bundle from '@/components/WebGL/Bundle'
export default {
  props: ['aspect'],
  components: {
    ...Bundle
  },
  methods: {
    exec () {
      this.camera.position.z = 5.5 + 1.5 * Math.sin(window.performance.now() / 1000)
    }
  },
  mounted () {
    this.$emit('exec', this.exec)
  },
  beforeDestroy () {
    this.$emit('exec', () => {})
  }
}
</script>

<style scoped>
.scene-root{
  display: none;
}
</style>
