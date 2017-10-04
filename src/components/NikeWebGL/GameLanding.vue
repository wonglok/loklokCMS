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

    <Object3D :position="{ x: 0, y: 35.2, z: 0 }">

      <Mesh :position="{ x: 0, y: -3.3, z: 0 }">
        <PlaneGeometry :width="55" :height="0.2"  />
        <MeshBasicMaterial :opacity="1" :color="0xee3932" />
      </Mesh>

      <ImageMesh
        :gclick="alert"
        :position="{ x: 32.5 * aspect, y: 0, z: 0 }"
        :link="require('./element/menu/menu-open.svg')"
      />
      <ImageMesh
        :gclick="alert"
        :position="{ x: -24.5 * aspect, y: 0, z: 0 }"
        :link="require('./element/menu/nike.svg')"
      />
    </Object3D>



    <!-- <Mesh :position="{ x: 12, y: 35.2, z: 0 }">
      <PlaneGeometry :width="2.5" :height="2"  />
      <MeshBasicMaterial :opacity="1" :color="0xffffff" :image="require('./Menu/menu-open.svg')" />
    </Mesh> -->



    <PointLight />

    <Mesh :position="{ x: 0, y: 0, z: 5 }"
      :gclick="alert"
    >
      <MeshPhongMaterial :opacity="1" />
      <SphereGeometry />
    </Mesh>


    <router-view />
  </Scene>
  <Raycaster
    v-if="camera && scene"
    :camera="camera"
    :scene="scene"
    @setMouse="(v) => { $emit('setMouse', v); setMouse = v; }"
    @hover="(v) => { hover = v }"
    @glClick="handleHit"
  />
</span>
</template>

<script>
import * as THREE from 'three'
import Bundle from '@/components/WebGL/Bundle'
import fadeInOut from '@/components/WebGL/Mixins/FadeInOut'
export default {
  mixins: [fadeInOut],
  props: ['aspect'],
  components: {
    ...Bundle
  },
  data () {
    return {
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
    this.$emit('setMouse', this.setMouse)

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
    next()
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
      console.log(found)
      if (found[0]) {
        // click handler
        if (found[0].object.userData && found[0].object.userData.gclick) {
          found[0].object.userData.gclick({ mouse, found: found[0] })
        }
      }
    },
    highlight (result, color) {
      if (result.length === 0) { return }
      for (var i = 0; i < result.length; i++) {
        result[i].object.material.color.set(color)
      }
    },
    exec () {
      // this.$refs['mesh-1'].mesh.material.color.set(0xffffff)

      // this.highlight(this.lastResult, 0x00ffff)
      // var result = this.hover()
      // this.highlight(result, 0xff00ff)
      // this.lastResult = result

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
