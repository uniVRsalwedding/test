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
const randomZ = Math.floor(Math.random() * 61) - 30;

function initScene() {

    let orbits = document.querySelectorAll('.orbit')

    orbits.forEach(orbit => {

        minions.forEach(pos => {

            minion = document.createElement('a-entity')
            minion.setAttribute('gltf-model', '#minion' )
            minion.setAttribute('scale', '3 3 3')

            minion.setAttribute('class', 'minion')
            minion.object3D.position.set(pos.x, pos.y, pos.z)

            minion.setAttribute('shootable', '')

            orbit.appendChild(minion)
        })
    })

    minionWinner = document.createElement('a-entity')
    minionWinner.setAttribute('gltf-model', '#minion_banana' )
    minionWinner.setAttribute('scale', '0.5 0.5 0.5')

    minionWinner.setAttribute('class', 'minion')
    minionWinner.object3D.position.set(randomX, 0, randomZ)

    minionWinner.setAttribute('shootableWinner', '')
    minionWinner.setAttribute('animation', 'property: rotation; to: 0 360 360; loop: true; dur: 40000; easing: linear');
        // Añadir la entidad a la escena
    document.querySelector('a-scene').appendChild(minionWinner);
}

AFRAME.registerComponent('shootable', {
    init: function () {
        this.el.addEventListener('click', () => {
            this.el.parentNode.removeChild(this.el)
            document.getElementById("audio_lengua").play();
        })
    }
})

AFRAME.registerComponent('shootableWinner', {
    init: function () {
        this.el.addEventListener('click', () => {
            /* Seleccionar todas las entidades de las clases .orbit y .minion
            document.querySelectorAll('.orbit, .minion').forEach(entity => {
                entity.parentNode.removeChild(entity);
            });*/
            document.getElementById("audio_banana").play();
        });
    }
});
