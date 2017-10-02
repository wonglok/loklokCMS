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
  props: ['camera', 'scene'],
  data () {
    return {
      raycaster: null,
      mouse: new THREE.Vector2(0, 0)
    }
  },
  created () {
    this.raycaster = new THREE.Raycaster()
    this.mouse.isIn = false
    this.$emit('setMouse', this.setMouse)
    this.$emit('finder', this.finder)
    this.$emit('hover', this.hover)
  },
  activated () {
    this.$emit('setMouse', this.setMouse)
    this.$emit('finder', this.finder)
    this.$emit('hover', this.hover)
  },
  methods: {
    finder () {
      if (this.camera && this.scene && this.mouse) {
        this.raycaster.setFromCamera(this.mouse, this.camera)
        var intersects = this.raycaster.intersectObjects(this.scene.children)
        // console.log(intersects)
        return intersects
      } else {
        return []
      }
    },
    hover () {
      if (this.mouse.isIn) {
        return this.finder()
      } else {
        return []
      }
    },
    setMouse ({ pageX, pageY, rect, isIn, type }) {
      if (rect && typeof pageX !== 'undefined' && typeof pageY !== 'undefined') {
        this.mouse.x = ((pageX - rect.left) / rect.width) * 2 - 1
        this.mouse.y = -((pageY - rect.top) / rect.height) * 2 + 1
        // console.log(this.mouse)
      }
      if (typeof isIn !== 'undefined') {
        this.mouse.isIn = isIn
      }
      if (type === 'click') {
        return this.$emit('glClick', { mouse: this.mouse, found: this.finder() })
      }
    }
  }
}
</script>

<style scoped>
.raycaster{
  display: none;
}
</style>
