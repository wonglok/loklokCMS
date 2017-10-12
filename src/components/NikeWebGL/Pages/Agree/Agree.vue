<template>
  <transition
      @enter="pageFadeIn"
      @leave="pageFadeOut"
    >
    <keep-alive>
      <Object3D ref="page-content">
        <ImageMesh
          :gclick="() => { $router.push('/nike/game/play') }"
          vms="@agree@cta@enter-now"
          :link="require('./img/enter.png')"
        />
        <ImageMesh
          vms="@agree@header@title"
          :link="require('./img/header/title.png')"
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
  name: 'Agree',
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
