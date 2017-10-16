import * as THREE from 'three'
export const textureCache = {
  cache: {},
  getTexture (link) {
    var cachedItem = textureCache.cache[link]
    if (!cachedItem) {
      textureCache.cache[link] = new THREE.TextureLoader().load(link)
    }
    return textureCache.cache[link]
  }
}
