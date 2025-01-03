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
			
            sky.setAttribute('src','#sky2');
			sky.setAttribute('rotation','0 100 0');
			
			vid = document.createElement('a-video');
			vid.setAttribute('src','#video');
			vid.setAttribute('width', '14');
            vid.setAttribute('height', '17');
            vid.setAttribute('position', '-25 9 30');
			vid.setAttribute('rotation', '0 -40 0');
			vid.setAttribute('shootablevideo','');
			vid.setAttribute('class','minion');
			
			
			vid2 = document.createElement('a-video');
			vid2.setAttribute('src','#video');
			vid2.setAttribute('width', '25');
            vid2.setAttribute('height', '28');
            vid2.setAttribute('position', '59 16 30');
			vid2.setAttribute('rotation', '0 53 0');
			vid2.setAttribute('shootablevideo','');
			vid2.setAttribute('class','minion');
			
			
			document.querySelector('a-scene').appendChild(vid);
			document.querySelector('a-scene').appendChild(vid2);
		

        });
    }
});



AFRAME.registerComponent('shootablevideo', {
    init: function () {
		const videoEl = document.querySelector('#video');
		//let firstClick = true;
		
        this.el.addEventListener('click', () => {
/*
			if (firstClick) {
				videoEl.play();
				firstClick = false;
				
				web = document.createElement('a-entity');
				web.setAttribute('data-raycastable','');
				web.setAttribute('gltf-model','#web');
				web.setAttribute('position','8 0 30');
				web.setAttribute('scale', '1.5 1.5 1.5');
				web.setAttribute('rotation','0 95 0');
				web.setAttribute('class','clickable remove minion');
				web.addEventListener('click', () => {
					window.location.href = 'https://planning.wedding/website/zi6cr1i3g6';
				});
				document.querySelector('a-scene').appendChild(web);
			}
		
			else {*/
				if (videoEl.paused) {
					videoEl.play();
				} else {
					videoEl.pause();
				}
			//}
		});
      }
});