<template>
  <div class="full">
    <GLView @refresh="(v) => { refresh = v }"></GLView>
  </div>
</template>

<script>
import GLView from '@/components/WebGL/GLView'
export default {
  components: {
    GLView
  }
}
</script>

<style scoped>
.full{
  width: 100%;
  height: 100%;
}
</style>
