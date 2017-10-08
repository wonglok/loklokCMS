<template>
  <transition
      @enter="campFadeIn"
      @leave="campFadeOut"
    >
    <keep-alive>
      <Object3D ref="nike-boxing-camp">
        <ImageMesh
          dgclick="() => {  }"
          :position="{ x: -20.5 * aspect, y: 26.0, z: 0 }"
          :scale="{ x: 1, y: 1, z: 1.0 }"
          :link="require('./img/hero/nike-boxing.svg')"
        />
        <ImageMesh
          dgclick="() => {  }"
          :position="{ x: 0, y: 14.5, z: -0.1 }"
          :scale="{ x: 1 / 3 * 1.25, y: 1 / 3 * 1.25, z: 1.0 }"
          :link="require('./img/bg/boxing.jpg')"
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
      if (this.$refs['nike-boxing-camp'] && this.$refs['nike-box-camp'].object3d) {
        return this.$refs['nike-box-camp'].object3d.children
      } else {
        return []
      }
    }
  },
  methods: {
    campFadeIn (el, done) {
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
      if (this.$refs['nike-boxing-camp']) {
        this.$refs['nike-boxing-camp'].visible = true
        this.$refs['nike-boxing-camp'].object3d.children.forEach(updater)
      }
    },
    campFadeOut (el, done) {
      var updater = (mesh) => {
        if (mesh) {
          this.fadeOutTween((v) => {
            this.tweening = true
            mesh.material.opacity = v
          }, () => {
            done()
            this.tweening = false
            this.$refs['nike-boxing-camp'].visible = false
          })
        }
      }
      if (this.$refs['nike-boxing-camp']) {
        this.$refs['nike-boxing-camp'].object3d.children.forEach(updater)
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
