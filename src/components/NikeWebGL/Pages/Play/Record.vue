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

        <!-- @o@ -->
        <RingCounter
          ref="ring"
          :totalTime="30000"
          @done="() => { if (isViewingPage) {
            // $router.push({ path: '/nike/game/play' })
          } }"
          vms="@play@record@ring-counter"
        />
        <NumberCounter
          ref="number-counter"
          :totalTime="30000"
          @done="() => { if (isViewingPage) {
            // $router.push({ path: '/nike/game/play/record' })
          } }"
          vms="@play@record@number-counter"
        >
        </NumberCounter>
        <NumberCounter
          ref="punch-counter"
          :word="punchNumber"
          vms="@play@record@punch-counter"
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
  name: 'Record',
  mixins: [fadeInOut],
  components: {
    ...Bundle,
    RingCounter,
    NumberCounter
  },
  props: ['aspect', 'camera'],
  data () {
    return {
      punchNumber: 0,
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

    this.initCanvas()
  },
  deactivated () {
    this.$emit('exec', () => {})
  },
  methods: {
    initCanvas () {
      this.$refs['ring'].start()
      this.$refs['number-counter'].start()
      this.$refs['punch-counter'].draw()
      var vm = this
      setTimeout(function funfun () {
        vm.punchNumber++
        vm.$emit('punched', Math.random())
        setTimeout(funfun, Math.random() * 5000)
      }, Math.abs(Math.random()) * 5000)
    },
    onPageEnter (v, done) {
      this.pageFadeIn(v, done)
      setTimeout(() => {
        this.initCanvas()
      }, 100)
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
