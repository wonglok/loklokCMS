<template>
<span class="particle-sea"><slot></slot></span>
</template>

<script>
import Woody from '@/components/Prototypes/Visual/Woody/Woody.js'
import TWEEN from '@tweenjs/tween.js'

export default {
  props: ['renderer', 'rect', 'position', 'scale', 'gclick'],
  data () {
    return {
      api: Woody(),
      info: false,
      punchTween: false
      // mesh: null
    }
  },
  mounted () {
    this.info = this.api.setup({ renderer: this.renderer, rect: this.rect, position: this.position || { x: 0, y: 0, z: 0 } })
    // this.api.updateRect({ rect: this.rect })

    if (this.gclick) {
      this.api.points.userData.gclick = this.gclick
    }

    this.$emit('api', this.api)
    // this.info.points.$skipRayCaster = true
    this.$parent.__add(this.info.points)
    // this.mesh = new THREE.Mesh()
    // this.$emit('mesh', this.mesh)
  },
  beforeDestroy () {
    if (this.info) {
      this.$parent.__remove(this.info.points)
    }
  },
  methods: {
    exec () {
      this.api.render()
    },
    punch ({ magnitude }) {
      this.punchInTween((v) => {
        this.api.material.uniforms.mousePos.value.x = v
      }, () => {
        this.punchOutTween((v) => {
          this.api.material.uniforms.mousePos.value.x = v
        }, () => {
        }, magnitude)
      }, magnitude)
    },
    punchOutTween (update, done, magnitude) {
      var factor = 1000
      var varying = {
        opacity: 1 * factor
      }

      //
      if (this.punchTween) {
        this.punchTween.stop()
      }

      this.punchTween = new TWEEN.Tween(varying)
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
      this.punchTween.start()
    },
    punchInTween (update, done, magnitude) {
      var factor = 1000
      var varying = {
        opacity: 0 * factor
      }

      if (this.punchTween) {
        this.punchTween.stop()
      }

      this.punchTween = new TWEEN.Tween(varying)
                    .to({ opacity: 1 * factor }, 800 * (magnitude || 1))
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

      this.punchTween.start()
    }
  },
  watch: {
    position () {
      this.api.setPosition({ position: this.position })
    },
    rect () {
      this.api.updateRect({ rect: this.rect })
    }
  }
}
</script>

<style scoped>
.particle-sea{
  display: none;
}
</style>
