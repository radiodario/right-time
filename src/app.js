var THREE = require('./three')

var camera, scene, renderer;
var geometry, material, mesh;

var height, width, cover;

init();
animate();

function init() {

    cover = document.querySelector('img.cover');

    width  = cover.width - 1;
    height = cover.height;



    camera = new THREE.PerspectiveCamera( 90, width / height, 1, 10000);
    camera.position.z = width;

    scene = new THREE.Scene();

    geometry = new THREE.CylinderGeometry( width, width, width*2, 60, 14, true);
    material = new THREE.MeshBasicMaterial( { color: 0x0088ff, wireframe: true } );

    // create custom material from the shader code above
    //   that is within specially labeled script tags
    var glowMaterial = new THREE.ShaderMaterial( 
    {
      uniforms: 
      { 
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
    }   );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    mesh.rotation.z = Math.PI/2;

    
    mesh.position.set(- (width*0.014), -width + (width*0.03), -width/4);
    

    
    var spriteMaterial = new THREE.SpriteMaterial( 
      { 
        map: new THREE.ImageUtils.loadTexture( 'images/glow.png' ), 
        useScreenCoordinates: false, alignment: THREE.SpriteAlignment.center,
        color: 0x0000ff, transparent: false, blending: THREE.AdditiveBlending
      });
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set(width*2, width*2, 1.0);
    mesh.add(sprite);


    renderer = new THREE.CanvasRenderer();
    renderer.setSize( width, height );

    document.body.appendChild( renderer.domElement );

}

function animate() {

    // note: three.js includes requestAnimationFrame shim
    requestAnimationFrame( animate );

    mesh.rotation.x += 0.001;
    // mesh.rotation.y += 0.02;

    renderer.render( scene, camera );

}