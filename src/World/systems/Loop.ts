import {
  Clock,
  OrthographicCamera,
  PerspectiveCamera,
  Scene,
  WebGL1Renderer,
  WebGLRenderer,
} from 'three';

interface LoopTypes {
  camera: PerspectiveCamera | OrthographicCamera;
  scene: Scene;
  renderer: WebGLRenderer | WebGL1Renderer;
}

const clock = new Clock();
class Loop {
  camera: LoopTypes['camera'];
  scene: LoopTypes['scene'];
  renderer: LoopTypes['renderer'];
  updatables: any[];

  constructor({ camera, scene, renderer }: LoopTypes) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.tick();
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    const delta: number = clock.getDelta();

    for (const object of this.updatables) {
      // @ts-ignore
      object.tick(delta);
    }
  }
}

export { Loop };