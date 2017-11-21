<template>
  <transition
      @enter="pageFadeIn"
      @leave="pageFadeOut"
    >
    <keep-alive>
      <Object3D ref="page-content">

        <Object3D ref="comics-content">
          <ImageMesh
            ref="s-1"
            :visible="isAtPage(1)"
            vms="@comic-detail@comics@s-1"
            :link="require('./img/comics/s-1.jpg')"
          />
          <ImageMesh
            ref="s-2"
            :visible="isAtPage(2)"
            vms="@comic-detail@comics@s-2"
            :link="require('./img/comics/s-2.jpg')"
          />
          <ImageMesh
            ref="s-3"
            :visible="isAtPage(3)"
            vms="@comic-detail@comics@s-3"
            :link="require('./img/comics/s-3.jpg')"
          />
          <ImageMesh
            ref="s-4"
            :visible="isAtPage(4)"
            vms="@comic-detail@comics@s-4"
            :link="require('./img/comics/s-4.jpg')"
          />
        </Object3D>


        <ImageMesh
          :visible="!isAtPage(1)"
          :gclick="() => { goComics('1') }"
          vms="@comic-detail@link@l-1"
          :link="require('../ComicList/img/link/l-1.png')"
        />
        <ImageMesh
          :visible="!isAtPage(2)"
          :gclick="() => { goComics('2') }"
          vms="@comic-detail@link@l-2"
          :link="require('../ComicList/img/link/l-2.png')"
        />
        <ImageMesh
          :visible="!isAtPage(3)"
          :gclick="() => { goComics('3') }"
          vms="@comic-detail@link@l-3"
          :link="require('../ComicList/img/link/l-3.png')"
        />
        <ImageMesh
          :visible="!isAtPage(4)"
          :gclick="() => { goComics('4') }"
          vms="@comic-detail@link@l-4"
          :link="require('../ComicList/img/link/l-4.png')"
        />

        <ImageMesh
          :visible="isAtPage(1)"
          :gclick="() => { goComics('1') }"
          vms="@comic-detail@active-link@l-1"
          :link="require('./img/link-active/la-1.png')"
        />
        <ImageMesh
          :visible="isAtPage(2)"
          :gclick="() => { goComics('2') }"
          vms="@comic-detail@active-link@l-2"
          :link="require('./img/link-active/la-2.png')"
        />
        <ImageMesh
          :visible="isAtPage(3)"
          :gclick="() => { goComics('3') }"
          vms="@comic-detail@active-link@l-3"
          :link="require('./img/link-active/la-3.png')"
        />
        <ImageMesh
          :visible="isAtPage(4)"
          :gclick="() => { goComics('4') }"
          vms="@comic-detail@active-link@l-4"
          :link="require('./img/link-active/la-4.png')"
          @final-position="(props) => { tryMaximiseScroller(props); scrollerState.bound.yMax -= 40; }"
        />
        <ImageMesh
          :gclick="() => {  }"
          vms="@comic-detail@share@share"
          :link="require('./img/share/share.png')"
        />

        <GrungeMesh
          vms="@comic-detail@grunge@share-fb"
          :gOpacity="0.9"
          :color="0xefefef"
          @exec="(v) => { execStack.grungeShareFB = v }"
        />

      </Object3D>
    </keep-alive>
  </transition>
</template>

<script>
import TWEEN from '@tweenjs/tween.js'
import { textureCache } from '@/components/WebGL/Shared/cache.js'
import fadeInOut from '@/components/WebGL/Mixins/FadeInOut'

import Bundle from '@/components/WebGL/Bundle'
import scroller from '@/components/WebGL/Mixins/scroller'

function cacheStuff () {
  textureCache.setCache(require('../ComicList/img/link/l-1.png'))
  textureCache.setCache(require('../ComicList/img/link/l-2.png'))
  textureCache.setCache(require('../ComicList/img/link/l-3.png'))
  textureCache.setCache(require('../ComicList/img/link/l-4.png'))

  textureCache.setCache(require('./img/link-active/la-1.png'))
  textureCache.setCache(require('./img/link-active/la-2.png'))
  textureCache.setCache(require('./img/link-active/la-3.png'))
  textureCache.setCache(require('./img/link-active/la-4.png'))
}

export default {
  name: 'ComicList',
  mixins: [fadeInOut, scroller],
  components: {
    ...Bundle
  },
  props: ['aspect'],
  created () {
    cacheStuff()
  },
  data () {
    return {
      TWEEN,
      mouseStack: {},
      execStack: {},
      tweening: false,
      raycaster: false,

      rAFID: 0,
      comics: {
        defaultXPos: 0,
        defaultYPos: 0,
        isDraggin: false,
        found: false,
        state: {
          status: 'ready',
          tsX: 0,
          tsY: 0,
          dX: 0,
          dY: 0,
          aX: 0,
          aY: 0
        }
      }
    }
  },
  watch: {
    params () {
      this.scrollerState.dY = 10
      setTimeout(() => {
        this.intro()
      }, 0)
    }
  },
  computed: {
    params () {
      return this.$route.params.id
    }
  },
  activated () {
    // this.$refs['comics-content']

    this.$emit('exec', () => {
      for (var execItem in this.execStack) {
        let exec = this.execStack[execItem]
        if (exec) {
          exec()
        }
      }
    })

    this.$emit('setMouse', (args) => {
      // this.mouseStack.scroller(args)
      // this.mouseStack.comics(args)
      for (var name in this.mouseStack) {
        let exec = this.mouseStack[name]
        if (exec) {
          // console.log(this.mouseStack)
          exec(args)
        }
      }
    })

    this.mouseStack.scroller = (args) => {
      if (!this.comics.isDraggin || Math.abs(this.comics.state.aY) > 3.0) {
        this.scrollEntry(args)
      }
    }

    this.rAF = () => {
      this.rAFID = window.requestAnimationFrame(this.rAF)
      var pos = this.$refs['comics-content'].object3d.position

      pos.x += this.comics.state.dX

      var needReset = false
      if (pos.x > 0) {
        let goal = -pos.x
        pos.x = pos.x + goal
        needReset = true
      }
      var currentComic = this.getCurrentComic()
      if (currentComic && currentComic.vmsObj) {
        var info = currentComic.readRectInfo
        if (pos.x < -(info.meshWidth * info.aspect - info.screenWidth)) {
          let goal = Math.abs(pos.x + (info.meshWidth * info.aspect - info.screenWidth))
          pos.x = pos.x + goal
          needReset = true
        }
      }

      if (!needReset) {
        this.comics.state.aX += this.comics.state.dX
        this.comics.state.aY += this.comics.state.dY
        this.comics.state.dX *= 0.96
        this.comics.state.dY *= 0.96
      } else {
        this.comics.state.dX = 0
        this.comics.state.dY = 0
      }
    }
    this.rAFID = window.requestAnimationFrame(this.rAF)

    var intro = this.intro = () => {
      var pos = this.$refs['comics-content'].object3d.position
      var currentComic = this.getCurrentComic()
      if (currentComic && currentComic.vmsObj) {
        var info = currentComic.readRectInfo
        pos.x = -(info.meshWidth * info.aspect + info.screenWidth)
      }
      setTimeout(() => {
        this.comics.state.dX = 5.5
      }, 100)
    }
    setTimeout(intro, 0)

    this.mouseStack.comics = (args) => {
      this.eventHandler(args)
    }

    this.setupScroller({
      target: this.$refs['page-content'],
      enable: { x: false, y: true },
      bound: this.scrollerState.bound
      // bound: {
      //   yMax: 50,
      //   yMin: 0,
      //   xMax: 0,
      //   xMin: 0
      // }
    })
  },
  deactivated () {
    this.cleanupScroller()
    this.mouseStack = {}
    this.execStack = {}
    window.cancelAnimationFrame(this.rAFID)
  },
  methods: {
    eventHandler (args) {
      switch (args.type) {
        case 'ts':
          this.onTS(args)
          break
        case 'tm':
          this.onTM(args)
          break
        case 'te':
          this.onTE(args)
          break

        case 'mdn':
          this.onTS(args)
          break
        case 'mup':
          this.onTE(args)
          break
        case 'mv':
          this.onTM(args)
          break
      }
    },
    // onGTS (v) {
    //   console.log(v)
    //   this.comics.found = v
    //   this.comics.isDraggin = true
    // },
    onTS ({ pageX, pageY, rect }) {
      var raycaster = this.getRayCaster()
      // raycaster.run = true
      this.comics.found = raycaster.raycastNow()
      if (this.comics.found.found[0] && this.comics.found.found[0].object.userData.$component.vms.indexOf('@comic-detail@comics@s-') === 0) {
        this.comics.isDraggin = true
      }

      this.comics.state.status = 'ts'
      this.comics.state.tsX = pageX - rect.left
      this.comics.state.tsY = pageY - rect.top
    },
    onTM ({ pageX, pageY, rect }) {
      if (!this.comics.isDraggin) {
        return
      }
      this.comics.state.status = 'tm'

      this.comics.state.dX = pageX - rect.left - this.comics.state.tsX
      this.comics.state.dY = pageY - rect.top - this.comics.state.tsY

      this.comics.state.tsX = pageX - rect.left
      this.comics.state.tsY = pageY - rect.top

      this.comics.state.dX *= 0.14
      this.comics.state.dY *= 0.14
    },
    onTE () {
      this.comics.isDraggin = false
    },
    getCurrentComic () {
      return this.$refs['s-' + this.$route.params.id]
    },
    getRayCaster () {
      return this.$parent.$parent.raycaster
    },
    goComics (id) {
      this.$router.push({ path: '/nike/game/comic-detail/' + id })
    },
    isAtPage (page) {
      return page + '' === this.$route.params.id + ''
    },
    __add (v) {
      this.$parent.scene.add(v)
    },
    __remove (v) {
      this.$parent.scene.remove(v)
    }
  }
}
</script>

<style scoped>

</style>
