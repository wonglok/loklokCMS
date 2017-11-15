import * as THREE from 'three'
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

var links = [
  require('@/components/NikeWebGL/Pages/BoxingCamp/img/bg/boxing.jpg'),
  require('@/components/NikeWebGL/Pages/BoxingCamp/img/button-area/button-area.png'),
  require('@/components/NikeWebGL/Pages/BoxingCamp/img/button-area/enter-now.png'),
  require('@/components/NikeWebGL/Pages/BoxingCamp/img/button-area/watch-comics.png'),
  require('@/components/NikeWebGL/Pages/BoxingCamp/img/hero/camp.png'),
  require('@/components/NikeWebGL/Pages/BoxingCamp/img/hero/nike-boxing.png')
]

export const preLoad = (done, progress) => {
  var loaded = 0
  links.map((link) => {
    textureCache.cache[link] = new THREE.TextureLoader().load(link, (texture) => {
      textureCache.cache[link].needsUpdate = true
      loaded++
      var currentVal = loaded / links.length
      if (progress) {
        progress(currentVal)
      }
      if (currentVal === 1) {
        window.requestAnimationFrame(done)
      }
    })
    return {
      texture: textureCache.cache[link],
      link
    }
  })
}
