<template>
  <div class="full" ref="container">
    <PerspectiveCamera :fov="75" :aspect="aspect" :near="1" :far="1000" @camera="(v) => { camera = v }" />
    <router-view @scene="(v) => { scene = v }" />
    <WebGLRenderer v-if="ready" :rect="rect" :camera="camera" :scene="scene" @renderer="(v) => { renderer = v }">
    </WebGLRenderer>
  </div>
</template>

<script>
import Bundle from '@/components/WebGL/Bundle'
export default {
  components: {
    ...Bundle
  },
  data () {
    return {
      uninstaller: () => {},
      rect: false,
      aspect: window.innerWidth / window.innerHeight,
      renderer: false,
      camera: false,
      scene: false,
      rAFID: 0
    }
  },
  mounted () {
    this.install()
    this.loop()
  },
  beforeDestroy () {
    this.uninstaller()
    this.stop()
  },
  computed: {
    ready () {
      return this.camera && this.scene && this.rect
    }
  },
  methods: {
    stop () {
      window.cancelAnimationFrame(this.rAFID)
    },
    loop () {
      var loopsiloop = () => {
        this.rAFID = window.requestAnimationFrame(loopsiloop)
        if (this.renderer) {
          this.renderer.render(this.scene, this.camera)
        }
      }
      this.rAFID = window.requestAnimationFrame(loopsiloop)
    },
    install () {
      var ev = {
        resizer: () => {
          this.rect = this.$refs.container.getBoundingClientRect()
          this.aspect = this.rect.width / this.rect.height
        }
      }
      ev.resizer()
      window.addEventListener('resize', ev.resizer, false)
      this.uninstaller = () => {
        window.removeEventListener('resize', ev.resizer)
      }
    }
  }
}
</script>

<style scoped>
.full{
  width: 100%;
  height: 100%;
}
</style>
