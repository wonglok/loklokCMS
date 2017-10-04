<template>
  <div class="full">
    <div class="baseline">
      <div class="maxer">
        <div class="maxer-desc">iPhone 7 Plus</div>
        <GLView @refresh="(v) => { refresh.maxer1 = v }"></GLView>
      </div>
      <div class="maxer2" v-if="isBigEnough">
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
      isBigEnough: false,
      random: Math.random()
    }
  },
  created () {
    var resizer = () => {
      this.isBigEnough = window.innerWidth > 828
      for (var exec in this.refresh) {
        var exe = this.refresh[exec]
        if (exe) {
          exe()
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
