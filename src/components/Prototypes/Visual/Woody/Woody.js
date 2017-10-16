/* dis-eslint-disable */

import * as THREE from 'three'

export default function () {
  var api = {}

  function setupScene ({ rect, position }) {
    var geometry = new THREE.SphereBufferGeometry(70, 125, 125)
    // var geometry = new THREE.BoxBufferGeometry(70, 70, 70, 128, 128, 128)
    var vertIndex = new Float32Array(geometry.attributes.position.count)
    for (var i = 0; i < vertIndex.length; i++) {
      vertIndex[i] = i
    }
    geometry.addAttribute('vertIndex', new THREE.BufferAttribute(vertIndex, 1))

    var shaderMaterial = api.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      depthTest: true,
      blending: THREE.NormalBlending,
      uniforms: {
        pointSize: { value: window.devicePixelRatio * 1.0 || 1.0 },
        wood: { value: new THREE.TextureLoader().load(require('./Texture/broken-glass.jpg')) },
        ball: { value: new THREE.TextureLoader().load(require('./Texture/circle-red@2x.png')) },
        time: { value: 1.0 },
        opacity: { value: 1.0 },
        resolution: { value: new THREE.Vector2() },
        mousePos: { value: new THREE.Vector2() }
      },
      vertexShader: require('raw-loader!./WoodyShader/vertexShader.vert'),
      fragmentShader: require('raw-loader!./WoodyShader/fragmentShader.frag')
    })

    api.setPosition = ({ position }) => {
      if (api.points && position) {
        api.points.position.set(position.x, position.y, position.z)
      }
    }

    api.setMouse = ({ pageX, pageY, rect, isIn, type }) => {
      var mouse = shaderMaterial.uniforms.mousePos.value
      if (rect && typeof pageX !== 'undefined' && typeof pageY !== 'undefined') {
        mouse.x = ((pageX - rect.left) / rect.width) * 2 - 1
        mouse.y = -((pageY - rect.top) / rect.height) * 2 + 1
        // console.log(mouse)
      }
    }

    api.updateRect = ({ rect }) => {
      if (rect) {
        shaderMaterial.uniforms.resolution.set(rect.width, rect.height)
      }
    }

    api.updateTime = () => {
      shaderMaterial.uniforms.time.value = (window.performance.now() * 0.0001) % 10.0
    }

    var points = api.points = new THREE.Points(geometry, shaderMaterial)
    points.$skipRayCaster = true
    api.updateRect({ rect })
    api.setPosition({ position })
    return {
      points
    }
  }

  function setup ({ renderer, rect, position }) {
    return {
      ...setupScene({ rect, position })
    }
  }
  api.setup = setup

  function render () {
    api.updateTime()
  }
  api.render = render

  return api
}
