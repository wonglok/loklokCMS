<template>
  <transition
      @enter="pageFadeIn"
      @leave="pageFadeOut"
    >
    <keep-alive>
      <Object3D ref="page-content">

        <ImageMesh
          :gclick="() => {  }"
          vms="@rules@top@title"
          :link="require('./img/top/title.png')"
        />
        <ImageMesh
          :gclick="() => {  }"
          vms="@rules@rules@30sec"
          :link="require('./img/rules/30sec.png')"
        />
        <ImageMesh
          :gclick="() => {  }"
          vms="@rules@rules@fb-share"
          :link="require('./img/rules/fb-share.png')"
        />
        <ImageMesh
          :gclick="() => {  }"
          vms="@rules@rules@nike-store"
          :link="require('./img/rules/nike-store.png')"
        />
        <ImageMesh
          :gclick="() => {  }"
          vms="@rules@rules@terms-title"
          :link="require('./img/rules/terms-title.png')"
        />
        <ImageMesh
          :gclick="() => {  }"
          vms="@rules@rules@terms-text"
          :link="require('./img/rules/terms-text.png')"
        />

        <GrungeMesh
          vms="@rules@grunge@rule-box-r1"
          @exec="(v) => { execStack.r1 = v }"
          :gclick="() => {  }"
        />
        <GrungeMesh
          vms="@rules@grunge@rule-box-r2"
          @exec="(v) => { execStack.r2 = v }"
          :gclick="() => {  }"
        />
        <GrungeMesh
          vms="@rules@grunge@rule-box-r3"
          @exec="(v) => { execStack.r3 = v }"
          :gclick="() => {  }"
        />
        <GrungeMesh
          vms="@rules@grunge@terms-box"
          @exec="(v) => { execStack.terms = v }"
          :gclick="() => {  }"
        />

      </Object3D>
    </keep-alive>
  </transition>
</template>

<script>
import fadeInOut from '@/components/WebGL/Mixins/FadeInOut'
import scroller from '@/components/WebGL/Mixins/scroller'

import Bundle from '@/components/WebGL/Bundle'
export default {
  name: 'Rules',
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
        yMax: 165,
        yMin: 0,
        xMax: 0,
        xMin: 0
      }
    })
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
