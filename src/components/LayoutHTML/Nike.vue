<template>
  <div class="full">
    <div class="baseline">
      <div class="maxer" v-show="isTallEnough">
        <div class="maxer-desc">iPhone 7 Plus</div>
        <GLView @refresh="(v) => { refresh.maxer1 = v }"></GLView>
      </div>
      <div class="maxer2" v-show="isTallEnough" v-if="isBigEnough">
        <div class="maxer-desc">iPhone 7 Plus Safari</div>
        <GLView @refresh="(v) => { refresh.maxer2 = v }"></GLView>
      </div>
    </div>
  </div>
</template>

<script>
import GLView from '@/components/WebGL/GLView'
export default {
  components: {
    GLView
  },
  data () {
    return {
      refresh: {},
      isTallEnough: false,
      isBigEnough: false
    }
  },
  created () {
    var resizer = () => {
      this.isTallEnough = window.innerHeight > 500
      this.isBigEnough = window.innerWidth > 828
      // auto refresh :D
      for (var exec in this.refresh) {
        var exe = this.refresh[exec]
        if (exe) {
          this.$nextTick(() => {
            exe()
          })
        }
      }
    }
    resizer()
    window.addEventListener('resize', resizer)
  },
  computed: {
  }
}
</script>

<style scoped>
.full{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.baseline{
  max-height: 736px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: baseline;
}
.maxer{
  width: 100%;
  height: 100%;
  max-width: 414px;
  max-height: 736px;
  outline: grey solid 1px;
  position: relative;
}
.maxer2{
  width: 100%;
  height: 100%;
  max-width: 414px;
  max-height: 630px;
  outline: grey solid 1px;
  position: relative;
}

.maxer-desc{
  position: absolute;
  top: -40px;
  left: 0px;
  width: 100%;
  height: 40px;
}

</style>
