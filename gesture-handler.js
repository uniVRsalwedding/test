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
