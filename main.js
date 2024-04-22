import * as THREE from 'three';
//import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
//import { TextureLoader } from 'three/addons/loaders/TextureLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'


/* This code was derived from the three.js fundamentals guide
*/

function main() {

	const canvas = document.querySelector( '#c' );
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );

	const fov = 100;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 5;
	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.z = 4;

    const scene = new THREE.Scene();

	{

		const color = 0xFFFFFF;
		const intensity = 3;
		const light = new THREE.DirectionalLight( color, intensity );
		light.position.set( - 1, 0, 30 );
		scene.add( light );

	}
    
    // instantiate a loader
    const gltfLoader = new GLTFLoader();
    const texLoader = new THREE.TextureLoader();
    const cubeLoader = new THREE.CubeTextureLoader();

    gltfLoader.load('stove.gltf', function(gltf){

        scene.add(gltf.scene);
        gltf.scene.rotation.y = -45;
        gltf.scene.rotation.z = -.3
        gltf.scene.position.y = -2;

    });

    const textureCube = [
        new THREE.MeshStandardMaterial({
            map: texLoader.load("brick.jpg"),
        }),
        new THREE.MeshStandardMaterial({
            map: texLoader.load("brick.jpg"),
        }),
        new THREE.MeshStandardMaterial({
            map: texLoader.load("brick.jpg"),
        }),
        new THREE.MeshStandardMaterial({
            map: texLoader.load("brick.jpg"),
        }),
        new THREE.MeshStandardMaterial({
            map: texLoader.load("brick.jpg"),
        }),
        new THREE.MeshStandardMaterial({
            map: texLoader.load("brick.jpg"),
        })
    ]


	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const cube = new THREE.BoxGeometry( boxWidth, boxHeight, boxDepth );
    const sphere = new THREE.SphereGeometry(1,5,5);
    const cylinder = new THREE.CylinderGeometry(1,1,1);

	function makeInstance( geometry, color, x, y, z, texture) {

        if(texture == null){
		    var material = new THREE.MeshPhongMaterial( { color } );
        }else{
        
            var material = texture
        }

		const object = new THREE.Mesh( geometry, material );
		scene.add( object );

		object.position.x = x;
        object.position.y = y;
        object.position.z = z;

		return object;

	}


	const shapes = [
        makeInstance( cube, 0x44aa88, 0,3,0,textureCube),
		makeInstance( sphere, 0x8844aa, 5,0,0,null),
		makeInstance( cylinder, 0xaa8844, -5,0,0,null),
	];

	function render( time ) {

		time *= 0.001; // convert time to seconds

		shapes.forEach( ( shape, ndx ) => {

			const speed = 1 + ndx * .1;
			const rot = time * speed;
			shape.rotation.x = rot;
			shape.rotation.y = rot;

		} );

        renderer.setSize(window.innerWidth,window.innerHeight)
		renderer.render( scene, camera );

		requestAnimationFrame( render );

	}

	requestAnimationFrame( render );

}

main();