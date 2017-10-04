import PerspectiveCamera from './Components/PerspectiveCamera'
import WebGLRenderer from './Components/WebGLRenderer'
import Scene from './Components/Scene'
import Mesh from './Components/Mesh'
import Points from './Components/Points'
import Raycaster from './Components/Raycaster'
import Object3D from './Components/Object3D'

import MeshPhongMaterial from './Material/MeshPhongMaterial'
import MeshBasicMaterial from './Material/MeshBasicMaterial'
import PointsMaterial from './Material/PointsMaterial'

import PlaneGeometry from './Geometry/PlaneGeometry'
import BoxGeometry from './Geometry/BoxGeometry'
import SphereGeometry from './Geometry/SphereGeometry'

import PointLight from './Light/PointLight'

import ImageMesh from './Custom/ImageMesh'

export default {
  ImageMesh,

  Object3D,

  Raycaster,
  Points,
  SphereGeometry,
  PointLight,
  BoxGeometry,
  PlaneGeometry,

  Mesh,
  MeshPhongMaterial,
  MeshBasicMaterial,

  PointsMaterial,
  PerspectiveCamera,
  WebGLRenderer,
  Scene
}
