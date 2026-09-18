import { useEffect, useRef } from 'react';
import logoUrl from '../assets/scenes/huambo-expresso-logo.png';

/** Lazy WebGL layer. The existing artwork remains the fallback. */
export default function HuamboCoach() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = host.current;
    const frame = node?.closest<HTMLElement>('.object-bus');
    if (!node || !frame) return;
    let destroyed = false;
    let dispose: (() => void) | undefined;
    let started = false;
    const preload = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting) || started) return;
      started = true;
      void setup().catch(() => { if (!destroyed) { node.dataset.status = 'fallback'; dispose?.(); } });
    }, { rootMargin: '400px' });
    preload.observe(frame);
    async function setup() {
      const [THREE, { RoomEnvironment }, { createCoach }] = await Promise.all([
        import('three'), import('three/addons/environments/RoomEnvironment.js'), import('./coachModel'),
      ]);
      if (destroyed) return;
      const logo = new Image(); logo.src = logoUrl; await logo.decode();
      if (destroyed) return;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setClearColor(0xffffff, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.02;
      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const room = new RoomEnvironment(); const env = pmrem.fromScene(room, .04);
      scene.environment = env.texture; scene.environmentIntensity = .85; room.dispose(); pmrem.dispose();
      const { coach, textures } = createCoach(logo); scene.add(coach);
      scene.add(new THREE.HemisphereLight('#f4f8ff', '#7785a1', 1.2));
      const key = new THREE.DirectionalLight('#fff7ed', 2.5);key.position.set(-6,9,5);scene.add(key);
      const rim = new THREE.DirectionalLight('#d5e5ff', 1.5);rim.position.set(5,5,-7);scene.add(rim);
      const camera = new THREE.PerspectiveCamera(30,1,.1,100);camera.position.set(-13,6.5,18);camera.lookAt(0,1.8,0);
      let raf = 0, visible = false;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
      function render() {
        raf = 0;
        if (destroyed || !visible || document.hidden) return;
        const progress = reduce.matches ? 0 : Math.min(1, Math.max(0,
          Number.parseFloat(frame!.style.getPropertyValue('--coach-turn')) || 0));
        coach.rotation.y = .18 - progress * 1.44;
        coach.position.x = progress * .45;
        renderer.render(scene,camera);
        node!.dataset.turn = progress.toFixed(4);
        // Render on timeline/resize changes only: no drifting or continuous RAF loop.
      }
      function resume() {
        const style = frame!.style;
        visible = contextAvailable && inView && style.visibility !== 'hidden' && (style.opacity === '' || Number(style.opacity) > .01);
        node!.dataset.renderState = !visible || document.hidden ? 'paused' : reduce.matches ? 'still' : 'scroll';
        if ((!visible || document.hidden) && raf) {cancelAnimationFrame(raf);raf=0;}
        if (visible && !document.hidden && !raf) raf=requestAnimationFrame(render);
      }
      let inView = false;
      let contextAvailable = true;
      const view = new IntersectionObserver(entries=>{inView=entries.some(e=>e.isIntersecting);resume();});view.observe(frame!);
      const mutations = new MutationObserver(resume);mutations.observe(frame!,{attributes:true,attributeFilter:['style']});
      const resize = new ResizeObserver(entries=>{
        const {width,height}=entries[0].contentRect;if(!width||!height)return;
        renderer.setSize(width,height,false);camera.aspect=width/height;
        // Frame the complete coach, mirrors and contact shadow on narrow screens too.
        const distance = Math.max(13.2, 26 / camera.aspect);
        camera.position.set(-.8*distance,1.15+.32*distance,.75*distance);camera.lookAt(0,1.15,0);camera.updateProjectionMatrix();resume();
      });resize.observe(node!);
      const motionChange=()=>{if(raf)cancelAnimationFrame(raf);raf=0;resume();};
      reduce.addEventListener('change',motionChange);document.addEventListener('visibilitychange',resume);
      const contextLost=(event:Event)=>{event.preventDefault();contextAvailable=false;node!.dataset.status='fallback';node!.dataset.renderState='paused';if(raf)cancelAnimationFrame(raf);raf=0;};
      renderer.domElement.addEventListener('webglcontextlost',contextLost);
      node!.appendChild(renderer.domElement);node!.dataset.status='ready';
      dispose=()=>{
        cancelAnimationFrame(raf);view.disconnect();mutations.disconnect();resize.disconnect();
        reduce.removeEventListener('change',motionChange);document.removeEventListener('visibilitychange',resume);
        renderer.domElement.removeEventListener('webglcontextlost',contextLost);
        const geometries=new Set<import('three').BufferGeometry>();const materials=new Set<import('three').Material>();
        scene.traverse(obj=>{if(obj instanceof THREE.Mesh){geometries.add(obj.geometry);(Array.isArray(obj.material)?obj.material:[obj.material]).forEach(m=>materials.add(m));}});
        geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());env.dispose();renderer.dispose();renderer.domElement.remove();
      };
      if (destroyed) dispose();
    }
    return () => {destroyed=true;preload.disconnect();dispose?.();};
  }, []);
  return <div className="huambo-coach-canvas" ref={host} data-status="loading" aria-hidden="true" />;
}
