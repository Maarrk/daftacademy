const visibleHeightAtZDepth = require("../utils.js").visibleHeightAtZDepth;
const visibleWidthAtZDepth = require("../utils.js").visibleWidthAtZDepth;
const lerp = require("../utils.js").lerp;
const prevSlide = require("./main.js").prevSlide;
const nextSlide = require("./main.js").nextSlide;

const raycaster = new THREE.Raycaster()
const objLoader = new THREE.OBJLoader()
let arrowBoxes = []
let arrowBoxRotations = [0, 0]

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight)

const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)

document.body.append(renderer.domElement)

objLoader.load(
    'models/cube.obj',
    ({children}) => {
      const screenBorderRight = visibleWidthAtZDepth(-10, camera) / 2
      const screenBottom = -visibleHeightAtZDepth(-10, camera) / 2

      addCube(children[0], prevSlide, screenBorderRight - 2.5, screenBottom + 1, -1)
      addCube(children[0], nextSlide, screenBorderRight - 1.5, screenBottom + 1, 1)

      animate()
    }
)

const addCube = (object, callbackFn, x, y, direction) => {
  const cubeMesh = object.clone()

  cubeMesh.scale.setScalar(.3)
  if(direction < 0) {
    cubeMesh.rotation.set(THREE.Math.degToRad(90), THREE.Math.degToRad(180), 0)
  } else {
    cubeMesh.rotation.set(THREE.Math.degToRad(90), 0, 0)
  }
  

  const boundingBox = new THREE.Mesh(
      new THREE.BoxGeometry(.7, .7, .7),
      new THREE.MeshBasicMaterial({transparent: true, opacity: 0})
  )

  boundingBox.position.x = x
  boundingBox.position.y = y
  boundingBox.position.z = -10

  boundingBox.add(cubeMesh)

  boundingBox.callbackFn = callbackFn

  arrowBoxes.push(boundingBox)
  scene.add(boundingBox)
}

const animate = () => {
  for (let index = 0; index < arrowBoxes.length; index++) {
    const arrowBox = arrowBoxes[index];
    arrowBoxRotations[index] = lerp(arrowBoxRotations[index], 0, .07)
    arrowBox.rotation.set(THREE.Math.degToRad(arrowBoxRotations[index]), 0, 0) 
  }

  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

export const handleThreeAnimation = (index, direction) => {
  arrowBoxRotations[index] = 360 * Math.sign(direction)
}

window.addEventListener('click', () => {
  const mousePosition = new THREE.Vector2()
  mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1
  mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1

  raycaster.setFromCamera(mousePosition, camera)

  const intersectedObjects = raycaster.intersectObjects(arrowBoxes)
  intersectedObjects.length && intersectedObjects[0].object.callbackFn()
})