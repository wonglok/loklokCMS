<template>
<span class="hidden">
  <ImageMesh
    vms="@menu@menu-trigger"
    ref="menu-open"
    d-gclick="() => { showFSMenu = !showFSMenu; }"
    :link="require('./img/menu-open.png')"
  />
  <GrungeMesh
    :depthTest="false"
    :blending="THREE.AdditiveBlending"
    vms="@menu@red-gradient"
    ref="menu-gradient"
    :opacity="0.5"
    @exec="(v) => { execStack.red = v }"
    :gclick="() => {}"
    :link="require('./img/red-gradient.svg')"
  />
  <Mesh
    ref="red-box"
    :gclick="() => { showFSMenu = !showFSMenu; }"
    :position="{ x: 32.5 * aspect, y: 35.2, z: 0.3 }">
    <PlaneGeometry :width="6" :height="6"  />
    <MeshBasicMaterial :opacity="0.0" :color="0x000000" />
  </Mesh>

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
          :position="{ x: 0, y: -3.3, z: 0.3 }">
          <PlaneGeometry :width="55" :height="0.2"  />
          <MeshBasicMaterial :opacity="1" :color="0xee3932" />
        </Mesh>

        <Mesh
          ref="nav-grey-box"
          :position="{ x: 0, y: 0, z: 0.05 }">
          <PlaneGeometry :width="55" :height="6.45"  />
          <MeshBasicMaterial :opacity="0.7" :blending="THREE.NormalBlending" :color="0x010101" />
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
          ref="nav-grey-box"
          :position="{ x: 0, y: 0, z: 0.05 }">
          <PlaneGeometry :width="55" :height="155"  />
          <MeshBasicMaterial :opacity="0.7" :blending="THREE.NormalBlending" :color="0x010101" />
        </Mesh>

        <GrungeMesh
          vms="@menu@content@grunge@menu-bg"
          :gclick="() => {  }"
          @exec="(v) => { execStack.grungeCouponBox = v; }"
        />
        <!-- <Mesh
          ref="fs-menu-grunge"
          :position="{ x: 0, y: 0, z: 0.1 }">
          <PlaneGeometry :width="55" :height="120"  />
          <MeshBasicMaterial :opacity="0.5" :color="0x010101" />
        </Mesh> -->
        <ImageMesh
          vms="@menu@fs-menu-close"
          ref="fs-menu-close"
          :gclick="() => { if (showFSMenu || !tweening) { showFSMenu = !showFSMenu; } }"
          :link="require('./img/red-btn.png')"
        />
        <ImageMesh
          vms="@menu@items@home"
          :gclick="() => { if (showFSMenu) { showFSMenu = !showFSMenu; $router.push('/nike/game'); } }"
          :link="require('./img/items/home.png')"
        />
        <ImageMesh
          vms="@menu@items@boxing-camp"
          :gclick="() => { if (showFSMenu) { showFSMenu = !showFSMenu; $router.push('/nike/game/agree'); } }"
          :scale="{ x: 0.5, y: 0.5, z: 1.0 }"
          :link="require('./img/items/boxing-camp.png')"
        />
        <ImageMesh
          vms="@menu@items@rules"
          :gclick="() => { if (showFSMenu) { showFSMenu = !showFSMenu; $router.push('/nike/game/rules'); } }"
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
      execStack: {},
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
    try {
      this.$refs['nike-logo'].mesh.material.uniforms.opacity.value = 0
      this.$refs['nav-red-line'].mesh.material.opacity = 0
      this.$refs['nav-grey-box'].mesh.material.opacity = 0
      this.$refs['menu-open'].mesh.material.uniforms.opacity.value = 0
    } catch (e) {
      console.log(e)
    }

    setTimeout(() => {
      this.animateAll()
    }, 1000)

    this.$emit('exec', () => {
      for (var execItem in this.execStack) {
        let exec = this.execStack[execItem]
        if (exec) {
          exec()
        }
      }
    })
  },
  deactivated () {
    this.$emit('exec', () => {
    })
  },
  mounted () {
  },
  methods: {
    animateMenuBtn () {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          if (this.$refs['menu-open']) {
            let mesh = this.$refs['menu-open'].mesh
            mesh.material.uniforms.opacity.value = 0
            new this.TWEEN.Tween(mesh.material.uniforms.opacity)
              .to({ value: 1.0 }, 500)
              .easing(this.TWEEN.Easing.Quadratic.Out)
              .start()

            mesh.position.x += 3
            new this.TWEEN.Tween(mesh.position)
              .to({
                ...mesh.position,
                x: mesh.position.x - 3
              }, 500)
              .easing(this.TWEEN.Easing.Quadratic.Out)
              .onComplete(() => {
                resolve()
              })
              .start()
          }
        })
      })
    },
    animateNavLine () {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          if (this.$refs['nike-logo']) {
            let mesh = this.$refs['nike-logo'].mesh
            mesh.material.uniforms.opacity.value = 0
            new this.TWEEN.Tween(mesh.material.uniforms.opacity)
              .to({ value: 1.0 }, 500)
              .easing(this.TWEEN.Easing.Quadratic.Out)
              .start()

            mesh.position.y -= 3
            new this.TWEEN.Tween(mesh.position)
              .to({
                ...mesh.position,
                y: mesh.position.y + 3
              }, 500)
              .easing(this.TWEEN.Easing.Quadratic.Out)
              .onComplete(() => {
                resolve()
              })
              .start()
          }
        })
      })
    },
    animateRedLine () {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          if (this.$refs['nav-red-line']) {
            let mesh = this.$refs['nav-red-line'].mesh
            mesh.material.opacity = 0
            let v = { v: 0 }
            new this.TWEEN.Tween(v)
              .to({ v: 1 }, 500)
              .easing(this.TWEEN.Easing.Quadratic.Out)
              .onUpdate(() => {
                mesh.material.opacity = v.v
              })
              .start()
          }
        })
      })
    },
    async animateAll () {
      await this.waitSec(1000)
      await [this.animateNavLine(), this.animateRedLine(), this.animateMenuBtn()]
    },
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
          mesh.visible = true
          done()
          // this.tweening = true
          // this.fadeInTween((v) => {
          //   if (mesh.material) {
          //     mesh.material.opacity = v
          //   }
          //   if (mesh.material.uniforms) {
          //     mesh.material.uniforms.opacity.value = v
          //   }
          // }, () => {
          //   done()
          //   this.tweening = false
          // })
        }
      }
      if (this.$refs['nav-bar']) {
        this.$refs['nav-bar'].object3d.children.forEach(updater)
      }
    },
    menuOut (el, done) {
      var updater = (mesh) => {
        if (mesh) {
          mesh.visible = false
          done()

          // this.tweening = true
          // this.fadeOutTween((v) => {
          //   if (mesh.material) {
          //     mesh.material.opacity = v
          //   }
          //   if (mesh.material.uniforms) {
          //     mesh.material.uniforms.opacity.value = v
          //   }
          // }, () => {
          //   done()
          //   this.tweening = false
          // })
        }
      }
      if (this.$refs['nav-bar']) {
        this.$refs['nav-bar'].object3d.children.forEach(updater)
      }
    },
    fsMenuIn (el, done) {
      var updater = (mesh) => {
        if (mesh) {
          mesh.visible = true
          // this.tweening = true
          // mesh.visible = true
          // this.fadeInTween((v) => {
          //   if (mesh.material) {
          //     mesh.material.opacity = v
          //   }
          //   if (mesh.material.uniforms) {
          //     mesh.material.uniforms.opacity.value = v
          //   }
          // }, () => {
          //   done()
          //   this.tweening = false
          // })
        }
        done()
      }
      if (this.$refs['fs-menu']) {
        this.$refs['fs-menu'].object3d.children.forEach(updater)
      }
    },
    fsMenuOut (el, done) {
      var updater = (mesh) => {
        if (mesh) {
          mesh.visible = false
          // this.tweening = true
          // this.fadeOutTween((v) => {
          //   if (mesh.material) {
          //     mesh.material.opacity = v
          //   }
          //   if (mesh.material.uniforms) {
          //     mesh.material.uniforms.opacity.value = v
          //   }
          // }, () => {
          //   done()
          //   mesh.visible = false
          //   this.tweening = false
          // })
        }
        done()
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
