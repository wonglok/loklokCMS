<template>
  <transition
      @enter="pageFadeIn"
      @leave="pageFadeOut"
    >
    <keep-alive>
      <Object3D ref="page-content">
        <ImageMesh
          d-gclick="() => {  }"
          :position="{ x: 0, y: 20.0, z: -0.1 }"
          :scale="{ x: 1 / 3 * 1.35, y: 1 / 3 * 1.35, z: 1.0 }"
          :link="require('./img/bg/rex.png')"
        />
      </Object3D>
    </keep-alive>
  </transition>
</template>

<script>
import fadeInOut from '@/components/WebGL/Mixins/FadeInOut'

import Bundle from '@/components/WebGL/Bundle'
export default {
  name: 'BoxingCamp',
  mixins: [fadeInOut],
  components: {
    ...Bundle
  },
  props: ['aspect'],
  data () {
    return {
      tweening: false
    }
  },
  computed: {
    children () {
      if (this.$refs['page-content'] && this.$refs['page-content'].object3d) {
        return this.$refs['page-content'].object3d.children
      } else {
        return []
      }
    }
  },
  methods: {
    pageFadeIn (el, done) {
      var updater = (mesh) => {
        if (mesh) {
          this.fadeInTween((v) => {
            this.tweening = true
            mesh.material.opacity = v
          }, () => {
            done()
            this.tweening = false
          })
        }
      }
      if (this.$refs['page-content']) {
        this.$refs['page-content'].visible = true
        this.$refs['page-content'].object3d.children.forEach(updater)
      }
    },
    pageFadeOut (el, done) {
      var updater = (mesh) => {
        if (mesh) {
          this.fadeOutTween((v) => {
            this.tweening = true
            mesh.material.opacity = v
          }, () => {
            done()
            this.tweening = false
            this.$refs['page-content'].visible = false
          })
        }
      }
      if (this.$refs['page-content']) {
        this.$refs['page-content'].object3d.children.forEach(updater)
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

</style>
