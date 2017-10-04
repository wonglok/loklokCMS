<template>
  <div class="full">
    <div class="maxer">
      <GLView @refresh="(v) => { refresh = v }"></GLView>
    </div>
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
  display: flex;
  justify-content: center;
  align-items: center;
}
.maxer{
  width: 100%;
  height: 100%;
  max-width: 414px;
  max-height: 736px;
  outline: grey solid 1px;
}
</style>
