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

    <!-- <PointLight /> -->
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
        this.$refs['ball-p'].points.material.opacity = v
        this.$refs['box-p'].points.material.opacity = v
      }, () => {
      })
    })
  },
  deactivated () {
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
