var container, stats;
			var camera, scene, renderer;
			var text, plane;
			var targetRotation = 0;
			var targetRotationOnMouseDown = 0;
			var mouseX = 0;
			var mouseXOnMouseDown = 0;
			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;
			var heartShape, particleCloud, sparksEmitter, emitterPos;
			var _rotation = 0;
			var timeOnShapePath = 0;
			var x = 0, y = 0;
            var val = 2;
			init(val);
			animate();
			var textType = 0;
			function init(val) {
			    var container;
			    container = document.getElementById('container');
			    var homeSlide = document.getElementById('home-slider');
				if (container.hasChildNodes()) {
				    while (container.childNodes.length >= 1) {
				        container.removeChild(container.firstChild);
				    }
				}
				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.y = 120;
				camera.position.z = 700;
				scene = new THREE.Scene();
				var string = "events";
				function returnWidth() {
					if(window.innerWidth < 500)
						return (window.innerWidth / 7);
					else if(window.innerWidth > 500 && window.innerWidth < 900)
						return (window.innerWidth / 11);
					else
						return (window.innerWidth / 12);
				} 
				var text3d = new THREE.TextGeometry( string, {
					size: returnWidth(),
					height: 35,
					curveSegments: 2,
					font: "helvetiker"
				});
				text3d.computeBoundingBox();
				var centerOffset = -0.5 * ( text3d.boundingBox.x[ 1 ] - text3d.boundingBox.x[ 0 ] );
				var textMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, wireframe: true, wireframeLinewidth: 0.5, overdraw: true });
				text = new THREE.Mesh( text3d, textMaterial );
				text.doubleSided = false;
				text.position.x = centerOffset;
				text.position.y = 100;
				text.position.z = 0;
				text.rotation.x = 0;
				text.rotation.y = Math.PI * 2;
				text.overdraw = true;
				parent = new THREE.Object3D();
				parent.add( text );
				particleCloud = new THREE.Object3D(); // Just a group
				particleCloud.y = 800;
				parent.add( particleCloud );
				scene.add( parent );
				renderer = new THREE.CanvasRenderer();
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );
			}
			document.addEventListener( 'mousemove', onDocumentMouseMove, false );
			function onDocumentMouseMove( event ) {
				mouseX = event.clientX - windowHalfX;
				targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
			}
			function animate() {
				requestAnimationFrame( animate );
				render();
			}
			function render() {
				timeOnShapePath += 0.0337;
				if (timeOnShapePath > 1) timeOnShapePath -= 1;
				particleCloud.rotation.y += 0.05;
				parent.rotation.y += ( targetRotation - parent.rotation.y ) * 0.05;
				renderer.render( scene, camera );
			}