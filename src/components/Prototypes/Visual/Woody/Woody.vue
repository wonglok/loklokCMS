<template>
<span class="particle-sea"><slot></slot></span>
</template>

<script>
import Woody from '@/components/Prototypes/Visual/Woody/Woody.js'

export default {
  props: ['renderer', 'rect'],
  data () {
    return {
      api: Woody(),
      info: false
      // mesh: null
    }
  },
  mounted () {
    this.info = this.api.setup({ renderer: this.renderer, rect: this.rect })

    this.$emit('api', this.api)
    this.$parent.__add(this.info.points)
    // this.mesh = new THREE.Mesh()
    // this.$emit('mesh', this.mesh)
  },
  beforeDestroy () {
    if (this.info) {
      this.$parent.__remove(this.info.points)
    }
  },
  methods: {
    exec () {
      this.api.render()
    }
  },
  watch: {
    rect () {
      this.api.updateRect(this.rect)
    }
  }
}
</script>

<style scoped>
.particle-sea{
  display: none;
}
</style>
