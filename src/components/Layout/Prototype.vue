<template>
<div class="proto">
  <h1>Prototypes</h1>
  <p>{{ $route.fullPath }}</p>
  <router-link to="/prototypes/better-particles/ball">Ball</router-link>
  <router-link to="/prototypes/better-particles/fun">Fun</router-link>
  <div class="fixed-box">
    <div class="full">
      <router-view></router-view>
    </div>
  </div>
</div>
</template>

<script>
export default {

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
