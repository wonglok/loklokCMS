import * as THREE from 'three'
import axios from 'axios'
export const textureCache = {
  cache: {},
  setCache (link) {
    var cachedItem = textureCache.cache[link]
    if (!cachedItem) {
      textureCache.cache[link] = new THREE.TextureLoader().load(link, (texture) => {
        textureCache.cache[link].needsUpdate = true
      })
    }
  },
  getTexture (link) {
    textureCache.setCache(link)
    return textureCache.cache[link]
  }
}

export const preLoad = (links) => {
  return new Promise((resolve, reject) => {
    var loaded = 0
    links.map((link) => {
      textureCache.cache[link] = new THREE.TextureLoader().load(link, (texture) => {
        textureCache.cache[link].needsUpdate = true
        loaded++
        var currentVal = loaded / links.length
        // if (progress) {
        //   progress(currentVal)
        // }
        if (currentVal === 1) {
          resolve()
          // window.requestAnimationFrame(done)
        }
      })
      return {
        texture: textureCache.cache[link],
        link
      }
    })
  })
}

export function getFonts () {
  return fontLinks.map((link) => {
    return axios.get(link)
  })
}

export const fontLinks = [
  require('@/components/NikeWebGL/Fonts/DinCondense/regular.otf'),
  require('@/components/NikeWebGL/Fonts/DinCondense/medium.otf'),
  require('@/components/NikeWebGL/Fonts/Futura/condensed-medium.ttf')
]

export const homeLinks = [
  require('@/components/NikeWebGL/Pages/BoxingCamp/img/bg/boxing.jpg'),
  require('@/components/NikeWebGL/Pages/BoxingCamp/img/button-area/button-area.png'),
  require('@/components/NikeWebGL/Pages/BoxingCamp/img/button-area/enter-now.png'),
  require('@/components/NikeWebGL/Pages/BoxingCamp/img/button-area/watch-comics.png'),
  require('@/components/NikeWebGL/Pages/BoxingCamp/img/hero/camp.png'),
  require('@/components/NikeWebGL/Pages/BoxingCamp/img/hero/nike-boxing.png')
]

export const menuLinks = [
  require('@/components/NikeWebGL/element/Menu/img/items/boxing-camp.png'),
  require('@/components/NikeWebGL/element/Menu/img/items/comics.png'),
  require('@/components/NikeWebGL/element/Menu/img/items/home.png'),
  require('@/components/NikeWebGL/element/Menu/img/items/rewards.png'),
  require('@/components/NikeWebGL/element/Menu/img/items/rules.png')
]
