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
        <GrungeMesh
          vms="@landing@grunge@bg"
          :gOpacity="0.53"
          :color="0xbababa"
          @exec="(v) => { execStack.grungeBg = v }"
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
      execStack: {
        grungeBg () {}
      },
      tweening: false
    }
  },
  activated () {
    this.$emit('exec', this.exec)
  },
  deactivated () {
    this.$emit('exec', () => {})
  },
  methods: {
    __add (v) {
      this.$parent.scene.add(v)
    },
    __remove (v) {
      this.$parent.scene.remove(v)
    },
    exec () {
      for (var exe in this.execStack) {
        this.execStack[exe]()
      }
    }
  }
}
</script>

<style scoped>

</style>
