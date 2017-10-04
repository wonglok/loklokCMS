<template>
  <Mesh :position="position" :gclick="gclick">
    <PlaneGeometry  v-if="ready" :width="sWidth" :height="sHeight"  />
    <MeshBasicMaterial  v-if="ready" :opacity="1" :color="0xffffff" :image="link" />
  </Mesh>
</template>

<script>
import Mesh from '../Components/Mesh'
import PlaneGeometry from '../Geometry/PlaneGeometry'
import MeshBasicMaterial from '../Material/MeshBasicMaterial'
export default {
  name: 'ImageMesh',
  props: ['position', 'link', 'scale', 'gclick'],
  components: {
    Mesh,
    PlaneGeometry,
    MeshBasicMaterial
  },
  data () {
    return {
      ready: false,
      sWidth: 1,
      sHeight: 1
    }
  },
  mounted () {
    if (this.link) {
      var img = new Image()
      img.onload = () => {
        this.sWidth = img.width / 10 * (this.scale || 1)
        this.sHeight = img.height / 10 * (this.scale || 1)
        this.ready = true
      }
      img.src = this.link
    }
  },
  methods: {
    __add (data) {
      this.$parent.__add(data)
    },
    __remove (data) {
      this.$parent.__remove(data)
    }
  }
}
</script>

<style scoped>

</style>
