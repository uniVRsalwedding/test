window.onload = function () {
      let clickedMinion1 = false;
      let clickedKevin = false;
      let clickedMinion2 = false;
      
      // Obtener el modelo y el audio
	  const scene = document.querySelector('a-scene');
      const minion1 = document.getElementById('minion1-model');
      const minion2 = document.getElementById('minion2-model');
      const kevin = document.getElementById('kevin-model');
      const helloAudio = document.getElementById("helloAudio");
      const ahhAudio = document.getElementById("ahhAudio");
      const yeehAudio = document.getElementById("yeehAudio");
      const textoInicial = document.getElementById("texto_inicial");
      const textoAvanzar = document.getElementById("texto_avanzar");
	  const grabacion = document.getElementById("grabacion");

	  
	  const minions = [
    { x: 0, y: 0, z: -30 },
    { x: 0, y: 0, z: 30 },
    { x: 30, y: 0, z: 0 },
    { x: -30, y: 0, z: 0 },
    { x: 20, y: 0, z: 20 },
    { x: 20, y: 0, z: -20 },
    { x: -20, y: 0, z: -20 },
    { x: -20, y: 0, z: 20 }
	]

	const randomX = Math.floor(Math.random() * 61) - 30;
	const randomY = Math.floor(Math.random() * 61) - 30;
	const randomZ = Math.floor(Math.random() * 61) - 30;
	const possibleValues = [360, 0, -360]
	const possibleValuesY = [360, 0, -360]

	const toX = possibleValues[Math.floor(Math.random() * possibleValues.length)];
	const toZ = possibleValues[Math.floor(Math.random() * possibleValues.length)];
	const toY = possibleValuesY[Math.floor(Math.random() * possibleValues.length)];

      // Función para verificar si todos los modelos han sido clicados
      function checkAllClicked() {
        if (clickedMinion1 && clickedKevin && clickedMinion2) {
            textoInicial.setAttribute('visible', 'false');
            textoAvanzar.setAttribute('visible', 'true');
			nextButton = document.createElement('a-entity');
			nextButton.setAttribute('id','next-level-button');
			nextButton.setAttribute('data-raycastable','');
			nextButton.setAttribute('gltf-model','#button');
			nextButton.setAttribute('position','0 1.3 2');
			nextButton.setAttribute('scale','0.1 0.1 0.1');
			nextButton.setAttribute('rotation','0 -90 0');
			nextButton.setAttribute('class','clickable remove');
			nextButton.setAttribute('gesture-handler','');
			//nextButton.setAttribute('onclick',"window.location.href = 'index2.html';");

		    scene.appendChild(nextButton);
			
			nextButton.addEventListener('click', llamar_telefono);
        }
      }
      
	function llamar_telefono() {
//Eliminar objetos		
		document.querySelectorAll('.remove').forEach(entity => {
                entity.parentNode.removeChild(entity);
        });
		
		    /* Remove existing camera*/
			const oldCamera = document.querySelector('[camera]');
			oldCamera.parentNode.removeChild(oldCamera);
			
			// Create new camera with exact same setup as index2.html
			const newCamera = document.createElement('a-entity');
			newCamera.setAttribute('camera', '');
			newCamera.setAttribute('look-controls', '');
			
			const cursor = document.createElement('a-cursor');
			cursor.setAttribute('fuse', 'false');
			cursor.setAttribute('position', '0 0 -1');
			cursor.setAttribute('raycaster', 'objects: .minion; interval: 50');
			cursor.setAttribute('geometry', 'primitive: ring; radiusInner: 0.02; radiusOuter: 0.03');
			cursor.setAttribute('material', 'shader: flat');
			
			newCamera.appendChild(cursor);
			scene.appendChild(newCamera);
	
		sky = document.createElement('a-sky')
		sky.setAttribute('rotation', '0 30 0')
		sky.setAttribute('src' ,'#sky-london')
		sky.setAttribute('position', '0 0 0')
		
		scene.appendChild(sky);
		
			
		phone = document.createElement('a-entity')
		
		phone.setAttribute('gltf-model', '#phone')		
		phone.setAttribute('scale', '1 1 1')
		phone.object3D.position.set(0, -5, 5)
		phone.setAttribute('rotation', '0 180 0')
		phone.setAttribute('id','cabina')
		phone.setAttribute('class','minion remove')		

		scene.appendChild(phone);

		document.getElementById("audio_phone").loop = true;
		document.getElementById("audio_phone").play();
		
		phone.addEventListener('click', () => {
			document.getElementById("audio_phone").pause();
	

			grabacion.play();
			
			// Wait for the recording to end before showing buttons
			grabacion.addEventListener('playing', () => {
				// Create Next Level button
				nextLevelBtn = document.createElement('a-entity');
				nextLevelBtn.setAttribute('data-raycastable','');
				nextLevelBtn.setAttribute('gltf-model','#minion_button');
				nextLevelBtn.setAttribute('position','-1.3 -1 5');
				nextLevelBtn.setAttribute('scale','0.3 0.3 0.3');
				nextLevelBtn.setAttribute('rotation','0 90 0');
				nextLevelBtn.setAttribute('class','clickable remove minion');
				nextLevelBtn.addEventListener('click', nextScene);

				
				// Create Replay button
				replayBtn = document.createElement('a-entity');
				replayBtn.setAttribute('id','replay-button');
				replayBtn.setAttribute('data-raycastable','');
				replayBtn.setAttribute('gltf-model','#replay_button');
				replayBtn.setAttribute('position','0.3 -1 5');
				replayBtn.setAttribute('scale','0.3 0.3 0.3');
				replayBtn.setAttribute('rotation','0 90 0');
				replayBtn.setAttribute('class','clickable remove minion');
				replayBtn.addEventListener('click', () => {
					grabacion.currentTime = 0;
					grabacion.play();
				});

				
				scene.appendChild(nextLevelBtn);
				scene.appendChild(replayBtn);
			});
		});


}

function nextScene(){
	//Eliminar objetos		
		document.querySelectorAll('.remove').forEach(entity => {
                entity.parentNode.removeChild(entity);
        });
	grabacion.pause();
	const fondo = document.querySelector('a-sky');
	fondo.setAttribute('src','#sky');
	
	// Crea las órbitas con las propiedades indicadas
	createOrbit('0 -30 0', '0 0 0', 'property: rotation; to: 0 360 360; loop: true; dur: 40000; easing: linear');
	createOrbit('0 0 0', '0 0 -45', 'property: rotation; to: 0 -360 0; loop: true; dur: 30000; easing: linear');
	createOrbit('0 -3 0', '0 0 -90', 'property: rotation; to: 0 360 360; loop: true; dur: 50000; easing: linear');
	createOrbit('0 0 0', '0 0 -120', 'property: rotation; to: 360 -360 0; loop: true; dur: 60000; easing: linear');
	
	let orbits = document.querySelectorAll('.orbit')

    orbits.forEach(orbit => {

        minions.forEach(pos => {

            minion = document.createElement('a-entity')
            minion.setAttribute('gltf-model', '#evil_minion')
					
            minion.setAttribute('scale', '3 3 3')

            minion.setAttribute('class', 'minion')
            minion.object3D.position.set(pos.x, pos.y, pos.z)

            minion.setAttribute('shootable', '')

            orbit.appendChild(minion)
        })
    })

		
	
    minion_winner = document.createElement('a-entity');
    minion_winner.setAttribute('gltf-model', '#minion_banana');
	minion_winner.setAttribute('scale', '2 2 2')
    minion_winner.setAttribute('class', 'minion')
    minion_winner.object3D.position.set(randomX, randomY, randomZ)

    minion_winner.setAttribute('shootablewinner', '')
    minion_winner.setAttribute('animation', 'property: rotation; to: '+toX+' '+toY+' '+toZ+'; loop: true; dur: 10000; easing: linear');
        // Añadir la entidad a la escena
    scene.appendChild(minion_winner);
}

// Función para crear una entidad "orbit"
function createOrbit(position, rotation, animationProps) {
  // Crea una entidad
  const entity = document.createElement('a-entity');
  
  // Añade la clase "orbit"
  entity.setAttribute('class','orbit');
  
  // Establece la posición
  entity.setAttribute('position', position);
  
  // Establece la rotación
  entity.setAttribute('rotation', rotation);
  
  // Establece la animación
  entity.setAttribute('animation', animationProps);
  
  // Añade la entidad a la escena
  scene.appendChild(entity);
}

function crearWeb() {
	const web = document.createElement('a-entity');
	web.setAttribute('data-raycastable','');
	web.setAttribute('gltf-model','#web');
	web.setAttribute('position','8 0 30');
	web.setAttribute('scale', '1.5 1.5 1.5');
	web.setAttribute('rotation','0 95 0');
	web.setAttribute('class','clickable remove minion');
	web.addEventListener('click', () => {
		window.location.href = 'https://planning.wedding/website/zi6cr1i3g6';
	});
	scene.appendChild(web);
}

      // Reproducir audio y actualizar estado al hacer clic en Bowser
      minion1.addEventListener('click', () => {
        ahhAudio.play();
        clickedMinion1 = true;
        checkAllClicked(); // Verificar si todos los modelos han sido clicados
      });

      // Reproducir audio y actualizar estado al hacer clic en Kevin
      kevin.addEventListener('click', () => {
        helloAudio.play();
        clickedKevin = true;
        checkAllClicked(); // Verificar si todos los modelos han sido clicados
      });

      // Reproducir audio y actualizar estado al hacer clic en Minion2
      minion2.addEventListener('click', () => {
        yeehAudio.play();
        clickedMinion2 = true;
        checkAllClicked(); // Verificar si todos los modelos han sido clicados
      });
	  

      

      // Simular la detección del objeto al cargar la escena
      scene.addEventListener('loaded', function () {

        minion1.setAttribute('visible', 'true'); // Hacer visible el objeto 3D
        minion2.setAttribute('visible', 'true'); // Hacer visible el objeto 3D
        kevin.setAttribute('visible', 'true'); // Hacer visible el objeto 3D
        //plano.setAttribute('visible', 'true');
      });
};


/* global AFRAME, THREE */

AFRAME.registerComponent('shootable', {
    init: function () {
        this.el.addEventListener('click', () => {
            this.el.parentNode.removeChild(this.el)
            document.getElementById("audio_lengua").play();
        })
    }
});

AFRAME.registerComponent('shootablewinner', {
    init: function () {
        this.el.addEventListener('click', () => {
            // Seleccionar todas las entidades de las clases .orbit y .minion
            document.querySelectorAll('.orbit, .minion').forEach(entity => {
                entity.parentNode.removeChild(entity);
            });
            document.getElementById("audio_banana").play();
			
			const sky_gs = document.querySelector('a-sky');
			
            sky_gs.setAttribute('src','#sky2');
			sky_gs.setAttribute('rotation','0 100 0');
			
			vid = document.createElement('a-video');
			vid.setAttribute('src','#video');
			vid.setAttribute('width', '14');
            vid.setAttribute('height', '17');
            vid.setAttribute('position', '-25 9 30');
			vid.setAttribute('rotation', '0 -40 0');
			vid.setAttribute('shootablevideo','');
			vid.setAttribute('class','minion');
			vid.setAttribute('material', 'shader: flat');
			
			
			vid2 = document.createElement('a-video');
			vid2.setAttribute('src','#video');
			vid2.setAttribute('width', '25');
            vid2.setAttribute('height', '28');
            vid2.setAttribute('position', '59 16 30');
			vid2.setAttribute('rotation', '0 53 0');
			vid2.setAttribute('shootablevideo','');
			vid2.setAttribute('class','minion');
			vid.setAttribute('material', 'shader: flat');

			
			scene.appendChild(vid);
			scene.appendChild(vid2);
			
        });
    }
});

AFRAME.registerComponent('shootablevideo', {
    init: function () {
		const videoEl = document.querySelector('#video');
		
		videoEl.addEventListener('ended', crearWeb);


        this.el.addEventListener('click', () => {
			console.log("Ha entrado en el video");
				if (videoEl.paused) {
					videoEl.play();
				} else {
					videoEl.pause();
				}
		});
      }
	  
});

AFRAME.registerComponent("gesture-handler", {
  schema: {
    enabled: { default: true },
    rotationFactor: { default: 5 },
    minScale: { default: 0.3 },
    maxScale: { default: 8 },
  },

  init: function () {
    this.handleScale = this.handleScale.bind(this);
    this.handleRotation = this.handleRotation.bind(this);

   // this.isVisible = false;
    this.initialScale = this.el.object3D.scale.clone();
    this.scaleFactor = 1;
/*
    this.el.sceneEl.addEventListener("markerFound", (e) => {
      this.isVisible = true;
    });

    this.el.sceneEl.addEventListener("markerLost", (e) => {
      this.isVisible = false;
    });*/
  },

  update: function () {
    if (this.data.enabled) {
      this.el.sceneEl.addEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
    } else {
      this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
    }
  },

  remove: function () {
    this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
    this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
  },

  handleRotation: function (event) {
    //if (this.isVisible) {
      this.el.object3D.rotation.y +=
        event.detail.positionChange.x * this.data.rotationFactor;
      this.el.object3D.rotation.x +=
        event.detail.positionChange.y * this.data.rotationFactor;
   // }
  },

  handleScale: function (event) {
   // if (this.isVisible) {
      this.scaleFactor *=
        1 + event.detail.spreadChange / event.detail.startSpread;

      this.scaleFactor = Math.min(
        Math.max(this.scaleFactor, this.data.minScale),
        this.data.maxScale
      );

      this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x;
      this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y;
      this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z;
   // }
  },
});


