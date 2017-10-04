<script>
import * as THREE from 'three'
export default {
  props: ['width', 'height', 'wseg', 'hseg'],
  abstract: true,
  render () {
    return null
  },
  data () {
    return {
      geometry: null
    }
  },
  created () {
    this.makeGeo()
    // this.geometry
    this.$emit('geometry', this.geometry)
  },
  watch: {
    width () {
      this.makeGeo()
    },
    height () {
      this.makeGeo()
    }
  },
  methods: {
    makeGeo () {
      this.geometry = new THREE.PlaneBufferGeometry(this.width || 1.0, this.height || 1.0, this.wseg || 2.0, this.hseg || 2.0)
    }
  },
  mounted () {
    this.$parent.__add(this.geometry, 'geometry')
  },
  beforeDestroy () {
    this.$parent.__remove(this.geometry, 'geometry')
  }
}
</script>

<style scoped>
.box-geometry{
  display: none;
}
</style>
