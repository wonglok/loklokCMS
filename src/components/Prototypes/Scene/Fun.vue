<template>
<span class="scene-root">
  <PerspectiveCamera :fov="75" :aspect="aspect" :near="1" :far="1000" @camera="(v) => { camera = v; $emit('camera', v) }" />
  <Scene @scene="(v) => { scene = v; $emit('scene', v) }">
    <Mesh ref="mesh-1">
      <MeshPhongMaterial :opacity="0" />
      <SphereGeometry />
    </Mesh>
    <PointLight />
  </Scene>
</span>
</template>

<script>
import Vue from 'vue'
import Bundle from '@/components/WebGL/Bundle'
import fadeInOut from '@/components/WebGL/Tween/FadeInOutMixin'
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
  // mounted () {
  //   this.$emit('scene', this.scene)
  //   this.$emit('camera', this.camera)
  //   this.$emit('exec', this.exec)
  //   Vue.nextTick(() => {
  //     this.fadeInTween((v) => {
  //       this.$refs['mesh-1'].mesh.material.opacity = v
  //       this.$refs['mesh-1'].mesh.position.z = -2 * (1 - v)
  //     }, () => {
  //     })
  //   })
  // },
  activated () {
    this.$emit('scene', this.scene)
    this.$emit('camera', this.camera)
    this.$emit('exec', this.exec)
    Vue.nextTick(() => {
      this.fadeInTween((v) => {
        this.$refs['mesh-1'].mesh.material.opacity = v
        this.$refs['mesh-1'].mesh.position.z = -2 * (1 - v)
      }, () => {
      })
    })
  },

  beforeRouteLeave (to, from, next) {
    this.fadeOutTween((v) => {
      this.$refs['mesh-1'].mesh.material.opacity = v
      this.$refs['mesh-1'].mesh.position.z = -10 * (1.0 - v)
    }, () => {
      next()
    })
  },
  deactivated () {
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
