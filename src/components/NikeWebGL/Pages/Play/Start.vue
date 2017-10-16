<template>
  <transition
    @enter="pageFadeIn"
    @leave="pageFadeOut"
  >
    <keep-alive>
      <Object3D ref="sub-page-content">
        <ImageMesh
          :gclick="() => {  }"
          vms="@play@start@hold-tight"
          :link="require('./img/start/hold-tight.png')"
        />

        <ImageMesh
          :gclick="() => {  }"
          vms="@play@start@start-btn-bg"
          :link="require('./img/start/start-btn-bg.png')"
        />

        <ImageMesh
          :gclick="() => { $router.push({ path: '/nike/game/play/countdown' }) }"
          vms="@play@start@start-btn"
          :link="require('./img/start/start-btn.png')"
        />

        <ImageMesh
          :gclick="() => {  }"
          vms="@play@start@start-icon"
          :link="require('./img/start/start-icon.png')"
        />

      </Object3D>
    </keep-alive>
  </transition>
</template>

<script>
import fadeInOut from '@/components/WebGL/Mixins/FadeInOut'
import Bundle from '@/components/WebGL/Bundle'
export default {
  name: 'Start',
  mixins: [fadeInOut],
  components: {
    ...Bundle
  },
  props: ['aspect', 'camera'],
  data () {
    return {
      execStack: {},
      tweening: false
    }
  },
  activated () {
    this.$emit('exec', () => {
      for (var execItem in this.execStack) {
        let exec = this.execStack[execItem]
        if (exec) {
          exec()
        }
      }
    })
  },
  deactivated () {

  },
  methods: {
    __add (v) {
      this.$parent.$parent.$parent.scene.add(v)
    },
    __remove (v) {
      this.$parent.$parent.$parent.scene.remove(v)
    }
  }
}
</script>

<style scoped>

</style>
