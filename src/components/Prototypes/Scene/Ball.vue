<template>
<Scene @scene="(v) => { $emit('scene', v) }">
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
  components: {
    ...Bundle
  }
}
</script>

<style>

</style>
