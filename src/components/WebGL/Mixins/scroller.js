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
        status: ''
      }
    }
  },
  methods: {
    setupScroller ({ target }) {
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

      var rAF = () => {
        this.scrollerTarget.object3d.position.y -= this.scrollerState.dY
        this.scrollerState.dY *= 0.97654321
        this.srAFID = window.requestAnimationFrame(rAF)
      }
      this.srAFID = window.requestAnimationFrame(rAF)
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
    scrollerTouchEnd () {

    },
    cleanupScroller () {
      this.$emit('setMouse', () => {
      })
      window.cancelAnimationFrame(this.srAFID)
    }
  }
}
