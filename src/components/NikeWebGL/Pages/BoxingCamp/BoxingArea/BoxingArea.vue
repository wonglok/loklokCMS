<template>
  <CanvasMesh :vms="vms" :canvas="api.canvas" @texture="(v) => { texture = v }" />
</template>

<script>
// import TWEEN from '@tweenjs/tween.js'

import maker from './boxingArea'
import Bundle from '@/components/WebGL/Bundle'
export default {
  name: 'BoxingArea',
  props: {
    vms: {
      type: String
    },
    totalTime: {
      type: Number,
      default: 3000
    }
  },
  components: {
    ...Bundle
  },
  data () {
    return {
      progress: 0,
      texture: false,
      api: maker({ refresher: this.refresher })
    }
  },
  watch: {
    texture () {
    }
  },
  methods: {
    refresher () {
      if (this.texture) {
        this.texture.needsUpdate = true
      }
    },
    reset () {
      this.api.reset()
      if (this.texture) {
        this.texture.needsUpdate = true
      }
    },
    start () {
      this.api.start()

      console.log('start count down')
      this.startTime = window.performance.now()
      var self = this
      self.progress = 0
      window.requestAnimationFrame(function loopsy () {
        self.progress = (window.performance.now() - self.startTime) / self.totalTime
        self.api.draw(self.progress || 0)
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
      this.$parent.object3d.remove(v)
    }
  }
}
</script>

<style>

</style>
