<template>
  <div class="container full" ref="container">
    <router-view
      :aspect="aspect"
      @exec="(v) => { exec = v }"
      @scene="(v) => { scene = v }"
      @camera="(v) => { camera = v }"
    />
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
      exec: () => {},
      uninstaller: () => {},
      rect: false,
      aspect: 1.0,
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
          this.exec()
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
