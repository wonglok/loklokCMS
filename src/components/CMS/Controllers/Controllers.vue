<template>
  <div class="controllers">
    <div v-if="!appState.loggedIn">
      <button @click="backend.loginToGoogle()">Login</button>
    </div>
    <div v-if="appState.loggedIn">
      <h3 v-if="!currentVMS">Click Object to Start Editing....</h3>
      <div class="rangers" v-if="currentVMS && currentVMS.position">
        <input @change="save(currentVMS)" class="slider" type="range" step="0.1" min="-100" max="100" v-model="currentVMS.position.x" />
        <select class="eval-mode" v-model="currentVMS.position.x_mode"><option value="normal">Normal</option><option value="aspect">Aspect</option></select>
        <input @change="save(currentVMS)" class="slider" type="range" step="0.1" min="-100" max="100" v-model="currentVMS.position.y" />
        <select class="eval-mode" v-model="currentVMS.position.y_mode"><option value="normal">Normal</option><option value="aspect">Aspect</option></select>
        <!-- <input class="slider" type="range" step="0.1" min="-100" max="100" v-model="currentVMS.position.z" /> -->
        <!-- <select class="eval-mode" v-model="currentVMS.position.z_mode"><option value="normal">Normal</option><option value="aspect">Aspect</option></select> -->
      </div>
      <pre v-if="currentVMS">{{ currentVMS }}</pre>
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
      currentVMS: false
    }
  },
  created () {
    this.$emit('api', this)
  },
  methods: {
    save (visualSetting) {
      llvms.updateVS(visualSetting)
    },
    glClick ({ mouse, found }) {
      if (found.object.userData.vms) {
        var now = this.currentVMS = found.object.userData.vms
        if (!now.position) {
          now.position = { x: 0, y: 0, z: 0 }
        }
        console.log({ mouse, found })
      }
    }
  }
}
</script>

<style scoped>
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
