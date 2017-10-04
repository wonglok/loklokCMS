<template>
<span class="mesh"><slot></slot></span>
</template>
<script>
import * as THREE from 'three'
export default {
  props: ['position', 'gclick'],
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
    if (this.gclick) {
      this.mesh.userData.gclick = this.gclick
    }
    if (this.position) {
      this.mesh.position.set(this.position.x || 0, this.position.y || 0, this.position.z || 0)
    }
    this.default.geometry = this.mesh.geometry
    this.default.material = this.mesh.material
    this.$emit('mesh', this.mesh)
  },
  watch: {
    position () {
      if (this.position) {
        this.mesh.position.set(this.position.x || 0, this.position.y || 0, this.position.z || 0)
      }
    }
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
