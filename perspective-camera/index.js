import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper(200);
// scene.add(axesHelper);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const camera2 = new THREE.PerspectiveCamera(20, 16 / 9, 100, 300);
const camera2Helper = new THREE.CameraHelper(camera2);
scene.add(camera2Helper);

// fov：影响可视范围角度、离物体远近
// aspect：可视范围宽高比，一般设置网页宽高比
// near：近裁截面距离，一般保持默认值 0.1，当你需要截掉一些特别近的物体的时候，把它加大
// far：远裁截面距离，如果有的物体被裁截掉看不到了，就需要调大 far 把它们包含进来
const gui = new GUI();
function onChange() {
    camera2.updateProjectionMatrix();
    camera2Helper.update();
}
gui.add(camera2, 'fov', 10, 60).onChange(onChange);
gui.add(camera2, 'aspect', 0.1, 3).onChange(onChange);
gui.add(camera2, 'near', 0, 300).onChange(onChange);
gui.add(camera2, 'far', 300, 800).onChange(onChange);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height)

function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);