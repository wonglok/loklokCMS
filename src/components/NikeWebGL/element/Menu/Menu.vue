<template>
<span class="hidden">
  <transition
    @enter="menuIn"
    @leave="menuOut"
  >
    <keep-alive>
      <Object3D v-if="!showFSMenu" :position="{ x: 0, y: 35.2, z: 0 }">
        <ImageMesh
          ref="nike-logo"
          :gclick="(v) => { if (!showFSMenu || !tweening) { home(v) } }"
          :position="{ x: -22.5 * aspect, y: 0, z: 0 }"
          :scale="{ x: 1 / 3, y: 1 / 3, z: 1.0 }"
          :link="require('./img/nike.png')"
        />
        <ImageMesh
          ref="menu-open"
          :gclick="() => { if (!showFSMenu || !tweening) { showFSMenu = !showFSMenu; } }"
          :position="{ x: 32.5 * aspect, y: 0, z: 0 }"
          :scale="{ x: 1 / 3, y: 1 / 3, z: 1.0 }"
          :link="require('./img/menu-open.png')"
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
      <Object3D v-if="showFSMenu" :position="{ x: 0, y: 0, z: 0 }">
        <ImageMesh
          ref="fs-menu-open"
          :gclick="() => { if (showFSMenu || !tweening) { showFSMenu = !showFSMenu; } }"
          :position="{ x: 32.5 * aspect, y: 35.2, z: 0 }"
          :scale="{ x: 1 / 3, y: 1 / 3, z: 1.0 }"
          :link="require('./img/menu-open.png')"
        />
      </Object3D>
    </keep-alive>
  </transition>
</span>
</template>

<script>
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
      tweening: false,
      showFSMenu: false
    }
  },
  activated () {

  },
  deactivated () {

  },
  methods: {
    home () {
      this.$router.push({
        path: '/nike/game'
      })
    },
    menuIn (el, done) {
      this.$refs['nike-logo'].mesh.visible = true
      this.$refs['menu-open'].mesh.visible = true
      this.$refs['nav-red-line'].mesh.visible = true

      this.fadeInTween((v) => {
        this.tweening = true
        if (this.$refs['nike-logo']) {
          this.$refs['nike-logo'].mesh.material.opacity = v
          this.$refs['menu-open'].mesh.material.opacity = v
          // this.$refs['menu-open'].mesh.position.z = v / 100
          this.$refs['nav-red-line'].mesh.material.opacity = v
        }
      }, () => {
        done()
        this.tweening = false
      })
    },
    menuOut (el, done) {
      this.fadeOutTween((v) => {
        this.tweening = true
        if (this.$refs['nike-logo']) {
          this.$refs['nike-logo'].mesh.material.opacity = v
          this.$refs['menu-open'].mesh.material.opacity = v
          // this.$refs['menu-open'].mesh.position.z = v / 100
          this.$refs['nav-red-line'].mesh.material.opacity = v
        }
      }, () => {
        done()
        this.$refs['nike-logo'].mesh.visible = false
        this.$refs['menu-open'].mesh.visible = false
        this.$refs['nav-red-line'].mesh.visible = false
        this.tweening = false
      })
    },
    fsMenuIn (el, done) {
      this.fadeInTween((v) => {
        this.tweening = true
        if (this.$refs['fs-menu-open']) {
          this.$refs['fs-menu-open'].mesh.material.opacity = v
          // this.$refs['fs-menu-open'].mesh.position.z = v / 100
        }
      }, () => {
        done()
        this.tweening = false
      })
    },
    fsMenuOut (el, done) {
      this.fadeOutTween((v) => {
        if (this.$refs['fs-menu-open']) {
          this.$refs['fs-menu-open'].mesh.material.opacity = v
          // this.$refs['fs-menu-open'].mesh.position.z = v / 100
        }
      }, () => {
        done()
        this.tweening = false
      })
    },
    blink ({ found }) {
      console.log(found)
      this.fadeOutTween((v) => {
        found.object.material.opacity = v
      }, () => {
        this.fadeInTween((v) => {
          found.object.material.opacity = v
        }, () => {
        })
      })
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
