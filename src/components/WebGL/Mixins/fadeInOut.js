import TWEEN from '@tweenjs/tween.js'
var punchTween = false
export default {
  data () {
    return {
      tweening: false
    }
  },
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
                    .to({ opacity: 1 * factor }, 1000)
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

    },
    o3dFadeIn (id) {
      var o3dID = id || 'page-content'
      return (el, done) => {
        var updater = (mesh) => {
          if (mesh) {
            mesh.visible = true
            this.fadeInTween((v) => {
              this.tweening = true
              mesh.material.opacity = v
              if (mesh.material.uniforms) {
                mesh.material.uniforms.opacity.value = v
              }
            }, () => {
              done()
              this.tweening = false
            })
          }
        }
        if (this.$refs[o3dID]) {
          // this.__add(this.$refs[o3dID].object3d)
          this.$refs[o3dID].object3d.children.forEach(updater)
        }
      }
    },
    o3dFadeOut (id) {
      var o3dID = id || 'page-content'
      return (el, done) => {
        var updater = (mesh) => {
          if (mesh) {
            if (mesh.material.uniforms) {
              mesh.material.depthTest = false
            }
            this.fadeOutTween((v) => {
              this.tweening = true
              mesh.material.opacity = v
              if (mesh.material.uniforms) {
                mesh.material.uniforms.opacity.value = v
              }
            }, () => {
              done()
              if (mesh.material.uniforms) {
                mesh.material.depthTest = true
              }
              mesh.visible = false
              this.tweening = false
              // this.__remove(this.$refs['page-content'].object3d)
            })
          }
        }
        if (this.$refs[o3dID] && this.$refs[o3dID].object3d) {
          this.$refs[o3dID].object3d.children.forEach(updater)
        }
      }
    },
    pageFadeIn (el, done) {
      var updater = (mesh) => {
        if (mesh) {
          mesh.visible = true
          this.fadeInTween((v) => {
            this.tweening = true
            mesh.material.opacity = v
            if (mesh.material.uniforms) {
              mesh.material.uniforms.opacity.value = v
            }
          }, () => {
            done()
            this.tweening = false
          })
        }
      }
      if (this.$refs['page-content']) {
        // this.__add(this.$refs['page-content'].object3d)
        this.$refs['page-content'].object3d.children.forEach(updater)
      }
    },
    pageFadeOut (el, done) {
      var updater = (mesh) => {
        if (mesh) {
          if (mesh.material.uniforms) {
            mesh.material.depthTest = false
          }
          this.fadeOutTween((v) => {
            this.tweening = true
            mesh.material.opacity = v
            if (mesh.material.uniforms) {
              mesh.material.uniforms.opacity.value = v
            }
          }, () => {
            done()
            if (mesh.material.uniforms) {
              mesh.material.depthTest = true
            }
            mesh.visible = false
            this.tweening = false
            // this.__remove(this.$refs['page-content'].object3d)
          })
        }
      }
      if (this.$refs['page-content'] && this.$refs['page-content'].object3d) {
        this.$refs['page-content'].object3d.children.forEach(updater)
      }
    }
  }
}
