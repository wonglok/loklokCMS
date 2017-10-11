<template>
  <div class="controllers">
    <div v-if="!appState.loggedIn">
      <h1 v-if="appState.loading">Loading....</h1>
      <button v-if="!appState.loading" class="login-btn" @click="backend.loginToGoogle()">Login</button>
    </div>
    <div v-if="appState.loggedIn">
      <h3 v-if="!getVMS()">Click Object to Start Editing....</h3>
      <div class="rangers" v-if="getVMS() && getVMS().position">
        <div>
          <input @change="save(getVMS())" @input="refresher" class="slider" type="range" step="0.1" min="-100" max="100" v-model="getVMS().position.x" />
          <input @change="save(getVMS())" @input="refresher" class="slider" type="text" step="0.1" min="-100" max="100" v-model="getVMS().position.x" />
          <input @change="save(getVMS())" @input="refresher" class="slider" type="text" v-model="getVMS().position.x_formula" />
        </div>
        <div>
          <input @change="save(getVMS())" @input="refresher" class="slider" type="range" step="0.1" min="-100" max="100" v-model="getVMS().position.y" />
          <input @change="save(getVMS())" @input="refresher" class="slider" type="text" step="0.1" min="-100" max="100" v-model="getVMS().position.y" />
          <input @change="save(getVMS())" @input="refresher" class="slider" type="text" v-model="getVMS().position.y_formula" />
        </div>
        <div>
          <input @change="save(getVMS())" @input="refresher" class="slider" type="range" step="0.1" min="-100" max="100" v-model="getVMS().position.z" />
          <input @change="save(getVMS())" @input="refresher" class="slider" type="text" step="0.1" min="-100" max="100" v-model="getVMS().position.z" />
          <input @change="save(getVMS())" @input="refresher" class="slider" type="text" v-model="getVMS().position.z_formula" />
        </div>
      </div>
      <div class="rangers" v-if="getVMS() && getVMS().scale">
        <div>
          Scale X:
          <input @change="save(getVMS())" @input="refresher" class="slider" type="text" v-model="getVMS().scale.x_formula" />
        </div>
        <div>
          Scale Y:
          <input @change="save(getVMS())" @input="refresher" class="slider" type="text" v-model="getVMS().scale.y_formula" />
        </div>
      </div>
      <pre v-if="getVMS()">{{ getVMS() }}</pre>
      <!-- <pre>{{ llvms }}</pre> -->
    </div>
  </div>
</template>

<script>
import * as llvms from '@/components/WebGL/Mixins/llvms'
import * as backend from '@/backend/firebase'
export default {
  data () {
    return {
      llvms,
      backend,
      appState: backend.appState,
      currentObject: false
    }
  },
  created () {
    this.$emit('api', this)
  },
  methods: {
    getVMS () {
      if (this.currentObject) {
        return this.currentObject.userData.vms
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
  height: 200px;
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
</style>
