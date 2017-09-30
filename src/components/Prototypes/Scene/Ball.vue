<template>
<span class="root">
  <PerspectiveCamera :fov="75" :aspect="aspect" :near="1" :far="1000" @camera="(v) => { $emit('camera', v) }" />
  <Scene @scene="(v) => { $emit('scene', v) }">
    <Points>
      <SphereGeometry />
      <PointsMaterial :color="0xff00ff" />
    </Points>
    <PointLight />
  </Scene>
</span>
</template>

<script>
import Bundle from '@/components/WebGL/Bundle'
export default {
  props: ['aspect'],
  components: {
    ...Bundle
  }
}
</script>

<style scoped>
.root{
  display: none;
}
</style>
