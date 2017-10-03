<template>
<span class="particle-sea"><slot></slot></span>
</template>

<script>
import ParticleSea from '@/components/Prototypes/Visual/ParticleSea/ParticleSea.js'

export default {
  props: ['renderer'],
  data () {
    return {
      api: ParticleSea(),
      info: false
      // mesh: null
    }
  },
  mounted () {
    this.info = this.api.setup({ renderer: this.renderer })

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
  }
}
</script>

<style scoped>
.particle-sea{
  display: none;
}
</style>
