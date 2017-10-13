<template>
  <Mesh :visible="visible" :vms="vms" @mesh="(v) => { mesh = v; }" :position="finalPosition" :scale="finalScale" :gclick="gclick">
    <PlaneGeometry v-if="ready" :width="sWidth" :height="sHeight" :translate="finalTranslate" :scale="scale" />
    <MeshPictureMaterial :opacity="1" :color="0xffffff" :image="link" />
  </Mesh>
</template>

<script>
import { llvmsMesh } from '../Mixins/llvms'
import Mesh from '../Components/Mesh'
import PlaneGeometry from '../Geometry/PlaneGeometry'
import MeshPictureMaterial from '../Material/MeshPictureMaterial'

export default {
  name: 'ImageMesh',
  mixins: [llvmsMesh],
  props: {
    position: {},
    link: {},
    scale: {},
    gclick: {},
    translate: {},
    vms: {},
    visible: {
      default: true
    }
  },
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
    if (this.mesh) {
      this.mesh.visible = false
      this.mesh.userData.$component = this
    }
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
  beforeDestroy () {
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
