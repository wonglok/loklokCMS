<template>
  <transition
      @enter="pageFadeIn"
      @leave="pageFadeOut"
    >
    <keep-alive>
      <Object3D ref="page-content">

        <ImageMesh
          dgclick="() => {  }"
          :position="{ x: -20.5 * aspect, y: 25.0, z: 0 }"
          :scale="{ x: 0.5 * 1.25, y: 0.5 * 1.25, z: 1.0 }"
          :link="require('./img/hero/nike-boxing.png')"
        />

        <ImageMesh
          dgclick="() => {  }"
          :position="{ x: 0, y: 14.5, z: -0.1 }"
          :scale="{ x: 0.3333 * 1.25, y: 0.3333 * 1.25, z: 1.0 }"
          :link="require('./img/bg/boxing.jpg')"
        />

        <ImageMesh
          dgclick="() => {  }"
          :position="{ x: 26 * aspect, y: 14.5, z: -0.1 }"
          :scale="{ x: 0.5 * 1.25, y: 0.5 * 1.25, z: 1.0 }"
          :link="require('./img/hero/camp.png')"
        />

      </Object3D>
    </keep-alive>
  </transition>
</template>

<script>
import fadeInOut from '@/components/WebGL/Mixins/FadeInOut'

import Bundle from '@/components/WebGL/Bundle'
export default {
  name: 'BoxingCamp',
  mixins: [fadeInOut],
  components: {
    ...Bundle
  },
  props: ['aspect'],
  data () {
    return {
      tweening: false
    }
  },
  methods: {
    __add (v) {
      this.$parent.scene.add(v)
    },
    __remove (v) {
      this.$parent.scene.remove(v)
    }
  }
}
</script>

<style scoped>

</style>
