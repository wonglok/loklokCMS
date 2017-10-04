/* dis-eslint-disable */

import * as THREE from 'three'

export default function () {
  var api = {}

  function setupScene ({ rect }) {
    var geometry = new THREE.SphereBufferGeometry(70, 128, 128)

    var shaderMaterial = api.material = new THREE.ShaderMaterial({
      transparent: true,
      depthTest: true,
      blending: THREE.AdditiveBlending,
      uniforms: {
        pointSize: { value: window.devicePixelRatio * 1.35 || 1.0 },
        wood: { value: new THREE.TextureLoader().load(require('./Texture/broken-glass.jpg')) },
        time: { value: 1.0 },
        resolution: { value: new THREE.Vector2() },
        mousePos: { value: new THREE.Vector2() }
      },
      vertexShader: require('raw-loader!./WoodyShader/vertexShader.vert'),
      fragmentShader: require('raw-loader!./WoodyShader/fragmentShader.frag')
    })

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
    api.updateRect({ rect })

    api.updateTime = () => {
      shaderMaterial.uniforms.time.value = (window.performance.now() * 0.0001) % 10.0
    }

    var points = new THREE.Points(geometry, shaderMaterial)
    return {
      points
    }
  }

  function setup ({ renderer, rect }) {
    return {
      ...setupScene({ rect })
    }
  }
  api.setup = setup

  function render () {
    api.updateTime()
  }
  api.render = render

  return api
}
