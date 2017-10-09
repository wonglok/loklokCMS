// import { db } from '@/backend/firebase'
// export default {
//   data () {
//     return {
//       fdb: db
//     }
//   }
// }

// LokLok's Visual Management System.
//
//

function getDummy () {
  return {
    position: {
      x: 0,
      x_mode: 'aspect',
      y: 0,
      y_mode: 'normal',
      z: 0,
      z_mode: 'normal'
    }
  }
}

export const style = {
  '/menu/nike-logo': getDummy(),
  '/menu/menu-trigger': getDummy()
}

export const mixin = {
  methods: {
    getV ({ obj, prop }) {
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
