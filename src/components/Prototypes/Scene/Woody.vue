<template>
<span class="scene-root">
  <PerspectiveCamera
    :fov="75"
    :aspect="aspect"
    :near="1"
    :far="1000"
    :position="{ x: 0, y: 0, z: 165 }"
    @camera="(v) => { camera = v; }"
  />
  <Scene @scene="(v) => { scene = v; }">

    <!-- <Mesh ref="mesh-1">
      <MeshPhongMaterial :opacity="0" />
      <SphereGeometry  />
    </Mesh> -->

    <Woody v-if="renderer" :renderer="renderer" @api="(v) => { woodyBall = v }" />

    <!-- <PointLight /> -->
  </Scene>
  <Raycaster
    v-if="camera && scene"
    :camera="camera"
    :scene="scene"
    @setMouse="(v) => { setRMouse = v; }"
    @hover="(v) => { hover = v }"
    @glClick="handleHit"
  />
</span>
</template>

<script>
import * as THREE from 'three'
import Bundle from '@/components/WebGL/Bundle'
import Woody from '@/components/Prototypes/Visual/Woody/Woody.vue'
import fadeInOut from '@/components/WebGL/Mixins/FadeInOut'
export default {
  mixins: [fadeInOut],
  props: ['aspect', 'renderer'],
  components: {
    ...Bundle,
    Woody
  },
  data () {
    return {
      woodyBall: false,
      camera: false,
      scene: false,
      setRMouse: () => {},
      hover: () => { return [] },
      lastResult: []
    }
  },
  watch: {
    woodyBall () {
      this.$emit('setMouse', (data) => {
        if (this.setRMouse) {
          this.setRMouse(data)
        }
        if (this.woodyBall) {
          this.woodyBall.setMouse(data)
        }
      })
    },
    setRMouse () {
      this.$emit('setMouse', (data) => {
        if (this.setRMouse) {
          this.setRMouse(data)
        }
        if (this.woodyBall) {
          this.woodyBall.setMouse(data)
        }
      })
    }
  },
  activated () {
    this.$emit('scene', this.scene)
    this.$emit('camera', this.camera)
    this.$emit('setMouse', (data) => {
      if (this.setRMouse) {
        this.setRMouse(data)
      }
      if (this.woodyBall) {
        this.woodyBall.setMouse(data)
      }
    })

    this.scene.background = new THREE.Color(0x000000)

    this.$nextTick(() => {
      this.$emit('exec', this.exec)
      // this.fadeInTween((v) => {
      //   this.camera.position.z = 10
      //   this.$refs['mesh-1'].mesh.material.opacity = v
      //   this.$refs['mesh-1'].mesh.position.z = 5 * (1 - v)
      // }, () => {
      // })
    })
  },
  beforeRouteLeave (to, from, next) {
    next()

    // this.fadeOutTween((v) => {
    //   this.camera.position.z = 10
    //   this.$refs['mesh-1'].mesh.material.opacity = v
    //   this.$refs['mesh-1'].mesh.position.z = -5 * (1.0 - v)
    // }, () => {
    //   next()
    // })
  },
  deactivated () {
    this.$emit('setMouse', () => {})
    this.$emit('exec', () => {})
  },
  methods: {
    handleHit ({ mouse, found }) {
      if (found[0]) {
        var magnitude = Math.abs(1.0 - Math.random())
        // console.log(found[0].object.material)
        this.stopAllTween()
        this.punchInTween((v) => {
          found[0].object.material.uniforms.mousePos.value.x = v
        }, () => {
          this.punchOutTween((v) => {
            found[0].object.material.uniforms.mousePos.value.x = v
          }, () => {
          }, magnitude)
        }, magnitude)
      }
    },
    highlight (result, color) {
      if (result.length === 0) { return }
      for (var i = 0; i < result.length; i++) {
        if (result[i].object.material.color) {
          result[i].object.material.color.set(color)
        }
      }
    },
    exec () {
      // this.$refs['mesh-1'].mesh.material.color.set(0xffffff)

      // this.highlight(this.lastResult, 0x00ffff)
      // var result = this.hover()
      // this.highlight(result, 0xff00ff)
      // this.lastResult = result

      if (this.woodyBall) {
        this.woodyBall.render()
      }

      this.execTween()
    }
  }
}
</script>

<style scoped>
.scene-root{
  display: none;
}
</style>
