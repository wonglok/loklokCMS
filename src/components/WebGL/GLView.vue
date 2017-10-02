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
        onTS: (evt) => {
          evt.preventDefault()
          this.setMouse({ isIn: true, type: 'click', pageX: evt.touches[0].pageX, pageY: evt.touches[0].pageY, rect: this.rect })
        },
        onTM: (evt) => {
          evt.preventDefault()
          this.setMouse({ pageX: evt.touches[0].pageX, pageY: evt.touches[0].pageY, rect: this.rect })
        },
        onTE: (evt) => {
          this.setMouse({ isIn: false })
        },
        onMV: (evt) => {
          evt.preventDefault()
          this.setMouse({ pageX: evt.pageX, pageY: evt.pageY, rect: this.rect })
        },
        onME: (evt) => {
          this.setMouse({ isIn: true })
        },
        onML: (evt) => {
          this.setMouse({ isIn: false })
        },
        onCL: (evt) => {
          this.setMouse({ type: 'click', pageX: evt.pageX, pageY: evt.pageY, rect: this.rect })
        }
      }
      ev.resizer()
      this.$emit('refresh', () => {
        ev.resizer()
      })
      this.$refs.container.addEventListener('mouseenter', ev.onME, false)
      this.$refs.container.addEventListener('mouseleave', ev.onML, false)
      this.$refs.container.addEventListener('mousemove', ev.onMV, false)

      this.$refs.container.addEventListener('click', ev.onCL, false)

      this.$refs.container.addEventListener('touchstart', ev.onTS, false)
      this.$refs.container.addEventListener('touchmove', ev.onTM, false)
      this.$refs.container.addEventListener('touchend', ev.onTE, false)
      this.$refs.container.style['-webkit-tap-highlight-color'] = `rgba(0,0,0,0)`
      window.addEventListener('resize', ev.resizer, false)
      this.uninstaller = () => {
        this.$refs.container.removeEventListener('mouseenter', ev.onME)
        this.$refs.container.removeEventListener('mouseleave', ev.onML)
        this.$refs.container.removeEventListener('mousemove', ev.onMV)

        this.$refs.container.removeEventListener('click', ev.onCL)

        this.$refs.container.removeEventListener('touchstart', ev.onTS)
        this.$refs.container.removeEventListener('touchmove', ev.onTM)
        this.$refs.container.removeEventListener('touchend', ev.onTE)
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
