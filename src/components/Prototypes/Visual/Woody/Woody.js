/* dis-eslint-disable */

import * as THREE from 'three'

export default function () {
  var api = {}

  function setupScene ({ rect }) {
    var geometry = new THREE.SphereBufferGeometry(70, 90, 90)

    var shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        pointSize: { value: window.devicePixelRatio || 1.0 },
        wood: { value: new THREE.TextureLoader().load(require('./Texture/wood.jpg')) },
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
  }
  api.render = render

  return api
}
