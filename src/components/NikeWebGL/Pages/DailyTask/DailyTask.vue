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

        <Slider
          @exec="(v) => { execStack.slider = v }"
          @setMouse="(v) => { mouseStack.slider = v }"
        />

      </Object3D>
    </keep-alive>
  </transition>
</template>

<script>
import fadeInOut from '@/components/WebGL/Mixins/FadeInOut'
import scroller from '@/components/WebGL/Mixins/scroller'

import Bundle from '@/components/WebGL/Bundle'
import Slider from '@/components/NikeWebGL/Pages/DailyTask/Slider'
export default {
  name: 'DailyTask',
  mixins: [fadeInOut, scroller],
  components: {
    ...Bundle,
    Slider
  },
  props: ['aspect', 'raycaster'],
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
    this.mouseStack.scroller = (args) => {
      this.scrollEntry(args)
    }

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
