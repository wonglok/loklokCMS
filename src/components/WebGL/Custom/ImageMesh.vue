<template>
  <Mesh :vms="vms" @mesh="(v) => { mesh = v }" :position="position" :scale="scale" :gclick="gclick">
    <PlaneGeometry v-if="ready" :width="sWidth" :height="sHeight" :translate="translate" :scale="scale" />
    <MeshPictureMaterial v-if="ready" :opacity="1" :color="0xffffff" :image="link" />
  </Mesh>
</template>

<script>
import Mesh from '../Components/Mesh'
import PlaneGeometry from '../Geometry/PlaneGeometry'
import MeshPictureMaterial from '../Material/MeshPictureMaterial'

export default {
  name: 'ImageMesh',
  props: ['position', 'link', 'scale', 'gclick', 'translate', 'vms'],
  components: {
    Mesh,
    PlaneGeometry,
    MeshPictureMaterial
  },
  data () {
    return {
      mesh: false,
      ready: false,
      sWidth: 1,
      sHeight: 1
    }
  },
  mounted () {
    if (this.link) {
      var img = new Image()
      img.onload = () => {
        this.sWidth = img.width / 10
        this.sHeight = img.height / 10
        // if (this.scale) {
        //   this.sWidth = img.width / 10 * (this.scale.x)
        //   this.sHeight = img.height / 10 * (this.scale.y)
        // } else {
        // }
        this.ready = true
      }
      img.src = this.link
    }
  },
  computed: {
  },
  watch: {
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
