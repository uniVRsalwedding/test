window.onload = function () {
      let clickedMinion1 = false;
      let clickedKevin = false;
      let clickedMinion2 = false;
      
      // Obtener el modelo y el audio
      const minion1 = document.getElementById('minion1-model');
      const minion2 = document.getElementById('minion2-model');
      const kevin = document.getElementById('kevin-model');
      const helloAudio = document.getElementById("helloAudio");
      const ahhAudio = document.getElementById("ahhAudio");
      const yeehAudio = document.getElementById("yeehAudio");
      const textoInicial = document.getElementById("texto_inicial");
      const textoAvanzar = document.getElementById("texto_avanzar");

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

		    document.querySelector('a-scene').appendChild(nextButton);
			
			nextButton.addEventListener('click', llamar_telefono);
        }
      }
      
	function llamar_telefono() {
//Eliminar objetos		
		document.querySelectorAll('.remove').forEach(entity => {
                entity.parentNode.removeChild(entity);
        });
		
		    // Remove existing camera
			const oldCamera = document.querySelector('[camera]');
			oldCamera.parentNode.removeChild(oldCamera);
			
			// Create new camera with exact same setup as index2.html
			const newCamera = document.createElement('a-entity');
			newCamera.setAttribute('camera', '');
			newCamera.setAttribute('look-controls', '');
			
			const cursor = document.createElement('a-entity');
			cursor.setAttribute('cursor', 'fuse: true; fuseTimeout: 100');
			cursor.setAttribute('position', '0 0 -1');
			cursor.setAttribute('raycaster', 'objects: .minion');
			cursor.setAttribute('geometry', 'primitive: ring; radiusInner: 0.02; radiusOuter: 0.03');
			cursor.setAttribute('material', 'shader: flat');
			
			newCamera.appendChild(cursor);
			document.querySelector('a-scene').appendChild(newCamera);
	
		sky = document.createElement('a-sky')
		sky.setAttribute('rotation', '0 30 0')
		sky.setAttribute('src' ,'#sky-london')
		sky.setAttribute('position', '0 0 0')
		
		document.querySelector('a-scene').appendChild(sky);
		
			
		phone = document.createElement('a-entity')
		
		phone.setAttribute('gltf-model', '#phone')		
		phone.setAttribute('scale', '1 1 1')
		phone.object3D.position.set(0, -5, 5)
		phone.setAttribute('rotation', '0 180 0')
		phone.setAttribute('id','cabina')
		phone.setAttribute('class','minion')		

		document.querySelector('a-scene').appendChild(phone);

		document.getElementById("audio_phone").loop = true;
		document.getElementById("audio_phone").play();
		
		phone.addEventListener('click', parar_telefono);


}

function parar_telefono() {
	document.getElementById("audio_phone").pause();
	
	const grabacion = document.getElementById("grabacion");
	grabacion.play();
	
    // Wait for the recording to end before showing buttons
    grabacion.addEventListener('ended', () => {
        // Create Next Level button
		nextLevelBtn = document.createElement('a-entity');
		nextLevelBtn.setAttribute('id','next-button');
		nextLevelBtn.setAttribute('data-raycastable','');
		nextLevelBtn.setAttribute('gltf-model','#button');
		nextLevelBtn.setAttribute('position','0 -1 5');
		nextLevelBtn.setAttribute('scale','0.2 0.2 0.2');
		nextLevelBtn.setAttribute('rotation','0 90 0');
		nextLevelBtn.setAttribute('class','clickable remove minion');
		nextLevelBtn.setAttribute('gesture-handler','');
        nextLevelBtn.addEventListener('click', () => {
            window.location.href = 'index2.html';
        });

        
        // Create Replay button
		replayBtn = document.createElement('a-entity');
		replayBtn.setAttribute('id','replay-button');
		replayBtn.setAttribute('data-raycastable','');
		replayBtn.setAttribute('gltf-model','#replay_button');
		replayBtn.setAttribute('position','-2 -1 5');
		replayBtn.setAttribute('scale','0.2 0.2 0.2');
		replayBtn.setAttribute('rotation','0 90 0');
		replayBtn.setAttribute('class','clickable remove minion');
		replayBtn.setAttribute('gesture-handler','');
        replayBtn.addEventListener('click', () => {
			grabacion.currentTime = 0;
            grabacion.play();
        });

        
        document.querySelector('a-scene').appendChild(nextLevelBtn);
        document.querySelector('a-scene').appendChild(replayBtn);
    });
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
      document.querySelector('a-scene').addEventListener('loaded', function () {

        minion1.setAttribute('visible', 'true'); // Hacer visible el objeto 3D
        minion2.setAttribute('visible', 'true'); // Hacer visible el objeto 3D
        kevin.setAttribute('visible', 'true'); // Hacer visible el objeto 3D
        //plano.setAttribute('visible', 'true');
      });
};


/* global AFRAME, THREE */

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

/*
// Componente 1: Panel de texto
      AFRAME.registerComponent('text-panel', {
        init: function () {
          let scene = this.el.object3D;

          // Crear un rectángulo (plano)
          const geometry = new THREE.PlaneGeometry(2, 1);
          
          // Crear un lienzo para el texto
          const canvas = document.createElement('canvas');
          canvas.width = 512;
          canvas.height = 256;
          const context = canvas.getContext('2d');

          // Configurar el texto en el lienzo
          context.fillStyle = ' #fffb00';  // Color de fondo
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.font = '40px Arial';
          context.fillStyle = ' #0017ff';  // Texto
          context.fillText('¡Apunta a los minions para que veas como funciona el cursor!', 50, 100);

          // Usar el lienzo como textura
          const texture = new THREE.CanvasTexture(canvas);
          const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });

          // Crear el mesh (rectángulo con el texto)
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(0, 1, 0); // Ajusta la posición del plano
          scene.add(mesh);
        },
      });
*/

