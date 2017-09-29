<template>
<span class="box-geometry"><slot></slot></span>
</template>

<script>
import * as THREE from 'three'
export default {
  data () {
    return {
      geometry: null
    }
  },
  created () {
    this.geometry = new THREE.SphereGeometry(2, 32, 32)
    // this.geometry
    this.$emit('geometry', this.geometry)
  },
  watch: {
  },
  mounted () {
    this.$parent.__add(this.geometry, 'geometry')
  },
  beforeDestroy () {
    this.$parent.__remove(this.geometry, 'geometry')
  }
}
</script>

<style scoped>
.box-geometry{
  display: none;
}
</style>
