import React from 'react';
import NavBar from './NavBar';
import './App.css';

import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';



function About() {
    const refContainer = useRef(null);
  useEffect(() => {
    // === THREE.JS CODE START ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight - 50), 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight - 50);
    // use ref as a mount point of the Three.js scene instead of the document.body
    refContainer.current && refContainer.current.appendChild( renderer.domElement );
    
    var material =  new THREE.LineBasicMaterial({color: 0x66ff00});

    const ambLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambLight);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 2);
    scene.add(light);

    camera.position.z = 5;

    window.addEventListener('resize', function() {
        var width = window.innerWidth;
        var height = window.innerHeight - 50;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

    var controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    const loader = new GLTFLoader();

    loader.load( './avi_body.glb', function ( gltf ) {
        gltf.scene.scale.set(2, 2, 2);
        gltf.scene.position.y = -1.5;
        gltf.scene.name = "aaron";
        scene.add( gltf.scene );
    }, undefined, function ( error ) {
    
        console.error( error );
    
    } );


    const textLoader = new FontLoader();
    textLoader.load('helvetiker_regular.typeface.json', function (font) {
        const textGeometry = new TextGeometry("182cm", {
            font: font,
            size: 0.2,
            depth: 0.1
        });
        const textMesh = new THREE.Mesh(textGeometry, [
            new THREE.MeshPhongMaterial({color: 0x66ff00}),
            new THREE.MeshPhongMaterial({color: 0x0ab30a})
        ]);
        textMesh.position.set(1.6, -1.25, 0);
        textMesh.name = "heightText";
        scene.add(textMesh);


        const textGeometry2 = new TextGeometry("185cm", {
            font: font,
            size: 0.2,
            depth: 0.1
        });
        const textMesh2 = new THREE.Mesh(textGeometry2, [
            new THREE.MeshPhongMaterial({color: 0x66ff00}),
            new THREE.MeshPhongMaterial({color: 0x0ab30a})
        ]);
        textMesh2.position.set(-2.5, -0.75, 0);
        textMesh2.name = "wSpanText";
        scene.add(textMesh2);


        const statsText = "name: aaron\n" +
                            "weight: 72.66kg\n" + 
                            "age: 26\n" + 
                            "location: california, usa";
        const textGeometry3 = new TextGeometry(statsText, {
            font: font,
            size: 0.2,
            depth: 0.1
        });
        const textMesh3 = new THREE.Mesh(textGeometry3, [
            new THREE.MeshPhongMaterial({color: 0x66ff00}),
            new THREE.MeshPhongMaterial({color: 0x0ab30a})
        ]);
        textMesh3.position.set(2.5, 2.25, 0);
        textMesh3.name = "statsText";
        scene.add(textMesh3);


        const contactText = "contact: p.aaron.giroux@gmail.com";
        const textGeometry4 = new TextGeometry(contactText, {
            font:font,
            size: 0.15,
            depth: 0.1
        });
        const textMesh4 = new THREE.Mesh(textGeometry4, [
            new THREE.MeshPhongMaterial({color: 0xffff00}),
            new THREE.MeshPhongMaterial({color: 0xa9a913})
        ]);
        textMesh4.position.set(-1.65, -1.7, 1.5);
        textMesh4.name = "contactText";
        scene.add(textMesh4);
        
    });


    // line & line2 are for height 
    const points = [];
    var secretPoint = new THREE.Vector3( 1, -0.3, -0.2);
    points.push( new THREE.Vector3( 0.5, 2.3, -0.2 ) );
    points.push( new THREE.Vector3( 1, 2.3, -0.2 ) );
    points.push( secretPoint);
    points.push( new THREE.Vector3( 1, -1.6, -0.2 ) );
    points.push( new THREE.Vector3( 0.5, -1.6, -0.2 ) );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );

    const line = new THREE.Line( geometry, material );
    scene.add( line );
    
    var points2 = [];
    points2.push(secretPoint);
    points2.push(new THREE.Vector3(2, -1, 0));
    var geometry2 = new THREE.BufferGeometry().setFromPoints( points2 );
    const line2 = new THREE.Line(geometry2, material);
    scene.add(line2);

    // line 3 & line 4 are for wingspan
    points.splice(0, points.length);
    points.push(new THREE.Vector3(-1.8, 1.4, 0.3));
    points.push(new THREE.Vector3(-1.8, 1.1, 0.3));
    points.push(new THREE.Vector3(-1.2, 1.1, 0.3));
    points.push(new THREE.Vector3(1.8, 1.1, 0.3));
    points.push(new THREE.Vector3(1.8, 1.4, 0.3));
    geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line3 = new THREE.Line(geometry, material);
    scene.add(line3);

    var points3 = [];
    points3.push(new THREE.Vector3(-1.2, 1.1, 0.3));
    points3.push(new THREE.Vector3(-2, -0.5, 0));
    const geometry3 = new THREE.BufferGeometry().setFromPoints( points3 );
    const line4 = new THREE.Line(geometry3, material);
    scene.add(line4);



    
    
    var scaleCounter = 0;

    var animate = function () {
      requestAnimationFrame(animate);
      scaleCounter = scaleCounter % 360 + 1;

      var scale = 1 + Math.sin(scaleCounter * Math.PI / 180) * 0.1;
    //   scene.rotation.x += 0.01;
      var aaronModel = scene.getObjectByName("aaron");
      var heightText = scene.getObjectByName("heightText");
      var spanText = scene.getObjectByName("wSpanText");

      if (aaronModel === undefined) {
        console.log("not yet loaded");
      } else {
        aaronModel.rotation.y -= 0.03;
        line.rotation.y -= 0.03;
        line3.rotation.y -= 0.03;
        heightText.scale.set(scale, scale, scale);
        spanText.scale.set(scale, scale, scale);


        var line1Poss = line.geometry.getAttribute("position");
        var vtx = new THREE.Vector3();
        vtx.fromBufferAttribute(line1Poss, 2);
        vtx.applyMatrix4(line.matrixWorld)

        points2[0] = vtx
        line2.geometry = new THREE.BufferGeometry().setFromPoints( points2 );

        var line3Poss = line3.geometry.getAttribute("position");
        var vtx2 = new THREE.Vector3();
        vtx2.fromBufferAttribute(line3Poss, 2);
        vtx2.applyMatrix4(line3.matrixWorld)

        points3[0] = vtx2
        line4.geometry = new THREE.BufferGeometry().setFromPoints( points3 );
      }
      renderer.render(scene, camera);
      controls.update();
    };
    animate();
  }, []);
  return (
    <div>
        <NavBar/>
        <div ref={refContainer}></div>
    </div>
  );
}


export default About;