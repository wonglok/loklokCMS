<template>
  <span>
    <ImageMesh
      ref="slider-handle"
      :gTS="onGTS"
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
  </span>
</template>

<script>
import TWEEN from '@tweenjs/tween.js'
import Bundle from '@/components/WebGL/Bundle'
export default {
  components: {
    ...Bundle
  },
  data () {
    return {
      TWEEN,
      raycaster: false,
      mouseStack: {},
      execStack: {},
      rAFID: 0,
      slider: {
        defaultXPos: 0,
        isDraggin: false,
        found: false,
        redeemed: false,
        state: {
          status: 'ready',
          tsX: 0,
          tsY: 0,
          dX: 0,
          dY: 0,
          aX: 0,
          aY: 0
        }
      }
    }
  },
  mounted () {
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

    this.rAF = () => {
      this.rAFID = window.requestAnimationFrame(this.rAF)
      var pos = this.$refs['slider-handle'].mesh.position

      pos.x += this.slider.state.dX

      this.slider.state.aX += this.slider.state.dX
      this.slider.state.aY += this.slider.state.dY
      this.slider.state.dX *= 0.96
      this.slider.state.dY *= 0.96
    }
    this.rAFID = window.requestAnimationFrame(this.rAF)

    this.mouseStack.slider = (args) => {
      this.eventHandler(args)
    }
  },
  beforeDestroy () {
    window.cancelAnimationFrame(this.rAFID)
  },
  methods: {
    eventHandler (args) {
      switch (args.type) {
        case 'ts':
          this.onTS(args)
          break
        case 'tm':
          this.onTM(args)
          break
        case 'te':
          this.onTE(args)
          break
      }
    },
    onGTS (v) {
      console.log(v)
      this.slider.found = v
      this.slider.isDraggin = true
    },
    onTS ({ pageX, pageY, rect }) {
      if (this.slider.redeemed) {
        return
      }
      if (!this.slider.state.tweening) {
        this.slider.state.originalX = this.$refs['slider-handle'].mesh.position.x
      }

      var raycaster = this.getRayCaster()
      raycaster.run = true

      this.slider.state.status = 'ts'
      this.slider.state.tsX = pageX - rect.left
      this.slider.state.tsY = pageY - rect.top
    },
    onTM ({ pageX, pageY, rect }) {
      if (this.slider.redeemed || !this.slider.isDraggin) {
        return
      }
      // console.log(args)
      this.slider.state.status = 'tm'

      this.slider.state.dX = pageX - rect.left - this.slider.state.tsX
      this.slider.state.dY = pageY - rect.top - this.slider.state.tsY

      this.slider.state.tsX = pageX - rect.left
      this.slider.state.tsY = pageY - rect.top

      this.slider.state.dX *= 0.17
      this.slider.state.dY *= 0.17
    },
    onTE () {
      this.slider.isDraggin = false
      if (this.slider.state.tweening) { return }
      var pos = this.$refs['slider-handle'].mesh.position
      var to = { x: pos.x - this.slider.state.aX }
      if (Math.abs(pos.x - this.slider.state.originalX) > (-this.slider.state.originalX * 2 * 0.75)) {
        to = { x: -this.slider.state.originalX }
        this.slider.redeemed = true
      }

      this.slider.state.tweening = true
      var tween = new TWEEN.Tween(pos)
        .to(to, 1000)
        .onUpdate(() => {
          this.slider.state.dX = 0
          this.slider.state.aX = 0
        })
        .onComplete(() => {
          this.slider.state.tweening = false
        })
      tween.start()
    },
    getRayCaster () {
      return this.$parent.$parent.raycaster
    },
    __add (v) {
      this.$parent.object3d.add(v)
      // this.$parent.$parent.$parent.scene.add(v)
    },
    __remove (v) {
      this.$parent.object3d.remove(v)
      // this.$parent.$parent.$parent.scene.remove(v)
    }
  }
}
</script>

<style>

</style>
