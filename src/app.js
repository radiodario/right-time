var THREE = require('./three');
window.THREE = THREE;
var Detector = require('./detector');
var camera, scene, renderer;
var geometry, material, mesh, glow;

var height, width, cover;


var cover = document.createElement('img');
cover.onload = init.bind(this);
cover.className = 'cover'
cover.src = 'images/cover.png'
document.body.appendChild(cover)




function init() {
    
    width  = cover.width - 1;
    height = cover.height;



    camera = new THREE.PerspectiveCamera( 90, width / height, 1, 1300);
    camera.position.z = width;

    scene = new THREE.Scene();
    scene.add( new THREE.PointLight( 0xffffff ) );
    scene.add( new THREE.AmbientLight( 0xffffff ) );


    geometry = new THREE.CylinderGeometry( width, width, width*2, 60, 14, true);
    glowGeometry = new THREE.CubeGeometry( width, width, width*2, 60, 14, true);
    material = new THREE.MeshBasicMaterial( { color: 0x0088ff, wireframe: true } );

    // create custom material from the shader code above
    //   that is within specially labeled script tags
    var shaderOpts = {
      uniforms: { 
        "c":   { type: "f", value: 1.0 },
        "p":   { type: "f", value: 1.4 },
        glowColor: { type: "c", value: new THREE.Color(0xffff00) },
        viewVector: { type: "v3", value: camera.position }
      },
      vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
      fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    }  



    var glowMaterial = new THREE.ShaderMaterial( shaderOpts);

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    mesh.rotation.z = Math.PI/2;

    
    mesh.position.set(- (width*0.014), -width + (width*0.03), -width/4);
    
    glow = new THREE.Mesh( geometry, glowMaterial);
    scene.add(glow);
    
    glow.position = mesh.position;
    
    glow.rotation.z = Math.PI/2;
    glow.scale.multiplyScalar(1.01);


    // if ( Detector.webgl )
    //   renderer = new THREE.WebGLRenderer( {antialias:true} );
    // else
      renderer = new THREE.CanvasRenderer(); 
    renderer.setSize( width, height );

    document.body.appendChild( renderer.domElement );

    animate();

}

function animate() {

    // note: three.js includes requestAnimationFrame shim
    requestAnimationFrame( animate );

    mesh.rotation.x += 0.001;
    // mesh.rotation.y += 0.02;
    glow.rotation.x += 0.001;
    renderer.render( scene, camera );

}