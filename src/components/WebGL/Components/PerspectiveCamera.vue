<template>
<span class="perspective-camera"></span>
</template>
<script>
import * as THREE from 'three'
export default {
  props: ['fov', 'aspect', 'near', 'far'],
  data () {
    return {
      camera: null
    }
  },
  created () {
    this.camera = new THREE.PerspectiveCamera(this.fov, this.aspect, this.near, this.far)
    this.camera.position.z = 5
    this.$emit('camera', this.camera)
  },
  watch: {
    aspect () {
      if (this.camera) {
        this.camera.aspect = this.aspect
        this.camera.updateProjectionMatrix()
      }
    }
  }
}
</script>

<style scoped>
.perspective-camera{
  display: none;
}
</style>
