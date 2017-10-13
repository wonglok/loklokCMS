<template>
  <div class="controllers">
    <div v-if="!appState.loggedIn">
      <h1 v-if="appState.loading">Loading....</h1>
      <button v-if="!appState.loading" class="login-btn" @click="backend.loginToGoogle()">Login</button>
    </div>
    <div v-if="appState.loggedIn">
      <h3 v-if="!vmsObj">Select style or click an object to start editing</h3>
      <div>
        <select class="style-select" v-model="selectedStyle">
          <option :selected="style.name === selectedStyle" :value="style.name" :key="key" v-for="(style, key) in filteredStyles">{{ style.name }}</option>
        </select>
        Filter Styles
        <input type="text" v-model="styleFilterQuery" />
        Use click action
        <input type="checkbox" v-model="appState.useClick" />
      </div>

      <div class="rangers" v-if="vmsObj">
        <div>
          <input @change="save(vmsObj)" @input="refresher" class="slider" type="range" step="0.1" min="-100" max="100" v-model="vmsObj.position.x" />
          <input @change="save(vmsObj)" @input="refresher" class="slider" type="text" step="0.1" min="-100" max="100" v-model="vmsObj.position.x" />
          <input @change="save(vmsObj)" @input="refresher" class="formula" type="text" v-model="vmsObj.position.x_formula" />
          X Pos
        </div>
        <div>
          <input @change="save(vmsObj)" @input="refresher" class="slider" type="range" step="0.1" min="-100" max="100" v-model="vmsObj.position.y" />
          <input @change="save(vmsObj)" @input="refresher" class="slider" type="text" step="0.1" min="-100" max="100" v-model="vmsObj.position.y" />
          <input @change="save(vmsObj)" @input="refresher" class="formula" type="text" v-model="vmsObj.position.y_formula" />
          Y Pos
        </div>
        <div>
          <input @change="save(vmsObj)" @input="refresher" class="slider" type="range" step="0.1" min="-100" max="100" v-model="vmsObj.position.z" />
          <input @change="save(vmsObj)" @input="refresher" class="slider" type="text" step="0.1" min="-100" max="100" v-model="vmsObj.position.z" />
          <input @change="save(vmsObj)" @input="refresher" class="formula" type="text" v-model="vmsObj.position.z_formula" />
          Z Pos
        </div>
        <div>
          <input @change="save(vmsObj)" @input="refresher" class="slider" type="range" step="0.1" min="-100" max="100" v-model="vmsObj.translate.x" />
          <input @change="save(vmsObj)" @input="refresher" class="slider" type="text" step="0.1" min="-100" max="100" v-model="vmsObj.translate.x" />
          <input @change="save(vmsObj)" @input="refresher" class="formula" type="text" v-model="vmsObj.translate.x_formula" />
          X Translate
        </div>
        <div>
          <input @change="save(vmsObj)" @input="refresher" class="slider" type="range" step="0.1" min="-100" max="100" v-model="vmsObj.translate.y" />
          <input @change="save(vmsObj)" @input="refresher" class="slider" type="text" step="0.1" min="-100" max="100" v-model="vmsObj.translate.y" />
          <input @change="save(vmsObj)" @input="refresher" class="formula" type="text" v-model="vmsObj.translate.y_formula" />
          Y Translate
        </div>
      </div>
      <div class="rangers" v-if="vmsObj && vmsObj.scale">
        <div>
          Scale X:
          <input @change="save(vmsObj)" @input="refresher" class="slider" type="text" v-model="vmsObj.scale.x_formula" />
          Scale Y:
          <input @change="save(vmsObj)" @input="refresher" class="slider" type="text" v-model="vmsObj.scale.y_formula" />
        </div>
        <div>
          Size X:
          <input @change="save(vmsObj)" @input="refresher" class="slider" type="text" v-model="vmsObj.size.x_formula" />
          Size Y:
          <input @change="save(vmsObj)" @input="refresher" class="slider" type="text" v-model="vmsObj.size.y_formula" />
        </div>
      </div>
      <pre v-if="vmsObj">{{ vmsObj }}</pre>
      <!-- <pre>{{ llvms }}</pre> -->
    </div>
  </div>
</template>

<script>
import * as llvms from '@/components/WebGL/Mixins/llvms'
import * as backend from '@/backend/firebase'
export default {
  data () {
    var self = this
    return {
      get vmsObj () {
        return self.getVMS()
      },
      llvmsAPI: llvms.api,
      llvms,
      backend,
      appState: backend.appState,
      selectedStyle: false,
      currentObject: false,
      styleFilterQuery: ''
    }
  },
  created () {
    this.$emit('api', this)
  },
  computed: {
    filteredStyles () {
      return this.llvmsAPI.listStyle().filter((item) => {
        return item.name.indexOf(this.styleFilterQuery) !== -1
      })
    }
  },
  methods: {
    getVMS () {
      if (this.selectedStyle) {
        let style = this.llvmsAPI.getStyle(this.selectedStyle)
        return style
      }
      if (this.currentObject && this.currentObject.userData.vms) {
        let style = this.currentObject.userData.vms
        return style
      }
    },
    save (vmsObj) {
      llvms.updateVS(vmsObj)
    },
    refresher () {
      this.currentObject.userData.$component.localRefresher = Math.random()
    },
    glClick ({ mouse, found }) {
      if (found.object.userData.vms) {
        // this.currentVMS = found.object.userData.vms
        this.currentObject = found.object
        this.selectedStyle = found.object.userData.vms.name
        this.currentObject = {
          ...this.currentObject,
          ...llvms.getTemplate({ name: found.object.userData.vms.name, data: found.object.userData.vms })
        }

        console.log({ mouse, found })
      }
    }
  }
}
</script>

<style scoped>
.login-btn{
  width: 100px;
  height: 100px;
}
.controllers{
  width: 100%;
  height: 230px;
  overflow: auto;
}
.rangers{
  display: flex;
  flex-direction: column;
}
.eval-mode{
  width: 100px;
}
.rangers input[type="range"]{
  width: 400px;
}
.style-select{
  font-size: 20px;
}
.formula {
  width: 250px;
}
</style>
