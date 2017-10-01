import TWEEN from '@tweenjs/tween.js'

export default {
  methods: {
    execTween () {
      TWEEN.update()
    },
    fadeOutTween (update, done) {
      var factor = 100
      var varying = {
        opacity: 1 * factor
      }
      var tween = new TWEEN.Tween(varying)
                    .to({ opacity: 0 * factor }, 1000)
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .onUpdate(() => {
                      update(varying.opacity / factor)
                    })
                    .onComplete(() => {
                      done()
                    })
      tween.start()
    },
    fadeInTween (update, done) {
      var factor = 100
      var varying = {
        opacity: 0 * factor
      }

      var tween = new TWEEN.Tween(varying)
                    .to({ opacity: 1 * factor }, 1000)
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .onUpdate(() => {
                      update(varying.opacity / factor)
                    })
                    .onComplete(() => {
                      done()
                    })

      tween.start()
    },
    updateTween () {

    }
  }
}
