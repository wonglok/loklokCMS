<template>
  <CanvasMesh :vms="vms" :canvas="api.canvas" @texture="(v) => { texture = v }" />
</template>

<script>
import NumberCounterMaker from './NumberCounter'
import Bundle from '@/components/WebGL/Bundle'
export default {
  name: 'NumberCounter',
  props: {
    word: {
      default () {
        return ''
      }
    },
    vms: {
      type: String
    },
    totalTime: {
      type: Number,
      default: 300
    }
  },
  components: {
    ...Bundle
  },
  data () {
    return {
      rAFID: 0,
      progress: 0,
      texture: false,
      api: NumberCounterMaker()
    }
  },
  watch: {
    texture () {
    }
  },
  methods: {
    draw () {
      var rAF = () => {
        this.api.drawStroke(this.word || 0)
        if (this.texture) {
          this.texture.needsUpdate = true
        }
        this.rAFID = window.requestAnimationFrame(rAF)
      }
      this.rAFID = window.requestAnimationFrame(rAF)
    },
    start () {
      console.log('start number count down')
      this.startTime = window.performance.now()
      var self = this
      self.progress = 0
      window.requestAnimationFrame(function loopsy () {
        self.progress = (window.performance.now() - self.startTime) / self.totalTime
        var value = Math.abs(Math.ceil(((1.0 - self.progress) * self.totalTime / 1000)).toFixed(0))
        if (value > 0) {
          self.api.draw(value || 0)
        }
        if (self.texture) {
          self.texture.needsUpdate = true
        }
        if (self.progress <= 1) {
          window.requestAnimationFrame(loopsy)
        } else {
          self.$emit('done')
        }
      })
    },
    __add (v) {
      this.$parent.object3d.add(v)
    },
    __remove (v) {
      window.cancelAnimationFrame(this.rAFID)
      this.$parent.object3d.remove(v)
    }
  }
}
</script>

<style>

</style>
