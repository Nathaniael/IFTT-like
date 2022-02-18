import React, { Component } from "react";
import * as THREE from "three";
import { Group } from "three";
import styles from './HomeThree.module.css'
import { addParticules, texturesParticules } from "./Particules";

function setCameraPos(camera, posZ, posY, posX) {
    camera.position.z = posZ
    camera.position.y = posY
    camera.position.x = posX
}

function particulesCreation(particulesCount, distance, scene, group) {
  const positions = new Float32Array(particulesCount * 3)
  const textureLoader = new THREE.TextureLoader()

  for (let i = 0; i < texturesParticules().length; i++) {
    addParticules(group, positions, distance, i, textureLoader)
  }
  scene.add(group)
}

export default class HomeTree extends Component {
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
    render() {
        return <div className={styles.homeThree} ref={ref => (this.mount = ref)} />;
    }
}