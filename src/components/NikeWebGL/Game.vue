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
  <Scene :aspect="aspect" @scene="(v) => { scene = v; }">
    <GLMenu
      :aspect="aspect"
      @exec="(v) => { execStack.glmenu = v }"
      @showPage="(v) => { showPage = v }"
    />
    <keep-alive>
      <component
        v-if="showPage"
        ref="page-content"
        v-bind:is="'router-view'"
        @exec="(v) => { execStack.currentPage = v }"
        :aspect="aspect"
      >
      </component>
    </keep-alive>

  </Scene>
  <Raycaster
    v-if="camera && scene"
    :camera="camera"
    :scene="scene"
    @raycast="(v) => { execStack.raycast = v; }"
    @setMouse="(v) => { mouseStack.raycaster = v; }"
    @hover="(v) => { hover = v }"
    @glClick="handleHit"
  />
</span>
</template>

<script>
import * as THREE from 'three'
import { glSystem } from '@/components/WebGL/Shared/system'
import GLMenu from '@/components/NikeWebGL/element/Menu/Menu'
import Bundle from '@/components/WebGL/Bundle'
import fadeInOut from '@/components/WebGL/Mixins/FadeInOut'
export default {
  mixins: [fadeInOut],
  props: ['aspect'],
  components: {
    GLMenu,
    ...Bundle
  },
  data () {
    return {
      glSystem,
      showPage: true,
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
        this.$emit('glClick', { mouse, found: found[0] })
      }
    },
    // highlight (result, color) {
    //   if (result.length === 0) { return }
    //   for (var i = 0; i < result.length; i++) {
    //     result[i].object.material.color.set(color)
    //   }
    // },
    exec () {
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
