<template>
  <transition
      @enter="pageFadeIn"
      @leave="pageFadeOut"
    >
    <keep-alive>
      <Object3D ref="page-content">
        <ImageMesh
          :gclick="() => { $router.push('/nike/game/play') }"
          :position="{ x: 0, y: 20.0, z: -0.1 }"
          :scale="{ x: 1 / 3 * 1.35, y: 1 / 3 * 1.35, z: 1.0 }"
          :link="require('./img/enter.png')"
        />
      </Object3D>
    </keep-alive>
  </transition>
</template>

<script>
import fadeInOut from '@/components/WebGL/Mixins/FadeInOut'
// import * as THREE from 'three'
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
