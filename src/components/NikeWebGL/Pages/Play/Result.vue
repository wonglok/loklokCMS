<template>
  <transition
    @enter="onPageEnter"
    @leave="onPageLeave"
  >
    <keep-alive>
      <Object3D ref="sub-page-content">
        <!-- <ImageMesh
          :gclick="() => {  }"
          vms="@play@start@hold-tight"
          :link="require('./img/start/hold-tight.png')"
        /> -->

        <NumberCounter
          :word="$route.query.punch"
          ref="number-counter"
          vms="@play@result@number-counter"
        >
        </NumberCounter>

        <ImageMesh
          :gclick="() => {  }"
          vms="@play@result@coupon-box-text"
          :link="require('./img/result/coupon-box-text.png')"
        />
        <ImageMesh
          :gclick="() => { $router.push({ path: '/nike/game/rules' }) }"
          vms="@play@result@coupon-box-btn-rule"
          :link="require('./img/result/coupon-box-btn-rule.png')"
        />
        <ImageMesh
          :gclick="() => { go('https://nike.com/justdoit') }"
          vms="@play@result@coupon-box-btn-nike"
          :link="require('./img/result/coupon-box-btn-nike.png')"
        />
        <GrungeMesh
          vms="@play@result@grunge@coupon-box"
          :gclick="() => {  }"
          @exec="(v) => { execStack.grungeCouponBox = v }"
        />

        <GrungeMesh
          :gclick="() => { $router.push({ path: '/nike/game/play' }) }"
          vms="@play@result@try-again"
          :link="require('./img/result/try-again.png')"
          @exec="(v) => { execStack.tryAgain = v }"
        />

        <GrungeMesh
          :gclick="() => { $router.push({ path: '/nike/game/status' }) }"
          vms="@play@result@check-coupon"
          :link="require('./img/result/check-coupon.png')"
          @exec="(v) => { execStack.checkCoupon = v }"
        />

        <GrungeMesh
          :gclick="() => {  }"
          vms="@play@result@grunge@share-box"
          @exec="(v) => { execStack.shareBox = v }"
        />

        <ImageMesh
          :gclick="() => {  }"
          vms="@play@result@share-box"
          :link="require('./img/result/share-box.png')"
        />
        <ImageMesh
          :gclick="() => {  }"
          vms="@play@result@daily-task-box"
          :link="require('./img/result/daily-task-box.png')"
        />

        <ImageMesh
          :gclick="() => {  }"
          vms="@play@result@punch-number-desc"
          :link="require('./img/result/punch-number-desc.png')"
        />

      </Object3D>
    </keep-alive>
  </transition>
</template>

<script>
import fadeInOut from '@/components/WebGL/Mixins/FadeInOut'
import scroller from '@/components/WebGL/Mixins/scroller'
import Bundle from '@/components/WebGL/Bundle'
import RingCounter from './RingCounter/RingCounter'
import NumberCounter from './NumberCounter/NumberCounter.vue'
export default {
  name: 'Result',
  mixins: [fadeInOut, scroller],
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
      return this.$router.currentRoute.fullPath.indexOf('game/play/result') !== -1
    }
  },
  activated () {
    this.$nextTick(() => {
      this.startApp()
    })
  },
  deactivated () {
    this.$emit('exec', () => {})
  },
  methods: {
    go (location) {
      window.location.assign(location)
    },
    startApp () {
      if (this.$refs['number-counter']) {
        this.$refs['number-counter'].draw()
      }
      this.$emit('exec', () => {
        for (var execItem in this.execStack) {
          let exec = this.execStack[execItem]
          if (exec) {
            exec()
          }
        }
      })
      this.setupScroller({
        target: this.$refs['sub-page-content'],
        enable: { x: false, y: true },
        bound: {
          yMax: 36 * this.aspect,
          yMin: 0,
          xMax: 0,
          xMin: 0
        }
      })
    },
    onPageEnter (v, done) {
      this.pageFadeIn(v, done)
      setTimeout(() => {
        this.startApp()
      }, 500)
    },
    onPageLeave (v, done) {
      this.pageFadeOut(v, done)
      this.cleanupScroller()
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
