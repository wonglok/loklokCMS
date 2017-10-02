<template>
<span class="raycaster"></span>
</template>
<script>
import * as THREE from 'three'
export default {
  // abstract: true,
  // render () {
  //   return null
  // },
  props: ['rect', 'camera', 'scene'],
  data () {
    return {
      raycaster: null,
      mouse: new THREE.Vector2(0, 0)
    }
  },
  created () {
    this.raycaster = new THREE.Raycaster()
    // this.mouse = new THREE.Vector2(0, 0)
    // this.raycaster
    this.$emit('setMouse', ({ pageX, pageY }) => {
      if (this.rect && typeof pageX !== 'undefined' && typeof pageY !== 'undefined') {
        this.mouse.x = ((pageX - this.rect.left) / this.rect.width) * 2 - 1
        this.mouse.y = -((pageY - this.rect.top) / this.rect.height) * 2 + 1
        // console.log(this.mouse)
      }
    })
    this.$emit('finder', () => {
      if (this.camera && this.scene && this.mouse) {
        this.raycaster.setFromCamera(this.mouse, this.camera)
        var intersects = this.raycaster.intersectObjects(this.scene.children)
        // console.log(intersects)
        return intersects
      } else {
        return []
      }
    })
  },
  watch: {
  }
}
</script>

<style scoped>
.raycaster{
  display: none;
}
</style>
