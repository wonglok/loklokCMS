<template>
  <transition
      @enter="pageFadeIn"
      @leave="pageFadeOut"
    >
    <keep-alive>
      <Object3D ref="page-content">
        <!-- <ImageMesh
          :gclick="() => { $router.push('/nike/game/play') }"
          vms="@agree@cta@enter-now"
          :link="require('./img/enter.png')"
        /> -->
        <ImageMesh
          vms="@agree@header@title"
          :link="require('./img/header/title.png')"
        />
        <ImageMesh
          vms="@agree@bg@rex"
          :link="require('./img/bg/rex.png')"
        />
        <ImageMesh
          vms="@agree@tagline@title"
          :link="require('./img/tagline/title.png')"
        />

        <ImageMesh
          vms="@agree@desc@punch-icon"
          :link="require('./img/desc/punch-icon.png')"
        />
        <ImageMesh
          vms="@agree@desc@punch-about"
          :link="require('./img/desc/punch-about.png')"
        />

        <GrungeMesh
          vms="@agree@grunge@bg"
          :gOpacity="0.53"
          :color="0xefefef"
          @exec="(v) => { execStack.grungeBg = v }"
        />

        <GrungeMesh
          vms="@agree@grunge@punch-icon"
          :gOpacity="0.9"
          :color="0xefefef"
          @exec="(v) => { execStack.grungePunchIcon = v }"
        />

        <GrungeMesh
          vms="@agree@grunge@punch-about"
          :gOpacity="0.9"
          :color="0xefefef"
          @exec="(v) => { execStack.grungePunchAbout = v }"
        />

        <GrungeMesh
          vms="@agree@grunge@enter-now"
          :link="require('./img/enter.png')"
          :gclick="() => { $router.push('/nike/game/login') }"
          :gOpacity="1.0"
          :color="0xbababa"
          @exec="(v) => { execStack.grungeEnterNow = v }"
        />

        <ImageMesh
          :visible="!checkedBox"
          :gclick="() => { toggleBox() }"
          vms="@agree@agree@box-unchecked"
          :link="require('./img/agree/box-unchecked.png')"
        />

        <ImageMesh
          :visible="checkedBox"
          :gclick="() => { toggleBox() }"
          vms="@agree@agree@box-checked"
          :link="require('./img/agree/box-checked.png')"
        />

        <ImageMesh
          :gclick="() => { $router.push('/nike/game/rules') }"
          vms="@agree@agree@agree-rule"
          :link="require('./img/agree/agree-rule.png')"
        />

      </Object3D>

    </keep-alive>
  </transition>
</template>

<script>
import fadeInOut from '@/components/WebGL/Mixins/FadeInOut'
// import * as THREE from 'three'
import Bundle from '@/components/WebGL/Bundle'
export default {
  name: 'Agree',
  mixins: [fadeInOut],
  components: {
    ...Bundle
  },
  props: ['aspect'],
  data () {
    return {
      readyAgree: false,
      checkedBox: false,
      execStack: {
        grungeBg () {}
      },
      tweening: false
    }
  },
  mounted () {
  },
  activated () {
    this.$emit('exec', this.exec)
  },
  deactivated () {
    this.$emit('exec', () => {})
  },
  methods: {
    __add (v) {
      this.$nextTick(() => {
        this.$parent.scene.add(v)
      })
    },
    __remove (v) {
      this.$nextTick(() => {
        this.$parent.scene.remove(v)
      })
    },
    toggleBox () {
      this.checkedBox = !this.checkedBox
    },
    exec () {
      for (var exe in this.execStack) {
        this.execStack[exe]()
      }
    }
  }
}
</script>

<style scoped>

</style>
