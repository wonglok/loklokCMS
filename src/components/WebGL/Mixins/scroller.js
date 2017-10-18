import TWEEN from '@tweenjs/tween.js'
export default {
  data () {
    return {
      TWEEN,
      scrollerTarget: false,
      scrollStack: {},
      srAFID: 0,
      scrollerState: {
        tsX: 0,
        tsY: 0,
        dX: 0,
        dY: 0,
        status: '',
        enable: {
          x: false,
          y: true
        },
        tween: {
          scrollerPY: false,
          scrollerPX: false
        },
        bound: {
          yMax: 30,
          yMin: 0,
          xMax: 0,
          xMin: 0
        }
      }
    }
  },
  computed: {
  },
  methods: {
    setupScroller ({ target, enable, bound }) {
      this.$emit('setMouse', (args) => {
        for (var stackKey in this.scrollStack) {
          let setMouse = this.scrollStack[stackKey]
          if (setMouse) {
            setMouse(args)
          }
        }
      })
      this.scrollStack.scrollMe = this.scrollMe
      this.scrollerTarget = target
      if (this.scrollerState.enable) {
        this.scrollerState.enable = enable
      }

      var rAF = () => {
        if (this.scrollerState.enable.y) {
          this.scrollerTarget.object3d.position.y -= this.scrollerState.dY
          this.scrollerState.dY *= 0.54321
        }
        if (this.scrollerState.enable.x) {
          this.scrollerTarget.object3d.position.x += this.scrollerState.dX
          this.scrollerState.dX *= 0.54321
        }

        this.scrollerPY({ bound: bound || this.bound })

        this.srAFID = window.requestAnimationFrame(rAF)
      }
      this.srAFID = window.requestAnimationFrame(rAF)
    },
    scrollerPY ({ bound }) {
      if (this.scrollerTarget) {
        if (this.scrollerState.tween.scrollerPY) {
          this.scrollerState.tween.scrollerPY.stop()
        }
        if (this.scrollerTarget.object3d.position.y > bound.yMax) {
          let varying = { ...this.scrollerTarget.object3d.position }
          this.scrollerState.tween.scrollerPY = new TWEEN
            .Tween(varying)
            .to({ x: 0, y: bound.yMax, z: 0 }, 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(() => {
              this.scrollerTarget.object3d.position.set(varying.x, varying.y, varying.z)
            })
            .start()
        }
        if (this.scrollerTarget.object3d.position.y < bound.yMin) {
          let varying = { ...this.scrollerTarget.object3d.position }
          this.scrollerState.tween.scrollerPY = new TWEEN
            .Tween(varying)
            .to({ x: 0, y: bound.yMin, z: 0 }, 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(() => {
              this.scrollerTarget.object3d.position.set(varying.x, varying.y, varying.z)
            })
            .start()
        }
      }
    },
    scrollMe (args) {
      switch (args.type) {
        case 'ts':
          this.scrollerTouchStart(args)
          break
        case 'tm':
          this.scrollerTouchMove(args)
          break
        case 'te':
          this.scrollerTouchEnd(args)
          break
        case 'wheel':
          this.scrollerWheel(args)
          break
      }
    },
    scrollerTouchStart ({ pageX, pageY, rect }) {
      this.scrollerState.status = 'ts'
      this.scrollerState.tsX = pageX - rect.left
      this.scrollerState.tsY = pageY - rect.top
    },
    scrollerTouchMove ({ pageX, pageY, rect }) {
      this.scrollerState.status = 'tm'

      this.scrollerState.dX = pageX - rect.left - this.scrollerState.tsX
      this.scrollerState.dY = pageY - rect.top - this.scrollerState.tsY

      this.scrollerState.tsX = pageX - rect.left
      this.scrollerState.tsY = pageY - rect.top

      this.scrollerState.dX *= 0.1
      this.scrollerState.dY *= 0.1
    },
    scrollerWheel ({ deltaX, deltaY }) {
      this.scrollerState.status = 'tm'

      this.scrollerState.dX = deltaX
      this.scrollerState.dY = -deltaY

      this.scrollerState.dX *= 0.1
      this.scrollerState.dY *= 0.1
    },
    scrollerTouchEnd () {

    },
    cleanupScroller () {
      this.$emit('setMouse', () => {
      })
      window.cancelAnimationFrame(this.srAFID)
    }
  }
}
