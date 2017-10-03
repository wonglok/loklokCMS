/* dis-eslint-disable */

import * as THREE from 'three'
import GPUComputationRenderer from '@/components/WebGL/Shared/GUPComputataionRenderer'

import particleVelocityShader from 'raw-loader!./ParticleShader/velocityShader.frag'
import particlePositionShader from 'raw-loader!./ParticleShader/positionShader.frag'

import particleVertexShader from 'raw-loader!./ParticleShader/vertexShader.vert'
import particleFragmentShader from 'raw-loader!./ParticleShader/fragmentShader.frag'

export default function () {
  var api = {}

  var WIDTH = 256
  var BOUNDS = 128

  var gpuCompute
  var positionVariable
  var particleShader

  function fillTexture (texture) {
    // var waterMaxHeight = 10
    // function noise(x, y, z) {
    //   var multR = waterMaxHeight
    //   var mult = 0.025
    //   var r = 0
    //   for (var i = 0; i < 15; i++) {
    //     r += multR * simplex.noise(x * mult, y * mult)
    //     multR *= 0.53 + 0.025 * i
    //     mult *= 1.25
    //   }
    //   return r
    // }
    var pixels = texture.image.data
    var p = 0
    for (var j = 0; j < WIDTH; j++) {
      for (var i = 0; i < WIDTH; i++) {
        var x = (WIDTH / 2 - i) * 128 / WIDTH
        var y = (WIDTH / 2 - j) * 128 / WIDTH

        pixels[ p + 0 ] = x
        pixels[ p + 1 ] = y

        pixels[ p + 2 ] = 0// noise(Math.sin(x), Math.sin(y), 0.0)
        // pixels[ p + 1 ] = 0
        // pixels[ p + 2 ] = 0
        pixels[ p + 3 ] = 0
        p += 4
      }
    }
  }

  function setupCompute ({ renderer }) {
    gpuCompute = new GPUComputationRenderer(WIDTH, WIDTH, renderer)

    var positionTexture = gpuCompute.createTexture()
    fillTexture(positionTexture)
    positionVariable = gpuCompute.addVariable('positionInfo', particlePositionShader, positionTexture)

    var velocityTexture = gpuCompute.createTexture()
    var velocityVariable = gpuCompute.addVariable('velocityInfo', particleVelocityShader, velocityTexture)
    velocityVariable.material.defines.BOUNDS = BOUNDS.toFixed(1)
    velocityVariable.wrapS = THREE.ClampToEdgeWrapping
    velocityVariable.wrapT = THREE.ClampToEdgeWrapping
    velocityVariable.material.uniforms.mousePos = {
      value: new THREE.Vector2(0, 0)
    }

    api.setMouse = ({ pageX, pageY, rect, isIn, type }) => {
      var mouse = velocityVariable.material.uniforms.mousePos.value
      if (rect && typeof pageX !== 'undefined' && typeof pageY !== 'undefined') {
        mouse.x = ((pageX - rect.left) / rect.width) * 2 - 1
        mouse.y = -((pageY - rect.top) / rect.height) * 2 + 1
        // console.log(mouse)
      }
    }

    gpuCompute.setVariableDependencies(positionVariable, [positionVariable, velocityVariable])
    gpuCompute.setVariableDependencies(velocityVariable, [positionVariable, velocityVariable])

    var error = gpuCompute.init()
    if (error !== null) {
      console.error(error)
    }
    return {}
  }

  function setupScene () {
    var material = particleShader = new THREE.ShaderMaterial({
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      uniforms: {
        positionInfo: {
          value: null
        }
      },
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader // THREE.ShaderChunk[ 'meshphong_frag' ]
    })

    material.defines.WIDTH = WIDTH.toFixed(1)
    material.defines.BOUNDS = BOUNDS.toFixed(1)

    var geometry = new THREE.PlaneBufferGeometry(BOUNDS, BOUNDS, WIDTH - 1, WIDTH - 1)
    var points = new THREE.Points(geometry, material)
    // points = new THREE.Points( geometry, material );
    // points.rotation.x = -Math.PI / 2 * 0;
    points.matrixAutoUpdate = false
    points.updateMatrix()

    return {
      points
    }
  }

  function setup ({ renderer }) {
    return {
      ...setupCompute({ renderer }),
      ...setupScene()
    }
  }
  api.setup = setup

  function render () {
    // @.@
    particleShader.uniforms.positionInfo.value = gpuCompute.getCurrentRenderTarget(positionVariable).texture
    gpuCompute.compute()
  }
  api.render = render

  return api
}
