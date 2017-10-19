<template>
  <transition
      @enter="pageFadeIn"
      @leave="pageFadeOut"
    >
    <keep-alive>
      <Object3D ref="page-content">
        <ImageMesh
          :gclick="() => {  }"
          vms="@daily-task@top@title"
          :link="require('./img/top/title.png')"
        />
        <ImageMesh
          :gclick="() => {  }"
          vms="@daily-task@task@daily-task"
          :link="require('./img/task/daily-task.png')"
        />
        <ImageMesh
          :gclick="() => {  }"
          vms="@daily-task@slider@arrow-btn"
          :link="require('./img/slider/arrow-btn.png')"
        />
        <ImageMesh
          :visible="!slider.redeemed"
          :gclick="() => {  }"
          vms="@daily-task@slider@staff-only"
          :link="require('./img/slider/staff-only.png')"
        />
        <ImageMesh
          :visible="slider.redeemed"
          :gclick="() => {  }"
          vms="@daily-task@slider@redeemed"
          :link="require('./img/slider/redeemed.png')"
        />

        <GrungeMesh
          vms="@daily-task@grunge@slider"
          @exec="(v) => { execStack.slider = v }"
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
  name: 'DailyTask',
  mixins: [fadeInOut, scroller],
  components: {
    ...Bundle
  },
  props: ['aspect'],
  data () {
    return {
      slider: {
        redeemed: false,
        sliderX: false
      },
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
        yMax: 15,
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
