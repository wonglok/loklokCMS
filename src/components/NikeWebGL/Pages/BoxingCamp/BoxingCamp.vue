<template>
  <transition
      @enter="pageFadeIn"
      @leave="pageFadeOut"
    >
    <keep-alive>
      <Object3D ref="page-content">

        <ImageMesh
          vms="@landing@hero@boxing"
          :link="require('./img/hero/nike-boxing.png')"
        />
        <ImageMesh
          vms="@landing@hero@camp"
          :link="require('./img/hero/camp.png')"
        />
        <ImageMesh
          vms="@landing@bg@boxing"
          :link="require('./img/bg/boxing.jpg')"
        />
        <ImageMesh
          vms="@landing@button-area@bg"
          :link="require('./img/button-area/button-area.png')"
        />
        <ImageMesh
          :gclick="(v) => { $router.push('/nike/game/agree') }"
          vms="@landing@button-area@enter-now"
          :link="require('./img/button-area/enter-now.png')"
        />
        <ImageMesh
          :gclick="(v) => { $router.push('/nike/game/comic-list') }"
          vms="@landing@button-area@watch-comics"
          :link="require('./img/button-area/watch-comics.png')"
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
