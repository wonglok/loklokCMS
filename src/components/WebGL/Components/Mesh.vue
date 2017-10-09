<template>
<span class="mesh"><slot></slot>{{ vmsRefresh }}</span>
</template>
<script>
import { mixin } from '../Mixins/llvms'
import * as THREE from 'three'
export default {
  mixins: [mixin],
  props: ['position', 'gclick', 'scale', 'vms'],
  data () {
    return {
      mesh: null,
      default: {
        geometry: false,
        material: false
      }
    }
  },
  computed: {
    vmsRefresh () {
      if (this.vms) {
        return JSON.stringify(this.vms)
      }
    }
  },
  created () {
    this.mesh = new THREE.Mesh()
    if (this.vms) {
      this.mesh.userData.vms = this.vms
    }
    if (this.gclick) {
      this.mesh.userData.gclick = this.gclick
    }
    if (this.position) {
      this.mesh.position.set(this.position.x || 0, this.position.y || 0, this.position.z || 0)
    }
    if (this.scale) {
      this.mesh.scale.set(this.scale.x || 1, this.scale.y || 1, this.scale.z || 1)
    }
    this.default.geometry = this.mesh.geometry
    this.default.material = this.mesh.material
    this.$emit('mesh', this.mesh)
  },
  watch: {
    vms () {
      if (this.vms && this.mesh) {
        this.mesh.userData.vms = this.vms
      }
    },
    vmsRefresh () {
      if (this.vms && this.mesh) {
        if (this.vms.position) {
          this.mesh.position.set(
            this.getV({ obj: this.vms.position, prop: 'x' }),
            this.getV({ obj: this.vms.position, prop: 'y' }),
            this.getV({ obj: this.vms.position, prop: 'z' }),
          )
        }

        if (this.vms.scale) {
          this.mesh.scale.set(this.vms.scale.x, this.vms.scale.y, this.vms.scale.z)
        }
      }
    },
    position () {
      if (this.position) {
        this.mesh.position.set(this.position.x || 0, this.position.y || 0, this.position.z || 0)
      }
    },
    scale () {
      if (this.scale) {
        this.mesh.scale.set(this.scale.x || 1, this.scale.y || 1, this.scale.z || 1)
      }
    }
  },
  // calling parent methods.
  mounted () {
    this.$parent.__add(this.mesh)
  },
  beforeDestroy () {
    this.$parent.__remove(this.mesh)
  },
  methods: {
    // let child add
    __add (v, type) {
      if (type === 'geometry') {
        this.mesh.geometry = v
      }
      if (type === 'material') {
        this.mesh.material = v
      }
    },
    __remove (v, type) {
      if (type === 'geometry') {
        this.mesh.geometry = this.default.geometry
      }
      if (type === 'material') {
        this.mesh.material = this.default.material
      }
    }
  }
}
</script>

<style scoped>
.mesh{
  display: none;
}
</style>
