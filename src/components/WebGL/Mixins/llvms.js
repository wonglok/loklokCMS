import * as backend from '@/backend/firebase'

export const __styleContainer = {
  random: Math.random(),
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
    backend.readyRT()
    .then(() => {
      var ref = backend.api.db.ref('/cms-data/styles')
      ref.on('value', function (snapshot) {
        var val = snapshot.val()
        __styleContainer.data = backend.transform(val)
        __styleContainer.random = Math.random()
        console.log(__styleContainer.data)
      })
    })
  }
}

export function createVisalSetting (obj) {
  if (backend.appState.useCMS) {
    backend.readyRT().then(() => {
      backend.api.db.ref(`/cms-data/styles/${obj.name}`).set(obj)
    })
  }
}

export function updateVisualSetting (key, obj) {
  if (backend.appState.useCMS) {
    backend.readyRT().then(() => {
      var updates = {}
      updates[`${key}`] = backend.cleanKey(obj)
      backend.api.db.ref('/cms-data/styles/').update(updates)
    })
  }
}

export function updateVS (obj) {
  updateVisualSetting(obj['.key'], obj)
}

export const llvmsMesh = {
  props: [
    'vms'
  ],
  data () {
    return {
      vmsObj: null,
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
    __llvms__randomStyle () {
      if (this.__styleContainer) {
        return this.__styleContainer.random
      }
      return __styleContainer.random
    },
    __llvms__styles () {
      if (this.__styleContainer) {
        return this.__styleContainer.data
      }
      return __styleContainer.data
    },
    __llvms__vmsLocalRefresh () {
      if (this.vmsObj) {
        return JSON.stringify(this.vmsObj)
      }
    },
    __llvms__vmsRemoteRefresh () {
      if (this.vmsObj) {
        return JSON.stringify(this.__llvms__randomStyle)
      }
    }
  },
  watch: {
    __llvms__readyStyles () {
      this.__llvms__updateVMSObjRef()
    },
    __llvms__vmsRemoteRefresh () {
      this.__llvms__updateVMSObjRef()
      this.__llvms__update()
    },
    __llvms__vmsLocalRefresh () {
      this.__llvms__update()
    }
  },
  methods: {
    __llvms__updateVMSObjRef () {
      if (this.vms && this.__llvms__readyStyles) {
        // console.log(this.__llvms__styles)
        let vmsObj = this.vmsObj = this.mesh.userData.vms = this.__llvms__find(this.vms)
        if (!vmsObj) {
          createVisalSetting(this.__llvms__getTemplate({ name: this.vms }))
        }
      }
    },
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
      if (this.vmsObj && this.mesh) {
        if (this.vmsObj.position) {
          this.mesh.position.set(
            this.__llvms__calc({ obj: this.vmsObj, key: 'position', prop: 'x' }),
            this.__llvms__calc({ obj: this.vmsObj, key: 'position', prop: 'y' }),
            this.__llvms__calc({ obj: this.vmsObj, key: 'position', prop: 'z' })
          )
        }
        if (this.vmsObj.scale) {
          this.mesh.scale.set(
            this.__llvms__calc({ obj: this.vmsObj, key: 'scale', prop: 'x' }),
            this.__llvms__calc({ obj: this.vmsObj, key: 'scale', prop: 'y' }),
            this.__llvms__calc({ obj: this.vmsObj, key: 'scale', prop: 'z' })
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
        return parseFloat(obj[key][prop])
      } else if (mode === 'aspect') {
        return parseFloat(obj[key][prop]) * aspect
      }
    }
  }
}
