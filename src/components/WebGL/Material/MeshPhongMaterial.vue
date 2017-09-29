<template>
<span class="mesh-phong-material"><slot></slot></span>
</template>

<script>
import * as THREE from 'three'
export default {
  data () {
    return {
      material: null
    }
  },
  created () {
    this.material = new THREE.MeshPhongMaterial({
      color: 0xee0302,
      specular: 0xffffff,
      shininess: 1.0
    })
    // this.material
    this.$emit('material', this.material)
  },
  watch: {
  },
  mounted () {
    this.$parent.__add(this.material, 'material')
  },
  beforeDestroy () {
    this.$parent.__remove(this.material, 'material')
  }
}
</script>

<style scoped>
.mesh-phong-material{
  display: none;
}
</style>
