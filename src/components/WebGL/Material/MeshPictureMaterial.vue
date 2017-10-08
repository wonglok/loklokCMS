<script>
import * as THREE from 'three'
export default {
  abstract: true,
  render () {
    return null
  },
  props: {
    image: {},
    color: {
      type: Number
    },
    opacity: {
      type: Number,
      default: 1.0
    },
    blending: {
      default () {
        return THREE.AdditiveBlending
        // return null
      }
    }
  },
  data () {
    return {
      material: null
    }
  },
  created () {
    this.material = new THREE.ShaderMaterial({
      transparent: true,
      // blending: THREE.AdditiveBlending,
      blending: THREE.NormalBlending,
      depthTest: false,
      uniforms: {
        image: { value: new THREE.TextureLoader().load(this.image) },
        opacity: { value: this.opacity }
      },
      vertexShader: `
        varying vec2 vUv;
        void main ( void ) {
          vUv = uv;
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          vec4 outputPos = projectionMatrix * mvPosition;
          gl_Position = outputPos;
        }
      `,
      fragmentShader: `
        uniform sampler2D image;
        varying vec2 vUv;
        uniform float opacity;
        void main () {
          vec4 finalColor = texture2D(image, vUv);
          if (finalColor.a < 0.1) {
            discard;
          } else {
            finalColor.a *= opacity;
            gl_FragColor = finalColor;
          }
        }
      `
    })
    // this.material
    this.$emit('material', this.material)
  },
  watch: {
  },
  mounted () {
    this.$parent.__add(this.material, 'material')
  },
  beforeDestroy () {
    this.$parent.__remove(this.material, 'material')
  }
}
</script>

<style scoped>
.mesh-phong-material{
  display: none;
}
</style>
