<template>
  <transition
      @enter="pageFadeIn"
      @leave="pageFadeOut"
    >
    <keep-alive>
      <Object3D ref="page-content">
        <ImageMesh
          dgclick="() => {  }"
          :position="{ x: -20.5 * aspect, y: 26.0, z: 0 }"
          :scale="{ x: 1, y: 1, z: 1.0 }"
          :link="require('./img/hero/nike-boxing.svg')"
        />
        <ImageMesh
          dgclick="() => {  }"
          :position="{ x: 0, y: 14.5, z: -0.1 }"
          :scale="{ x: 1 / 3 * 1.25, y: 1 / 3 * 1.25, z: 1.0 }"
          :link="require('./img/bg/boxing.jpg')"
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
