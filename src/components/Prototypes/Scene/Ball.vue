<template>
<Scene @scene="(v) => { $emit('scene', v) }">
  <PerspectiveCamera :fov="75" :aspect="aspect" :near="1" :far="1000" @camera="(v) => { $emit('camera', v) }" />
  <Mesh>
    <MeshPhongMaterial />
    <SphereGeometry />
  </Mesh>
  <PointLight />
</Scene>
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

<style>

</style>
