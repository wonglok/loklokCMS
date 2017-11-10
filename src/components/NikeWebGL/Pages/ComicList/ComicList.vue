<template>
  <transition
      @enter="pageFadeIn"
      @leave="pageFadeOut"
    >
    <keep-alive>
      <Object3D ref="page-content">
        <ImageMesh
          :gclick="() => {  }"
          vms="@comic-list@header@hero"
          :link="require('./img/header/hero.png')"
        />
        <!-- <ImageMesh
          :gclick="() => {  }"
          vms="@comic-list@header@slope"
          :link="require('./img/header/slope.png')"
        />
        <ImageMesh
          :gclick="() => {  }"
          vms="@comic-list@header@slope2"
          :link="require('./img/header/slope.png')"
        /> -->
        <ImageMesh
          :gclick="() => {  }"
          vms="@comic-list@title@title"
          :link="require('./img/title/title.png')"
        />

        <ImageMesh
          :gclick="() => { $router.push({ path: '/nike/game/comic-detail/1' }) }"
          vms="@comic-list@link@l-1"
          :link="require('./img/link/l-1.png')"
        />
        <ImageMesh
          :gclick="() => { $router.push({ path: '/nike/game/comic-detail/2' }) }"
          vms="@comic-list@link@l-2"
          :link="require('./img/link/l-2.png')"
        />
        <ImageMesh
          :gclick="() => { $router.push({ path: '/nike/game/comic-detail/3' }) }"
          vms="@comic-list@link@l-3"
          :link="require('./img/link/l-3.png')"
        />
        <ImageMesh
          :gclick="() => { $router.push({ path: '/nike/game/comic-detail/4' }) }"
          vms="@comic-list@link@l-4"
          :link="require('./img/link/l-4.png')"
        />

      </Object3D>
    </keep-alive>
  </transition>
</template>

<script>
import fadeInOut from '@/components/WebGL/Mixins/FadeInOut'

import Bundle from '@/components/WebGL/Bundle'
import scroller from '@/components/WebGL/Mixins/scroller'

export default {
  name: 'ComicList',
  mixins: [fadeInOut, scroller],
  components: {
    ...Bundle
  },
  props: ['aspect'],
  data () {
    return {
      mouseStack: {},
      execStack: {},
      tweening: false
    }
  },
  activated () {
    this.$emit('exec', () => {
      for (var execItem in this.execStack) {
        let exec = this.execStack[execItem]
        if (exec) {
          exec()
        }
      }
    })
    this.$emit('setMouse', (args) => {
      for (var name in this.mouseStack) {
        let exec = this.mouseStack[name]
        if (exec) {
          exec(args)
        }
      }
    })
    this.setupScroller({
      target: this.$refs['page-content'],
      enable: { x: false, y: true },
      bound: {
        yMax: 10,
        yMin: 0,
        xMax: 0,
        xMin: 0
      }
    })
    this.emitHandler()
  },
  deactivated () {
    this.cleanupScroller()
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
