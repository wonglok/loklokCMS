<template>
  <transition
      @enter="pageFadeIn"
      @leave="pageFadeOut"
    >
    <keep-alive>
      <Object3D ref="page-content">
        <ImageMesh
          vms="@status@checkstatus@my-records"
          :gclick="() => {  }"
          :link="require('./img/checkstatus/my-records.png')"
        />
        <ImageMesh
          vms="@status@checkstatus@j5"
          :gclick="() => {  }"
          :link="require('./img/checkstatus/j5.png')"
        />
        <ImageMesh
          vms="@status@checkstatus@j7"
          :gclick="() => {  }"
          :link="require('./img/checkstatus/j7.png')"
        />
        <ImageMesh
          vms="@status@checkstatus@j9"
          :gclick="() => {  }"
          :link="require('./img/checkstatus/j9.png')"
        />

        <ImageMesh
          vms="@status@checkstatus@btn-rule"
          :gclick="() => {  }"
          :link="require('./img/checkstatus/btn-rule.png')"
        />

        <ImageMesh
          vms="@status@checkstatus@btn-nike"
          :gclick="() => {  }"
          :link="require('./img/checkstatus/btn-nike.png')"
        />

        <ImageMesh
          vms="@status@checkstatus@btn-nike"
          :gclick="() => {  }"
          :link="require('./img/checkstatus/btn-nike.png')"
        />

        <ImageMesh
          vms="@status@checkstatus@rules-text"
          :gclick="() => {  }"
          :link="require('./img/checkstatus/rules-text.png')"
        />
        <GrungeMesh
          vms="@status@grunge@coupon-box-j5"
          @exec="(v) => { execStack.j5 = v }"
          :gclick="() => {  }"
        />
        <GrungeMesh
          vms="@status@grunge@coupon-box-j7"
          @exec="(v) => { execStack.j7 = v }"
          :gclick="() => {  }"
        />
        <GrungeMesh
          vms="@status@grunge@coupon-box-j9"
          @exec="(v) => { execStack.j9 = v }"
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
  name: 'Status',
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
        yMax: 65 * this.aspect,
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
