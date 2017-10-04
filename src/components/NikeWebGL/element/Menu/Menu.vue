<template>
  <Object3D :position="{ x: 0, y: 35.2, z: 0 }">
    <ImageMesh
      name="nike-logo"
      :gclick="alert"
      :position="{ x: -22.5 * aspect, y: 0, z: 0 }"
      :link="require('./img/nike.svg')"
    />
    <ImageMesh
      name="menu-open"
      :gclick="alert"
      :position="{ x: 32.5 * aspect, y: 0, z: 0 }"
      :link="require('./img/menu-open.svg')"
    />
    <Mesh :position="{ x: 0, y: -3.3, z: 0 }">
      <PlaneGeometry :width="55" :height="0.2"  />
      <MeshBasicMaterial :opacity="1" :color="0xee3932" />
    </Mesh>
  </Object3D>
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
  methods: {
    alert ({ found }) {
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

<style>

</style>
