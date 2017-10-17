<template>
  <transition
    @enter="onPageEnter"
    @leave="pageFadeOut"
  >
    <keep-alive>
      <Object3D ref="sub-page-content">
        <ImageMesh
          :gclick="() => {  }"
          vms="@play@record@punch-num-desc"
          :link="require('./img/record/punch-num-desc.png')"
        />
        <ImageMesh
          :gclick="() => {  }"
          vms="@play@record@time-remain-desc"
          :link="require('./img/record/time-remain-desc.png')"
        />


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
          :totalTime="3000 * 10"
          @done="() => { if (isViewingPage) {
            playSound();
            $router.push({ path: `/nike/game/play/result?punch=${state.count}` });
          } }"
          vms="@play@record@number-counter"
        >
        </NumberCounter>

        <NumberCounter
          ref="punch-counter"
          :word="state.count"
          vms="@play@record@punch-counter"
        >
        </NumberCounter>



      </Object3D>
    </keep-alive>
  </transition>
</template>

<script>
/* global createjs */
createjs.Sound.alternateExtensions = ['mp3']
var url = require('../../Sound/boxing_bell_sound_effect.mp3')
createjs.Sound.registerSound({ src: url, id: 'dingding' })

import fadeInOut from '@/components/WebGL/Mixins/FadeInOut'
import Bundle from '@/components/WebGL/Bundle'
import RingCounter from './RingCounter/RingCounter'
import NumberCounter from './NumberCounter/NumberCounter.vue'
import GyroNorm from 'gyronorm/dist/gyronorm.complete.js'
import GReduce from './Logic/g-reduce'

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
      state: {
        count: 0,
        force: 0,
        punchData: []
      },
      execStack: {},
      tweening: false
    }
  },
  mounted () {
  },
  computed: {
    isViewingPage () {
      return this.$router.currentRoute.fullPath.indexOf('game/play/record') !== -1
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
    playSound () {
      createjs.Sound.play('dingding')
    },
    initCanvas () {
      this.$refs['ring'].start()
      this.$refs['number-counter'].start()
      this.$refs['punch-counter'].draw()

      this.playSound()

      var gReduce = new GReduce()
      this.state.force = 0
      this.state.count = 0
      this.state.punchData = gReduce.getTrack()

      var gn = new GyroNorm()
      gn.init({ frequency: 20 }).then(() => {
        gReduce.setAccelThres(20)
        gReduce.setCallback((err, count, force) => {
          if (err) {
            console.log(err)
          }
          this.$emit('punched', Math.random())
          this.state.count = count
          this.state.force = force
          this.state.punchData = gReduce.getTrack()

          if (this.isViewingPage) {
            navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate
            if (navigator.vibrate) {
              navigator.vibrate(500)
            }
          }
        })
        gn.start(gReduce.digest)
      })
    },
    onPageEnter (v, done) {
      this.pageFadeIn(v, done)
      this.initCanvas()
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
