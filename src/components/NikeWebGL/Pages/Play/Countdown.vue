<template>
  <transition
    @enter="onPageEnter"
    @leave="pageFadeOut"
  >
    <keep-alive>
      <Object3D ref="sub-page-content">
        <!-- <ImageMesh
          :gclick="() => {  }"
          vms="@play@start@hold-tight"
          :link="require('./img/start/hold-tight.png')"
        /> -->
        <RingCounter
          ref="ring-counter"
          :totalTime="3000"
          @done="() => { if (isViewingPage) {
            $router.push({ path: '/nike/game/play/record' })
          } }"
          vms="@play@countdown@ring-counter"
        ></RingCounter>
        <NumberCounter
          ref="number-counter"
          :totalTime="3000"
          @done="() => { if (isViewingPage) {
            // $router.push({ path: '/nike/game/play/record' })
          } }"
          vms="@play@countdown@number-counter"
        >
        </NumberCounter>
      </Object3D>
    </keep-alive>
  </transition>
</template>

<script>
import fadeInOut from '@/components/WebGL/Mixins/FadeInOut'
import Bundle from '@/components/WebGL/Bundle'
import RingCounter from './RingCounter/RingCounter'
import NumberCounter from './NumberCounter/NumberCounter.vue'
export default {
  name: 'Countdown',
  mixins: [fadeInOut],
  components: {
    ...Bundle,
    RingCounter,
    NumberCounter
  },
  props: ['aspect', 'camera'],
  data () {
    return {
      execStack: {},
      tweening: false
    }
  },
  computed: {
    isViewingPage () {
      return this.$router.currentRoute.fullPath.indexOf('game/play/countdown') !== -1
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
    this.$nextTick(() => {
      this.startBoth()
    })
  },
  deactivated () {
    this.$emit('exec', () => {})
  },
  methods: {
    startBoth () {
      if (this.$refs['ring-counter']) {
        this.$refs['ring-counter'].start()
      }
      if (this.$refs['number-counter']) {
        this.$refs['number-counter'].start()
      }
    },
    onPageEnter (v, done) {
      this.pageFadeIn(v, done)
      setTimeout(() => {
        this.startBoth()
      }, 500)
    },
    __add (v) {
      this.$parent.$parent.$parent.scene.add(v)
    },
    __remove (v) {
      this.$parent.$parent.$parent.scene.remove(v)
    }
  }
}
</script>

<style scoped>

</style>
