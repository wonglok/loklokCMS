import TWEEN from '@tweenjs/tween.js'

var punchTween = false

export default {
  methods: {
    stopAllTween () {
      TWEEN.removeAll()
    },
    execTween () {
      TWEEN.update()
    },
    fadeOutTween (update, done) {
      var factor = 1000
      var varying = {
        opacity: 1 * factor
      }

      var tween = new TWEEN.Tween(varying)
                    .to({ opacity: 0 * factor }, 1000)
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .onUpdate(() => {
                      update(varying.opacity / factor)
                    })
                    .onStop(() => {
                      done()
                    })
                    .onComplete(() => {
                      done()
                    })
      tween.start()
    },
    fadeInTween (update, done) {
      var factor = 1000
      var varying = {
        opacity: 0 * factor
      }

      var tween = new TWEEN.Tween(varying)
                    .to({ opacity: 1 * factor }, 500)
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .onUpdate(() => {
                      update(varying.opacity / factor)
                    })
                    .onStop(() => {
                      done()
                    })
                    .onComplete(() => {
                      done()
                    })

      tween.start()
    },
    punchOutTween (update, done, magnitude) {
      var factor = 1000
      var varying = {
        opacity: 1 * factor
      }

      //
      if (punchTween) {
        punchTween.stop()
      }

      punchTween = new TWEEN.Tween(varying)
                    .to({ opacity: 0 * factor }, 1500 * (magnitude || 1))
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .onUpdate(() => {
                      update(varying.opacity / factor)
                    })
                    .onStop(() => {
                      done()
                    })
                    .onComplete(() => {
                      done()
                    })
      punchTween.start()
    },
    punchInTween (update, done, magnitude) {
      var factor = 1000
      var varying = {
        opacity: 0 * factor
      }

      if (punchTween) {
        punchTween.stop()
      }

      punchTween = new TWEEN.Tween(varying)
                    .to({ opacity: 1 * factor }, 1500 * (magnitude || 1))
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .onUpdate(() => {
                      update(varying.opacity / factor)
                    })
                    .onStop(() => {
                      done()
                    })
                    .onComplete(() => {
                      done()
                    })

      punchTween.start()
    },
    updateTween () {

    }
  }
}
