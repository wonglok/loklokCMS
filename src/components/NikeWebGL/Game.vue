<template>
<span class="scene-root">
  <PerspectiveCamera
    :fov="75"
    :aspect="aspect"
    :near="1"
    :far="1000"
    :position="{ x: 0, y: 0, z: 50 }"
    @camera="(v) => { camera = v; }"
  />
  <Scene @scene="(v) => { scene = v; }">

    <GLMenu
      :aspect="aspect"
      @exec="(v) => { execStack.glmenu = v }"
    />

    <!--
    <keep-alive>
      <component
        v-if="true"
        :is="'GLMenu'"
        :aspect="aspect"
        @exec="(v) => { execStack.glmenu = v }"
      >
      </component>
    </keep-alive>
    -->

    <PointLight />
    <Mesh :position="{ x: 0, y: 0, z: 5 }"
      :gclick="alert"
    >
      <MeshPhongMaterial :opacity="1" />
      <SphereGeometry />
    </Mesh>

    <keep-alive>
      <component
        v-bind:is="'router-view'"
        :aspect="aspect"
      >
      </component>
    </keep-alive>



    <Woody :gclick="tweenWoody" @api="(v) => { execStack.woody = v.render; mouseStack.woody = v.setMouse }" :position="{ x: 0, y: 0, z: -170 }" />

  </Scene>
  <Raycaster
    v-if="camera && scene"
    :camera="camera"
    :scene="scene"
    @setMouse="(v) => { mouseStack.raycaster = v; }"
    @hover="(v) => { hover = v }"
    @glClick="handleHit"
  />
</span>
</template>

<script>
import * as THREE from 'three'
import GLMenu from '@/components/NikeWebGL/element/Menu/Menu'
import Woody from '@/components/Prototypes/Visual/Woody/Woody.vue'
import Bundle from '@/components/WebGL/Bundle'
import fadeInOut from '@/components/WebGL/Mixins/FadeInOut'
export default {
  mixins: [fadeInOut],
  props: ['aspect'],
  components: {
    Woody,
    GLMenu,
    ...Bundle
  },
  data () {
    return {
      mouseStack: {},
      execStack: {},
      camera: false,
      scene: false,
      setMouse: () => {},
      hover: () => { return [] },
      lastResult: []
    }
  },
  activated () {
    this.$emit('scene', this.scene)
    this.$emit('camera', this.camera)
    this.$emit('setMouse', (args) => {
      for (var name in this.mouseStack) {
        let exec = this.mouseStack[name]
        if (exec) {
          exec(args)
        }
      }
    })

    this.scene.background = new THREE.Color(0x000000)

    this.$nextTick(() => {
      this.$emit('exec', this.exec)
      // this.fadeInTween((v) => {
      //   // this.camera.position.z = 10
      //   this.$refs['mesh-1'].mesh.material.opacity = v
      //   this.$refs['mesh-1'].mesh.position.z = 5 * (1 - v)
      // }, () => {
      // })
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$nextTick(() => {
      next()
    })

    // this.fadeOutTween((v) => {
    //   // this.camera.position.z = 10
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
    tweenWoody ({ found }) {
      console.log(found)
      this.fadeOutTween((v) => {
        found.object.material.uniforms.opacity.value = v
      }, () => {
        this.fadeInTween((v) => {
          found.object.material.uniforms.opacity.value = v
        }, () => {
        })
      })
    },
    alert ({ found }) {
      this.fadeOutTween((v) => {
        found.object.material.opacity = v
      }, () => {
        this.fadeInTween((v) => {
          found.object.material.opacity = v
        }, () => {
        })
      })
    },
    handleHit ({ mouse, found }) {
      // console.log(found)
      if (found[0]) {
        // click handler
        if (found[0].object.userData && found[0].object.userData.gclick) {
          found[0].object.userData.gclick({ mouse, found: found[0] })
        }
      }
    },
    // highlight (result, color) {
    //   if (result.length === 0) { return }
    //   for (var i = 0; i < result.length; i++) {
    //     result[i].object.material.color.set(color)
    //   }
    // },
    exec () {
      // this.$refs['mesh-1'].mesh.material.color.set(0xffffff)

      // this.highlight(this.lastResult, 0x00ffff)
      // var result = this.hover()
      // this.highlight(result, 0xff00ff)
      // this.lastResult = result

      for (var execItem in this.execStack) {
        let exec = this.execStack[execItem]
        if (exec) {
          exec()
        }
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
