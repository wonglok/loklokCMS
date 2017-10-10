function getDummy ({ name }) {
  return {
    name,
    position: {
      x: 0,
      x_mode: 'aspect',
      y: 0,
      y_mode: 'normal',
      z: 0,
      z_mode: 'normal'
    },
    scale: {
      x: 1.0,
      x_mode: 'normal',
      y: 1.0,
      y_mode: 'normal',
      z: 1.0,
      z_mode: 'normal'
    }
  }
}

export const style = {
  '/menu/nike-logo': getDummy({ name: 'nike-logo' }),
  '/menu/menu-trigger': getDummy({ name: 'menu-trigger' })
}

export const llvmsUsage = {
  data () {
    return {
      style
    }
  },
  methods: {
    vms (name) {
      return this.style[name]
    }
  }
}

export const llvmsMesh = {
  props: [
    'vms'
  ],
  created () {
    this.$nextTick(() => {
      if (this.vms) {
        this.mesh.userData.vms = this.vms
      }
    })
  },
  computed: {
    vmsRefresh () {
      if (this.vms) {
        return JSON.stringify(this.vms)
      }
    }
  },
  watch: {
    vmsRefresh () {
      if (this.vms && this.mesh) {
        if (this.vms.position) {
          this.mesh.position.set(
            this.__llvms__getV({ obj: this.vms.position, prop: 'x' }),
            this.__llvms__getV({ obj: this.vms.position, prop: 'y' }),
            this.__llvms__getV({ obj: this.vms.position, prop: 'z' }),
          )
        }
        if (this.vms.scale) {
          this.mesh.scale.set(
            this.__llvms__getV({ obj: this.vms.scale, prop: 'x' }),
            this.__llvms__getV({ obj: this.vms.scale, prop: 'y' }),
            this.__llvms__getV({ obj: this.vms.scale, prop: 'z' }),
          )
        }
      }
    },
    vms () {
      if (this.vms && this.mesh) {
        this.mesh.userData.vms = this.vms
      }
    }
  },
  methods: {
    __llvms__getV ({ obj, prop }) {
      var mode = obj[prop + '_mode']
      var aspect = this.aspect ||
                   this.$parent.aspect ||
                   this.$parent.$parent.aspect ||
                   this.$parent.$parent.$parent.aspect ||
                   this.$parent.$parent.$parent.$parent.aspect

      if (!mode || mode === 'normal') {
        return obj[prop]
      } else if (mode === 'aspect') {
        return obj[prop] * aspect
      }
    }
  }
}
