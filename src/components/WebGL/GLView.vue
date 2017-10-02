<template>
  <div class="container full" ref="container">
    <keep-alive>
      <!-- <router-view
        :aspect="aspect"
        @refresh="(v) => { if (this.evlt) { this.evlt.resizer(); } }"
        @exec="(v) => { exec = v }"
        @scene="(v) => { scene = v }"
        @camera="(v) => { camera = v }"
      /> -->
      <component
        v-bind:is="'router-view'"
        :aspect="aspect"
        :rect="rect"
        @setMouse="(v) => { setMouse = v }"
        @exec="(v) => { exec = v }"
        @scene="(v) => { scene = v }"
        @camera="(v) => { camera = v }"
      >
      </component>
    </keep-alive>
    <WebGLRenderer v-if="keepRenderer" :rect="rect" :camera="camera" :scene="scene" @renderer="(v) => { renderer = v }">
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
      evlt: false,
      exec: () => {},
      uninstaller: () => {},
      setMouse: () => {},
      rect: false,
      aspect: 1.0,
      renderer: false,
      camera: false,
      scene: false,
      rAFID: 0,
      keepAlive: false
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
    },
    keepRenderer () {
      return (this.camera && this.scene && this.rect) || this.keepAlive
    }
  },
  watch: {
    ready () {
      if (this.ready) {
        this.keepAlive = true
      }
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
      var ev = this.evlt = {
        resizer: () => {
          this.rect = this.$refs.container.getBoundingClientRect()
          this.aspect = this.rect.width / this.rect.height
        },
        onMV: (evt) => {
          this.setMouse({ pageX: evt.pageX, pageY: evt.pageY })
        }
      }
      ev.resizer()
      this.$emit('refresh', () => {
        ev.resizer()
      })
      this.$refs.container.addEventListener('mousemove', ev.onMV, false)
      window.addEventListener('resize', ev.resizer, false)
      this.uninstaller = () => {
        this.$refs.container.removeEventListener('mousemove', ev.onMV)
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
