import * as THREE from 'three'
export const textureCache = {
  cache: {},
  setCache (link) {
    var cachedItem = textureCache.cache[link]
    if (!cachedItem) {
      textureCache.cache[link] = new THREE.TextureLoader().load(link)
      textureCache.cache[link].needsUpdate = true
    }
  },
  getTexture (link) {
    textureCache.setCache(link)
    return textureCache.cache[link]
  }
}
