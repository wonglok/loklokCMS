<template>
  <div class="controllers">
    <div>
      <h3 v-if="!currentVMS">Click Object to Start Editing....</h3>
      <div v-if="currentVMS && currentVMS.position">
        <input type="range" step="0.1" min="-100" max="100" v-model="currentVMS.position.x" />
        <input type="range" step="0.1" min="-100" max="100" v-model="currentVMS.position.y" />
        <input type="range" step="0.1" min="-100" max="100" v-model="currentVMS.position.z" />
      </div>
      <pre v-if="currentVMS">{{ currentVMS }}</pre>
    </div>
  </div>
</template>

<script>
import { appState } from '@/backend/firebase'
export default {
  data () {
    return {
      appState,
      currentVMS: false
    }
  },
  created () {
    this.$emit('api', this)
  },
  methods: {
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
</style>
