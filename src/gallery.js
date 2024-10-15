import React from 'react';

import { useEffect, useRef } from "react";
import * as THREE from 'three';
import Chat from './Chat';

import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

function Gallery() {
    const refContainer = useRef(null);
    useEffect(() => {
        let speed = 50.0;

        let moveForward = false;
        let moveBackward = false;
        let moveLeft = false;
        let moveRight = false;

        let prevTime = performance.now();
        const velocity = new THREE.Vector3();
        const direction = new THREE.Vector3();

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setAnimationLoop( animate );
        renderer.shadowMap.enabled = true;

        refContainer.current && refContainer.current.appendChild( renderer.domElement );

        var cubeMaterial = new THREE.MeshPhongMaterial({color:0x66ff00});
        var cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.castShadow = true;
        scene.add(cube);

        var cube2 = new THREE.Mesh(
            new THREE.BoxGeometry(2,2,2),
            new THREE.MeshPhongMaterial({color: 0xff0000}) 
        );
        cube2.position.set(-3, 0.5, -10);
        cube2.castShadow = true;

        var cube2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
        cube2BB.setFromCenterAndSize(
            cube2.position,
            new THREE.Vector3(4,4,4)
        );
        console.log(cube2BB);
        scene.add(cube2);

        
        

        let plane1 = new THREE.Mesh(
            new THREE.PlaneGeometry(100,100),
            new THREE.MeshStandardMaterial({color: 0xc5c5c4 })
          );
          plane1.position.set(0, -0.5, 0);
          plane1.rotateX(-Math.PI / 2);
          plane1. receiveShadow = true;
          scene.add(plane1);   

        camera.position.z = 5;
        camera.position.y = 0.75;

        var camBB = new THREE.Box3(
            new THREE.Vector3(camera.position.x + 0.25, camera.position.y + 0.25, camera.position.z + 0.25),
            new THREE.Vector3(camera.position.x - 0.25, camera.position.y - 0.75, camera.position.z - 0.25),
        );

        const ambLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambLight);

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 2);
        light.castShadow = true;
        scene.add(light);

        const controls = new PointerLockControls( camera, document.getElementById("gameWindow") );

        const blocker = document.getElementById( 'blocker' );
        const instructions = document.getElementById( 'instructions' );
        const chatBox = document.getElementById( 'chatWrapper' );
        
        var displayChat = false;
        chatBox.style.display = 'none';

        instructions.addEventListener( 'click', function() {
            controls.lock()
        });

        controls.addEventListener( 'lock', function () {

            instructions.style.display = 'none';
            blocker.style.display = 'none';
            chatBox.style.display = 'none';

        } );

        controls.addEventListener( 'unlock', function () {
            if (displayChat) {
                chatBox.style.display = '';
                document.getElementById("chatInput").focus();
            } else {
                blocker.style.display = 'block';
                instructions.style.display = '';
            }
            
        } );

        scene.add(controls.object);

        const onKeyDown = function (event) {
            switch (event.code) {
                case 'ArrowUp':
                case 'KeyW':
                    moveForward = true;
                    break;
                
                case 'ArrowLeft':
                case 'KeyA':
                    moveLeft = true;
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    moveBackward = true;
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    moveRight = true;
                    break;
                
                case 'ShiftLeft':
                    camera.position.y = 0.5;
                    speed = 100.0;
                    break;
                
                case 'ControlLeft':
                    if (displayChat) {
                        displayChat = false;
                        controls.lock();
                    } else {
                        displayChat = true;
                        controls.unlock();
                    }
                    break;

                default: 
                    console.log(event.code);
                    break;

            }
        };

        const onKeyUp = function (event) {
            switch (event.code) {
                case 'ArrowUp':
                case 'KeyW':
                    moveForward = false;
                    break;
                
                case 'ArrowLeft':
                case 'KeyA':
                    moveLeft = false;
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    moveBackward = false;
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    moveRight = false;
                    break;

                case 'ShiftLeft':
                    camera.position.y = 0.75
                    speed = 50.0;
                    break;
            }
        };

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);

        var animate = function () {
            const time = performance.now();
            if (controls.isLocked === true) {
                const delta = (time - prevTime) / 1000;
                velocity.x -= velocity.x * speed * delta;
                velocity.z -= velocity.z * speed * delta;

                direction.z = Number(moveForward) - Number(moveBackward);
                direction.x = Number(moveRight) - Number(moveLeft);
                direction.normalize();

                if (moveForward || moveBackward) {
                    velocity.z -= direction.z * 400.0 * delta;
                }
                if (moveLeft || moveRight) {
                    velocity.x -= direction.x * 400.0 * delta;
                }
                

                controls.moveRight(-velocity.x * delta);
                controls.moveForward(-velocity.z * delta);

                camBB.set(
                    new THREE.Vector3(camera.position.x + 0.75, camera.position.y + 0.25, camera.position.z + 0.75),
                    new THREE.Vector3(camera.position.x - 0.75, camera.position.y - 0.75, camera.position.z - 0.75),
                );

                if (checkCollisions()) {
                    controls.moveRight(velocity.x * delta);
                    controls.moveForward(velocity.z * delta);

                    camBB.set(
                        new THREE.Vector3(camera.position.x + 0.75, camera.position.y + 0.5, camera.position.z + 0.75),
                        new THREE.Vector3(camera.position.x - 0.75, camera.position.y - 0.5, camera.position.z - 0.75),
                    );
                }
                
            }

            requestAnimationFrame(animate);

	        renderer.render( scene, camera );
            prevTime = time;
        };
        
        animate();

        var checkCollisions = function () {
            if (camBB.intersectsBox(cube2BB)) {
                console.log("intersect");
                return true;
            }
            return false;
        };

    }, []);
    return (
        <div id="gameWindow">
            <div id="chatWrapper">
                <Chat></Chat>
            </div>
            <div id="blocker">
                <div id="instructions">
                    <p>
                        Click to play
                    </p>
                    <p>
                        Move: WASD<br/>
                        Jump: SPACE<br/>
                        Look: MOUSE<br/>
                        Chat: LEFT-CONTROL
                    </p>
                </div>
		    </div>

            <div ref={refContainer}></div>
        </div>
        
    );
}

export default Gallery;