<template>
<div class="proto">
  <h1>Prototypes</h1>
  <p>{{ $route.fullPath }}</p>
  <p>
    <router-link to="/prototypes/scene/ball">Ball</router-link>
    <router-link to="/prototypes/scene/red">Red</router-link>
    <router-link to="/prototypes/scene/fun">Fun</router-link>
    <router-link to="/prototypes/scene/woody">Woody</router-link>
  </p>
  <!-- <button v-if="!appState.loggedIn" @click="loginGoogle()">Login Google</button> -->
  <!-- <pre style="width: 100%; max-height: 200px; overflow: auto;">{{ appState.user }}</pre> -->
  <div class="fixed-box">
    <div class="full">
      <router-view></router-view>
    </div>
  </div>
</div>
</template>

<script>
import { loginToGoogle, appState } from '@/backend/firebase'

export default {
  data () {
    return {
      appState
    }
  },
  methods: {
    loginGoogle () {
      loginToGoogle()
    }
  }
}
</script>

<style scoped>
.proto{
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}
.fixed-box{
  width: calc(100% - 50px);
  height: 70%;
  max-height: 1024px;

  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: #bababa dashed 1px;
}
.full{
  width: 100%;
  height: 100%;
}
</style>
