<template>
<span class="mesh"><slot></slot></span>
</template>
<script>
import * as THREE from 'three'
export default {
  data () {
    return {
      mesh: null,
      default: {
        geometry: false,
        material: false
      }
    }
  },
  created () {
    this.mesh = new THREE.Mesh()
    this.default.geometry = this.mesh.geometry
    this.default.material = this.mesh.material
    this.$emit('mesh', this.mesh)
  },
  watch: {
  },
  // calling parent methods.
  mounted () {
    this.$parent.__add(this.mesh)
  },
  beforeDestroy () {
    this.$parent.__remove(this.mesh)
  },
  methods: {
    // let child add
    __add (v, type) {
      if (type === 'geometry') {
        this.mesh.geometry = v
      }
      if (type === 'material') {
        this.mesh.material = v
      }
    },
    __remove (v, type) {
      if (type === 'geometry') {
        this.mesh.geometry = this.default.geometry
      }
      if (type === 'material') {
        this.mesh.material = this.default.material
      }
    }
  }
}
</script>

<style scoped>
.mesh{
  display: none;
}
</style>
