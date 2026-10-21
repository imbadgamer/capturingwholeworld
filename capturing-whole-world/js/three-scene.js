/**
 * CAPTURING WHOLE WORLD — PRASHANT MISHRA
 * Three.js WebGL Scene: Perspective Grid Floor + Profile Chrome Sphere
 * Optimized for 60fps, low GPU memory, mobile pixel ratio clamping, and visibility management.
 */

class GalleryThreeScene {
  constructor() {
    this.canvas = document.getElementById('three-canvas');
    if (!this.canvas || typeof THREE === 'undefined') return;

    this.isMobile = window.innerWidth < 768;
    this.isPaused = false;
    this.animationFrameId = null;

    this.scene = new THREE.Scene();
    this.scene.background = null;
    this.scene.fog = new THREE.FogExp2(0x050505, 0.025);

    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 80);
    this.camera.position.set(0, 1.8, 9);

    // Optimize renderer with adaptive pixel ratio
    const pixelRatio = this.isMobile ? Math.min(window.devicePixelRatio, 1.0) : Math.min(window.devicePixelRatio, 1.5);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: !this.isMobile,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(pixelRatio);

    this.mouse = { x: 0, y: 0 };
    this.targetCameraPos = { x: 0, y: 1.8, z: 9 };

    this.initGridFloor();
    this.initProfileSphere();
    this.initEvents();
    this.startLoop();
  }

  initGridFloor() {
    // Lightweight perspective grid floor with adaptive division count
    const size = 70;
    const divisions = this.isMobile ? 36 : 54;
    const gridColor = new THREE.Color(0x242428);
    const centerColor = new THREE.Color(0xd4a373);

    this.grid = new THREE.GridHelper(size, divisions, centerColor, gridColor);
    this.grid.position.y = -2.1;
    this.grid.material.opacity = 0.26;
    this.grid.material.transparent = true;
    this.scene.add(this.grid);

    // Optimized lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xd4a373, 1.1);
    dirLight.position.set(5, 10, 7);
    this.scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x8ecae6, 1.2, 18);
    pointLight.position.set(-5, 3, 3);
    this.scene.add(pointLight);
  }

  initProfileSphere() {
    // Interactive Liquid Chrome / Iridescent Glass Sphere for the Profile Overlay
    const detail = this.isMobile ? 18 : 28;
    const geometry = new THREE.IcosahedronGeometry(2.1, detail);
    
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x111114,
      emissive: 0x050508,
      roughness: 0.1,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
      wireframe: false
    });

    this.sphere = new THREE.Mesh(geometry, material);
    this.sphere.position.set(0, 0, 0);
    this.sphere.visible = false;
    this.scene.add(this.sphere);
  }

  showProfileSphere(show) {
    if (this.sphere) {
      this.sphere.visible = show;
      this.requestTick();
    }
  }

  pauseRendering(pause) {
    this.isPaused = pause;
    if (!pause) {
      this.requestTick();
    }
  }

  requestTick() {
    this.isDirty = true;
    if (!this.animationFrameId && !this.isPaused) {
      this.animationFrameId = requestAnimationFrame(this.boundLoop);
    }
  }

  initEvents() {
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      const pixelRatio = this.isMobile ? Math.min(window.devicePixelRatio, 1.0) : Math.min(window.devicePixelRatio, 1.5);
      this.renderer.setPixelRatio(pixelRatio);
      this.requestTick();
    }, { passive: true });

    let mouseScheduled = false;
    if (!this.isMobile) {
      window.addEventListener('mousemove', (e) => {
        if (mouseScheduled || this.isPaused || document.hidden) return;
        mouseScheduled = true;
        requestAnimationFrame(() => {
          this.mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
          this.mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
          this.targetCameraPos.x = this.mouse.x * 0.6;
          this.targetCameraPos.y = 1.8 + -this.mouse.y * 0.35;
          this.requestTick();
          mouseScheduled = false;
        });
      }, { passive: true });
    }

    document.addEventListener('visibilitychange', () => {
      this.pauseRendering(document.hidden);
    });
  }

  startLoop() {
    this.boundLoop = () => {
      if (this.isPaused) {
        this.animationFrameId = null;
        return;
      }

      this.render();

      const dx = this.targetCameraPos.x - this.camera.position.x;
      const dy = this.targetCameraPos.y - this.camera.position.y;
      const isCameraMoving = Math.abs(dx) > 0.0003 || Math.abs(dy) > 0.0003;
      const isSphereActive = this.sphere && this.sphere.visible;

      if (!isCameraMoving && !isSphereActive && !this.isDirty) {
        this.animationFrameId = null;
        return;
      }

      this.animationFrameId = requestAnimationFrame(this.boundLoop);
    };
    this.requestTick();
  }

  render() {
    const dx = this.targetCameraPos.x - this.camera.position.x;
    const dy = this.targetCameraPos.y - this.camera.position.y;
    const isCameraMoving = Math.abs(dx) > 0.0003 || Math.abs(dy) > 0.0003;
    if (isCameraMoving) {
      this.camera.position.x += dx * 0.05;
      this.camera.position.y += dy * 0.05;
      this.camera.lookAt(0, -0.4, 0);
    }

    const isSphereActive = this.sphere && this.sphere.visible;
    if (isSphereActive) {
      this.sphere.rotation.y += 0.007;
      this.sphere.rotation.x += 0.003;
      this.sphere.position.x += (this.mouse.x * 0.25 - this.sphere.position.x) * 0.08;
      this.sphere.position.y += (-this.mouse.y * 0.25 - this.sphere.position.y) * 0.08;
    }

    if (isCameraMoving || isSphereActive || this.isDirty) {
      this.renderer.render(this.scene, this.camera);
      if (!isCameraMoving && !isSphereActive) {
        this.isDirty = false;
      }
    }
  }
}

window.GalleryThreeScene = GalleryThreeScene;
