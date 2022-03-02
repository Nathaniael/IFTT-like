// Extern modules
import React, { Component } from "react";
import * as THREE from "three";

// My modules
import { addParticules, texturesParticules } from "./Particules";

// Styles
import styles from './styles/HomeThree.module.css'


// Setup initial camera pos (the camera is fixed in the scene)
function setCameraPos(camera: THREE.PerspectiveCamera, posZ: number, posY: number, posX: number) {
    camera.position.z = posZ
    camera.position.y = posY
    camera.position.x = posX
}

// Loop to create a particule and lines system for each existing textures of particules, add group to scene
function particulesCreation(particulesCount: number, distance: number, scene: THREE.Scene, group: THREE.Group) {
  // Init ressources
  const positions = new Float32Array(particulesCount * 3)
  const textureLoader = new THREE.TextureLoader()

  // Loop add particules
  for (let i = 0; i < texturesParticules().length; i++) {
    addParticules(group, positions, distance, i, textureLoader)
  }

  // Add to scene
  scene.add(group)
}


// Component
export default class HomeTree extends Component {
    mount: any;
    componentDidMount() {
        var scene = new THREE.Scene()

        // Setup
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
        setCameraPos(camera, 1, 0, 0)

        // Creation of particules system
        const groupParticules = new THREE.Group()
        particulesCreation(50, 4, scene, groupParticules)

        // Renderer
        var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.mount.appendChild(renderer.domElement);
        const clock = new THREE.Clock()

        window.addEventListener('resize', () => {
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
          renderer.setSize(window.innerWidth, window.innerHeight)
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })
        function tick() {
            requestAnimationFrame(tick)
            const time = clock.getElapsedTime()
            groupParticules.rotation.y = 0.1 * time
            renderer.render(scene, camera)
        }
        tick()
      }
    componentWillUnmount() {
      this.mount = null
    }
    render() {
        return <div className={styles.homeThree} ref={ref => (this.mount = ref)} />;
    }
}