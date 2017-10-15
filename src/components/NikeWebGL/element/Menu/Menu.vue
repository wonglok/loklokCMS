<template>
<span class="hidden">
  <ImageMesh
    vms="@menu@menu-trigger"
    ref="menu-open"
    :gclick="() => { showFSMenu = !showFSMenu; }"
    d-position="{ x: 32.5 * aspect, y: 35.2, z: 0.15 }"
    d-scale="{ x: 1 / 3, y: 1 / 3, z: 1.0 }"
    :link="require('./img/menu-open.png')"
  />
  <!--
    <Mesh
    ref="red-box"
    :gclick="() => { showFSMenu = !showFSMenu; }"
    :position="{ x: 32.5 * aspect, y: 35.2, z: 0.1 }">
      <PlaneGeometry :width="6" :height="6"  />
      <MeshBasicMaterial :opacity="0.0" :color="0x000000" />
    </Mesh>
  -->
  <transition
    @enter="menuIn"
    @leave="menuOut"
  >
    <keep-alive>
      <Object3D ref="nav-bar" v-if="!showFSMenu" :position="{ x: 0, y: 35.2, z: 0 }">
        <ImageMesh
          vms="@menu@nike-logo"
          :aspect="aspect"
          ref="nike-logo"
          :gclick="(v) => { $router.push('/nike/game') }"
          :d-position="{ x: -22.5 * aspect, y: 0, z: 0 }"
          :d-scale="{ x: 1 / 3, y: 1 / 3, z: 1.0 }"
          :link="require('./img/nike.png')"
        />
        <Mesh
          ref="nav-red-line"
          :position="{ x: 0, y: -3.3, z: 0 }">
          <PlaneGeometry :width="55" :height="0.2"  />
          <MeshBasicMaterial :opacity="1" :color="0xee3932" />
        </Mesh>
      </Object3D>
    </keep-alive>
  </transition>

  <transition
    @enter="fsMenuIn"
    @leave="fsMenuOut"
  >
    <keep-alive>
      <Object3D ref="fs-menu" v-if="showFSMenu" :position="{ x: 0, y: 0, z: 0.1 }">
        <Mesh
          ref="fs-menu-grunge"
          :position="{ x: 0, y: 0, z: -0.1 }">
          <PlaneGeometry :width="55" :height="120"  />
          <MeshBasicMaterial :opacity="0.5" :color="0x010101" />
        </Mesh>
        <ImageMesh
          vms="@menu@fs-menu-close"
          ref="fs-menu-close"
          :gclick="() => { if (showFSMenu || !tweening) { showFSMenu = !showFSMenu; } }"
          d-translate="{ x: (w) => {
            //return 1;
            return getSceneWidth() - w * 0.5
          }, y: (h) => {
            //return 10;
            return -getSceneHeight() + h * 0.5
          }, z: 0.0 }"
          d-scale="{ x: 1 / 2, y: 1 / 2, z: 1.0 }"
          :link="require('./img/red-btn.png')"
        />
        <ImageMesh
          vms="@menu@items@home"
          :gclick="() => { if (showFSMenu) { showFSMenu = !showFSMenu; $router.push('/nike/game'); } }"
          d-position="{ x: 0, y: 25.0, z: 0 }"
          d-translate="{ x: (w) => {
            return getSceneWidth() - w * 0.5
          }, y: 0.0, z: 0.0 }"
          d-scale="{ x: 0.5, y: 0.5, z: 1.0 }"
          :link="require('./img/items/home.png')"
        />
        <ImageMesh
          vms="@menu@items@boxing-camp"
          :gclick="() => { if (showFSMenu) { showFSMenu = !showFSMenu; $router.push('/nike/game/agree'); } }"
          d-position="{ x: 0, y: 20.0, z: 0 }"
          d-translate="{ x: (w) => {
            return getSceneWidth() - w * 0.5
          }, y: 0.0, z: 0.0 }"
          :scale="{ x: 0.5, y: 0.5, z: 1.0 }"
          :link="require('./img/items/boxing-camp.png')"
        />
        <ImageMesh
          vms="@menu@items@rules"
          :gclick="() => { if (showFSMenu) { showFSMenu = !showFSMenu; $router.push('/nike/game/rules'); } }"
          d-position="{ x: 0, y: 15.0, z: 0 }"
          d-translate="{ x: (w) => {
            return getSceneWidth() - w * 0.5
          }, y: 0.0, z: 0.0 }"
          d-scale="{ x: 0.5, y: 0.5, z: 1.0 }"
          :link="require('./img/items/rules.png')"
        />
        <ImageMesh
          vms="@menu@items@rewards"
          :gclick="() => { if (showFSMenu) { showFSMenu = !showFSMenu; $router.push('/nike/game/status'); } }"
          :aspect="aspect"
          :link="require('./img/items/rewards.png')"
        />
        <ImageMesh
          vms="@menu@items@comics"
          :gclick="() => { if (showFSMenu) { showFSMenu = !showFSMenu; $router.push('/nike/game/comic-list'); } }"
          :aspect="aspect"
          :link="require('./img/items/comics.png')"
        />
      </Object3D>
    </keep-alive>
  </transition>
</span>
</template>

<script>
import * as THREE from 'three'
import fadeInOut from '@/components/WebGL/Mixins/FadeInOut'
import Bundle from '@/components/WebGL/Bundle'
export default {
  name: 'GLMenu',
  props: ['aspect'],
  mixins: [fadeInOut],
  components: {
    ...Bundle
  },
  data () {
    return {
      THREE,
      tween: {},
      tweening: false,
      showFSMenu: false
    }
  },
  watch: {
    showFSMenu () {
      this.$emit('showPage', !this.showFSMenu)
    }
  },
  activated () {
  },
  deactivated () {
  },
  methods: {
    // getSceneWidth () {
    //   var dist = 50
    //   var vFOV = THREE.Math.degToRad(75) // convert vertical fov to radians
    //   var height = 2 * Math.tan(vFOV / 2) * dist // visible height
    //   var width = height * this.aspect // visible width
    //   return width
    // },
    // getSceneHeight () {
    //   var dist = 50
    //   var vFOV = THREE.Math.degToRad(75) // convert vertical fov to radians
    //   var height = 2 * Math.tan(vFOV / 2) * dist // visible height
    //   // var width = height * this.aspect // visible width
    //   return height
    // },
    menuIn (el, done) {
      var updater = (mesh) => {
        if (mesh) {
          this.tweening = true
          this.fadeInTween((v) => {
            if (mesh.material) {
              mesh.material.opacity = v
            }
            if (mesh.material.uniforms) {
              mesh.material.uniforms.opacity.value = v
            }
          }, () => {
            done()
            this.tweening = false
          })
        }
      }
      if (this.$refs['nav-bar']) {
        this.$refs['nav-bar'].object3d.children.forEach(updater)
      }
    },
    menuOut (el, done) {
      var updater = (mesh) => {
        if (mesh) {
          this.tweening = true
          this.fadeOutTween((v) => {
            if (mesh.material) {
              mesh.material.opacity = v
            }
            if (mesh.material.uniforms) {
              mesh.material.uniforms.opacity.value = v
            }
          }, () => {
            done()
            this.tweening = false
          })
        }
      }
      if (this.$refs['nav-bar']) {
        this.$refs['nav-bar'].object3d.children.forEach(updater)
      }
    },
    fsMenuIn (el, done) {
      var updater = (mesh) => {
        if (mesh) {
          this.tweening = true
          mesh.visible = true
          this.fadeInTween((v) => {
            if (mesh.material) {
              mesh.material.opacity = v
            }
            if (mesh.material.uniforms) {
              mesh.material.uniforms.opacity.value = v
            }
          }, () => {
            done()
            this.tweening = false
          })
        }
      }
      if (this.$refs['fs-menu']) {
        this.$refs['fs-menu'].object3d.children.forEach(updater)
      }
    },
    fsMenuOut (el, done) {
      var updater = (mesh) => {
        if (mesh) {
          this.tweening = true
          this.fadeOutTween((v) => {
            if (mesh.material) {
              mesh.material.opacity = v
            }
            if (mesh.material.uniforms) {
              mesh.material.uniforms.opacity.value = v
            }
          }, () => {
            done()
            mesh.visible = false
            this.tweening = false
          })
        }
      }
      if (this.$refs['fs-menu']) {
        this.$refs['fs-menu'].object3d.children.forEach(updater)
      }
    },
    __add (v) {
      this.$parent.scene.add(v)
    },
    __remove (v) {
      this.$parent.scene.remove(v)
    }
  }
}
</script>

<style scoped>
.hidden{
  display: none;
}
</style>
