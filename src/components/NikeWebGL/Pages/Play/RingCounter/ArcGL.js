import arcCanvasMaker from './arcCanvas'
import * as THREE from 'three'
export default function setupArcScene (scene, camera) {
  var api = {}
  var engine = arcCanvasMaker()
  var percentage = 0
  var texture = new THREE.CanvasTexture(
    engine.canvas,
    THREE.UVMapping,
    THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping,
    THREE.LinearFilter,
    THREE.LinearMipMapLinearFilter
  )

  // var aspect = 1.0
  // if (camera.aspect < 1.0) {
  //   aspect = camera.aspect
  // }

  var plane = new THREE.PlaneGeometry(50, 50, 2, 2)
  var planeMaterial = new THREE.MeshBasicMaterial({
    transparent: true,
    map: texture
  })
  var planeMesh = new THREE.Mesh(plane, planeMaterial)
  planeMesh.position.z = 0.0
  planeMesh.position.y = -25.0

  planeMesh.visible = false
  scene.add(planeMesh)

  api.update = (per) => {
    percentage = per
    engine.draw(percentage)
    texture.needsUpdate = true
  }

  // api.render = () => {
  //   // if (texture.needsUpdate) {
  //     // engine.draw(percentage);
  //   // }
  // }

  api.setVisibility = (v) => {
    planeMesh.visible = v
  }

  // api.update(0.1)
  return api
}
