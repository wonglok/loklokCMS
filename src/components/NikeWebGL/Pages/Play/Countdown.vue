<template>
  <transition
    @enter="onPageEnter"
    @leave="pageFadeOut"
  >
    <keep-alive>
      <Object3D ref="sub-page-content">
        <ImageMesh
          :gclick="() => {  }"
          vms="@play@start@hold-tight"
          :link="require('./img/start/hold-tight.png')"
        />

        <RingCounter
          ref="ring"
          :progress="progress"
          @done="() => { if (isViewingPage) {
            $router.push({ path: '/nike/game/play' })
          } }"
          vms="@play@countdown@ring-counter"
        />
      </Object3D>
    </keep-alive>
  </transition>
</template>

<script>
import fadeInOut from '@/components/WebGL/Mixins/FadeInOut'
import Bundle from '@/components/WebGL/Bundle'
import RingCounter from './RingCounter/RingCounter'
export default {
  name: 'Countdown',
  mixins: [fadeInOut],
  components: {
    ...Bundle,
    RingCounter
  },
  props: ['aspect', 'camera'],
  data () {
    return {
      timerStart: 0,
      countDownTimeout: 0,
      remaining: 3000,
      progress: 0,
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
    this.$refs['ring'].start()
  },
  deactivated () {
    this.$emit('exec', () => {})
  },
  methods: {
    onPageEnter (v, done) {
      this.pageFadeIn(v, done)
      setTimeout(() => {
        this.$refs['ring'].start()
      }, 1000)
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
