<template>
<Scene @scene="(v) => { $emit('scene', v) }">
  <PerspectiveCamera :fov="75" :aspect="aspect" :near="1" :far="1000" @camera="(v) => { camera = v }" />
  <Mesh>
    <MeshPhongMaterial />
    <BoxGeometry />
  </Mesh>
  <PointLight />
</Scene>
</template>

<script>
import Bundle from '@/components/WebGL/Bundle'
export default {
  props: ['aspect', 'rect'],
  components: {
    ...Bundle
  }
}
</script>

<style>

</style>
