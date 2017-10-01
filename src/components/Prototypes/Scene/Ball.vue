<template>
<span class="scene-root">
  <PerspectiveCamera :fov="75" :aspect="aspect" :near="1" :far="1000" @camera="(v) => { camera = v; $emit('camera', v) }" />
  <Scene @scene="(v) => { $emit('scene', v) }">

    <Points ref="ball-p">
      <SphereGeometry />
      <PointsMaterial :color="0x00ff00" />
    </Points>

    <Points ref="box-p">
      <BoxGeometry />
      <PointsMaterial :color="0xff00ff" />
    </Points>

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
      this.$refs['ball-p'].points.material.opacity = v
      this.$refs['box-p'].points.material.opacity = v
    }, () => {
    })
  },
  beforeRouteLeave (to, from, next) {
    this.fadeOutTween((v) => {
      this.$refs['ball-p'].points.material.opacity = v
      this.$refs['box-p'].points.material.opacity = v
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
