import * as backend from '@/backend/firebase'

export const __styleContainer = {
  ready: false,
  data: []
}

backend.getStyles().then((data) => {
  // console.log(data)
  __styleContainer.data = data
  __styleContainer.ready = true
  useRealtime()
}).catch(() => {
  __styleContainer.ready = true
  useRealtime()
})

function useRealtime () {
  if (backend.appState.useCMS) {
    backend.readyRT().then(() => {
      var ref = backend.api.db.ref('/cms-data/styles')
      ref.on('value', function (snapshot) {
        var val = snapshot.val()
        __styleContainer.data = backend.transform(val)
        console.log(__styleContainer.data)
      })
    })
  }
}

// function readyStyles () {
//   return new Promise((resolve, reject) => {
//     function tryAgain () {
//       if (!__styleContainer.ready) {
//         setTimeout(tryAgain, 333)
//       } else {
//         resolve(__styleContainer)
//       }
//     }
//     tryAgain()
//   })
// }

export const llvmsMesh = {
  props: [
    'vms'
  ],
  data () {
    return {
      __styleContainer
    }
  },
  mounted () {
  },
  computed: {
    __llvms__readyStyles () {
      if (this.__styleContainer) {
        return this.__styleContainer.ready
      }
      return __styleContainer.ready
    },
    __llvms__styles () {
      if (this.__styleContainer) {
        return this.__styleContainer.data
      }
      return __styleContainer.data
    },
    __llvms__vmsRefresh () {
      if (this.vms) {
        return JSON.stringify(this.vms)
      }
    }
  },
  watch: {
    __llvms__readyStyles () {
      if (this.vms && this.__llvms__readyStyles) {
        // console.log(this.__llvms__styles)
        this.mesh.userData.vms = this.__llvms__find(this.vms)
      }
    },
    __llvms__vmsRefresh () {
      this.__llvms__update()
    }
  },
  methods: {
    __llvms__getTemplate ({ name }) {
      return {
        type: 'mesh',
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
    },
    __llvms__find (name) {
      return this.__llvms__styles.filter((item) => {
        return item.name === name
      })[0]
    },
    __llvms__update () {
      if (this.vms && this.mesh) {
        if (this.vms.position) {
          this.mesh.position.set(
            this.__llvms__calc({ obj: this.vms, key: 'position', prop: 'x' }),
            this.__llvms__calc({ obj: this.vms, key: 'position', prop: 'y' }),
            this.__llvms__calc({ obj: this.vms, key: 'position', prop: 'z' })
          )
        }
        if (this.vms.scale) {
          this.mesh.scale.set(
            this.__llvms__calc({ obj: this.vms, key: 'scale', prop: 'x' }),
            this.__llvms__calc({ obj: this.vms, key: 'scale', prop: 'y' }),
            this.__llvms__calc({ obj: this.vms, key: 'scale', prop: 'z' })
          )
        }
      }
    },
    __llvms__calc ({ obj, key, prop }) {
      var mode = obj[key][prop + '_mode']

      var aspect = this.aspect ||
                   this.$parent.aspect ||
                   this.$parent.$parent.aspect ||
                   this.$parent.$parent.$parent.aspect ||
                   this.$parent.$parent.$parent.$parent.aspect

      if (!mode || mode === 'normal') {
        return obj[key][prop]
      } else if (mode === 'aspect') {
        return obj[key][prop] * aspect
      }
    }
  }
}
