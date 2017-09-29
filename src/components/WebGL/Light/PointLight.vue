<template>
<span class="point-light"><slot></slot></span>
</template>

<script>
import * as THREE from 'three'
export default {
  data () {
    return {
      light: null
    }
  },
  created () {
    this.light = new THREE.PointLight(0xff0000, 1, 100)
    this.light.position.set(10, 10, 10)
    // this.light
    this.$emit('light', this.light)
  },
  mounted () {
    this.$parent.__add(this.light)
  },
  beforeDestroy () {
    this.$parent.__remove(this.light)
  },
  watch: {
  }
}
</script>

<style scoped>
.point-light{
  display: none;
}
</style>
