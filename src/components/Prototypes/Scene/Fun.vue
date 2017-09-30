<template>
<span class="scene-root">
  <PerspectiveCamera :fov="75" :aspect="aspect" :near="1" :far="1000" @camera="(v) => { $emit('camera', v) }" />
  <Scene @scene="(v) => { $emit('scene', v) }">
    <Mesh>
      <MeshPhongMaterial />
      <SphereGeometry />
    </Mesh>
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
.scene-root{
  display: none;
}
</style>
