window.addEventListener('load', initScene)

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

function initScene() {

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
    document.querySelector('a-scene').appendChild(minion_winner);
}

function llamar_telefono() {	
	phone = document.createElement('a-entity')
	
	phone.setAttribute('gltf-model', '#phone')
			
	phone.setAttribute('scale', '1 1 1')
	phone.object3D.position.set(0, -5, 5)

	
	phone.setAttribute('rotation', '0 180 0')
	phone.setAttribute('class', 'minion')
	phone.setAttribute('shootablephone','')
	phone.setAttribute('id','cabina')
	

	

	document.querySelector('a-scene').appendChild(phone);
	
	document.getElementById("audio_phone").loop = true;
	document.getElementById("audio_phone").play();

}


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
			
			const sky = document.querySelector('a-sky');
			
			sky.setAttribute('src' ,'#sky-london')
			
			llamar_telefono();
			

        });
    }
});


AFRAME.registerComponent('shootablephone', {
    init: function () {
        this.el.addEventListener('click', () => {
			document.getElementById("audio_phone").pause();
			const sky2 = document.querySelector('a-sky');
		    document.getElementById('cabina').remove();
			sky2.setAttribute('src' ,'#sky-beach')
			
			vid = document.createElement('a-video')
			vid.setAttribute('src','#video')
			vid.setAttribute('width','2.5')
			vid.setAttribute('height','4')
			vid.setAttribute('shootablevideo','')
			
			document.querySelector('a-scene').appendChild(vid);
			// Start playing the video
            const videoEl = document.querySelector('#video');
            videoEl.play();
		});
      }
});


AFRAME.registerComponent('shootablevideo', {
    init: function () {
		const videoEl = document.querySelector('#video');
		
        this.el.addEventListener('click', () => {			
			if (videoEl.paused) {
				videoEl.play();
			} else {
				videoEl.pause();
			}	
			
		});
      }
});