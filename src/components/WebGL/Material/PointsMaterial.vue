<template>
<span class="points-material"><slot></slot></span>
</template>

<script>
import * as THREE from 'three'
export default {
  props: {
    color: {
      type: Number
    }
  },
  data () {
    return {
      material: null
    }
  },
  created () {
    this.material = new THREE.PointsMaterial({
      color: 0xee0302,
      size: 2.0,
      sizeAttenuation: false,
      // lights: true,
      blending: THREE.AdditiveBlending
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
.points-material{
  display: none;
}
</style>
