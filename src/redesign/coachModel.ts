import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

/** Lightweight, original coach study. No external models or textures. */
export function createCoach(logo: HTMLImageElement) {
  const coach = new THREE.Group();
  const textures: THREE.Texture[] = [];
  const paint = new THREE.MeshPhysicalMaterial({ color: '#094fc6', metalness: .5, roughness: .25, clearcoat: 1, clearcoatRoughness: .16 });
  const glass = new THREE.MeshPhysicalMaterial({ color: '#101c29', metalness: .4, roughness: .12, clearcoat: 1 });
  const black = new THREE.MeshStandardMaterial({ color: '#121820', roughness: .5 });
  const rubber = new THREE.MeshStandardMaterial({ color: '#111216', roughness: .88 });
  const chrome = new THREE.MeshStandardMaterial({ color: '#cdd5e1', metalness: .92, roughness: .2 });
  const silver = new THREE.MeshPhysicalMaterial({ color: '#b9c4d2', metalness: .75, roughness: .25, clearcoat: .4 });
  const seam = new THREE.MeshStandardMaterial({ color: '#16365f', roughness: .6 });
  const lamp = new THREE.MeshStandardMaterial({ color: '#f2faff', emissive: '#c8e4ff', emissiveIntensity: .5, metalness: .2, roughness: .15 });
  const red = new THREE.MeshStandardMaterial({ color: '#a40c20', metalness: .3, roughness: .3 });
  const amber = new THREE.MeshStandardMaterial({ color: '#ffae36', emissive: '#ff8700', emissiveIntensity: .25 });
  function mesh(geo: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z: number) {
    const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; coach.add(m); return m;
  }
  function box(w: number, h: number, d: number, x: number, y: number, z: number, mat: THREE.Material, radius = .04) {
    return mesh(new RoundedBoxGeometry(w, h, d, 3, Math.min(radius, w / 2, h / 2, d / 2)), mat, x, y, z);
  }
  function line(points: number[][], radius: number, material: THREE.Material) {
    const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p as [number,number,number])));
    return mesh(new THREE.TubeGeometry(curve, 20, radius, 8, false), material, 0, 0, 0);
  }
  function canvasTexture(w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void) {
    const c = document.createElement('canvas'); c.width = w; c.height = h; const ctx = c.getContext('2d')!; draw(ctx);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; textures.push(t); return t;
  }
  function decal(texture: THREE.Texture, w: number, h: number, x: number, y: number, z: number, rotation = 0) {
    const m = mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: texture, transparent: true, roughness: .35, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }), x, y, z);
    m.rotation.y = rotation; m.castShadow = false; return m;
  }
  // Sculpted lower shell, with real wheel arches rather than wheels pasted onto a box.
  const body = new THREE.Shape();
  body.moveTo(-5.8, .43); body.lineTo(-4.63, .43);
  body.absarc(-3.95, .61, .70, Math.PI + .26, -.26, true);
  body.lineTo(2.61, .43); body.absarc(3.29, .61, .70, Math.PI + .26, -.26, true);
  body.lineTo(5.73, .43); body.quadraticCurveTo(5.96, .43, 5.96, .73);
  body.lineTo(5.96, 2.05); body.quadraticCurveTo(5.96, 2.22, 5.72, 2.22);
  body.lineTo(-5.57, 2.22); body.quadraticCurveTo(-5.98, 2.11, -6.02, 1.75);
  body.lineTo(-6.02, .75); body.quadraticCurveTo(-6.02, .43, -5.8, .43);
  const shell = new THREE.ExtrudeGeometry(body, { depth: 2.38, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: .055, bevelThickness: .055, curveSegments: 24 });
  mesh(shell, paint, 0, 0, -1.19);
  box(10.7, .20, 2.08, .05, .49, 0, black, .08);
  // Glazed cabin, satin roof and discreet rooftop HVAC.
  box(11.78, 1.62, 2.42, 0, 2.82, 0, glass, .27);
  box(11.48, .18, 2.34, .10, 3.61, 0, silver, .085);
  box(4.0, .22, 1.46, .70, 3.77, 0, silver, .10);
  for (let i = 0; i < 14; i++) box(.03, .01, .96, -.88 + i * .23, 3.885, 0, black, .004);
  box(1.08, .035, 1.08, -3.35, 3.718, 0, black, .015);
  // Side glazing divisions, service hatches, door edges, reflectors and livery.
  const livery = canvasTexture(2048, 350, ctx => {
    ctx.fillStyle = '#cfd9e7'; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(2048,0); ctx.lineTo(2048,80); ctx.bezierCurveTo(1250,55,650,80,50,230); ctx.lineTo(0,210); ctx.fill();
    ctx.fillStyle = '#f5f7fb'; ctx.beginPath(); ctx.moveTo(700,95); ctx.bezierCurveTo(1180,22,1600,15,2048,48); ctx.lineTo(2048,218); ctx.bezierCurveTo(1540,103,1200,122,700,190); ctx.fill();
    ctx.fillStyle = '#aa142c'; ctx.beginPath(); ctx.moveTo(120,338); ctx.bezierCurveTo(550,230,1210,220,2048,90); ctx.lineTo(2048,152); ctx.bezierCurveTo(1200,290,600,282,120,350); ctx.fill();
    ctx.fillStyle = '#ec3245'; ctx.beginPath(); ctx.moveTo(400,345); ctx.bezierCurveTo(900,285,1600,255,2048,182); ctx.lineTo(2048,203); ctx.bezierCurveTo(1500,292,900,310,400,350); ctx.fill();
    ctx.drawImage(logo, 740, 92, 660, 188);
    // Cut the wheel arches out of the side decal too.
    ctx.globalCompositeOperation = 'destination-out';
    for (const axle of [-3.95, 3.29]) {ctx.beginPath();ctx.ellipse((axle+6.02)/12.04*2048,(2.23-.61)/1.85*350,.73/12.04*2048,.73/1.85*350,0,0,Math.PI*2);ctx.fill();}
  });
  const logoTexture = canvasTexture(1024, 320, ctx => { ctx.fillStyle='#e9edf3';ctx.fillRect(0,0,1024,320);ctx.drawImage(logo, 50, 28, 924, 263); });
  const typeTexture = (text: string, color = '#e9f1ff', size = 80) => canvasTexture(1024, 128, ctx => {ctx.font=`600 ${size}px Arial`;ctx.fillStyle=color;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,512,64);});
  for (const side of [-1,1]) {
    const z = side * 1.252;
    decal(livery, 12.04, 1.85, -.03, 1.305, z + side*.018, side < 0 ? Math.PI : 0);
    for (let i=0;i<8;i++) {
      const x=-4.12+i*1.23;
      box(.055, 1.19, .036, x, 2.84, z-side*.025, black, .012);
      box(1.15, .022, .028, x+.6, 2.24, z-side*.01, silver, .008);
    }
    // Dark bonded passenger windows have soft reflection bands from the studio.
    for (let i=0;i<7;i++) box(.024, 1.09, .015, -3.77+i*1.23, 2.85, z, new THREE.MeshStandardMaterial({ color:'#96b4d2',transparent:true,opacity:.14,metalness:.6,roughness:.15 }), .006).rotation.z=-.14;
    for(const x of [-2.92,-.96,1.0]) {
      line([[x,.52,z+.015*side],[x,1.40,z+.015*side]], .008, seam);
      box(.20,.033,.035,x+.91,1.23,z+.025*side,chrome,.012);
    }
    line([[-3.1,1.43,z], [2.48,1.43,z]], .009, seam);
    for(const x of [-5.25,-1.1,2.0,5.25]) box(.15,.055,.027,x,.62,z+side*.027,amber,.013);
    // Front passenger door, rubber seal and chrome grab rail.
    box(.9,1.39,.025,-5.02,2.72,z,glass,.08);
    line([[-5.52,.53,z+.025*side],[-5.52,3.28,z+.025*side],[-4.53,3.32,z+.025*side],[-4.53,.53,z+.025*side]],.012,black);
    box(.024,.43,.034,-4.63,1.86,z+.04*side,chrome,.01);
    // Rear engine vents.
    for(let i=0;i<10;i++) box(.49,.027,.023,5.14,.85+i*.07,z+side*.026,black,.007);
    // Polished arch trim follows each opening.
    for(const axle of [-3.95,3.29]) {
      const pts=[];for(let j=0;j<=24;j++){const a=Math.PI-j*Math.PI/24;pts.push([axle+Math.cos(a)*.715,.61+Math.sin(a)*.715,z+.025*side]);}line(pts,.017,paint);
    }
  }
  // Front glazing: compound curvature and a slight rearward rake.
  const positions:number[]=[]; const indices:number[]=[];
  const cols=18, rows=12;
  for(let r=0;r<=rows;r++)for(let j=0;j<=cols;j++){
    const u=j/cols*2-1, v=r/rows;
    positions.push(-6.16+.255*v+.055*u*u,1.88+v*1.57,u*(1.13-.06*v));
  }
  for(let r=0;r<rows;r++)for(let j=0;j<cols;j++){const a=r*(cols+1)+j;indices.push(a,a+1,a+cols+1,a+1,a+cols+2,a+cols+1);}
  const windscreen=new THREE.BufferGeometry();windscreen.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));windscreen.setIndex(indices);windscreen.computeVertexNormals();const windMat=glass.clone();windMat.side=THREE.DoubleSide;mesh(windscreen,windMat,0,0,0);
  // The old panel face coincided with the blue shell at x=-6.075 (z-fighting).
  // Give the fascia a real offset; keep its decals in front of the new surface.
  box(.16,.46,2.20,-6.10,1.70,0,glass,.075);
  decal(logoTexture,.95,.29,-6.195,1.81,0,-Math.PI/2);
  decal(typeTexture('EXECUTIVO', '#eaf1ff',76),.76,.096,-6.195,1.48,-.57,-Math.PI/2);
  decal(typeTexture('HUAMBO EXPRESSO', '#dce8fa',70),1.37,.115,-6.098,1.27,0,-Math.PI/2);
  // Front lighting clusters: chrome housings, dark recesses and separate projectors.
  for(const side of [-1,1]) {
    box(.14,.23,.61,-6.028,1.18,side*.88,chrome,.075);
    box(.15,.17,.52,-6.066,1.19,side*.88,black,.065);
    for(let i=0;i<3;i++){
      const lens=mesh(new THREE.CylinderGeometry(.055,.055,.04,24),lamp,-6.157,1.19,side*(.69+i*.145));lens.rotation.z=Math.PI/2;
    }
    line([[-6.17,1.29,side*.64],[-6.17,1.27,side*.92],[-6.12,1.34,side*1.16]],.014,lamp);
    box(.09,.105,.33,-6.058,.70,side*.88,black,.04);
    box(.10,.045,.20,-6.109,.705,side*.88,lamp,.02);
    // Long mirror arms and blue aerodynamic shells.
    line([[-5.60,3.17,side*1.12],[-5.89,3.29,side*1.55],[-6.27,3.19,side*1.64]],.038,black);
    box(.23,.62,.25,-6.24,2.99,side*1.65,paint,.10);
    box(.035,.48,.17,-6.105,2.99,side*1.65,glass,.05);
    // Rear combination lights.
    box(.11,.63,.19,5.99,1.1,side*1.04,black,.07);
    box(.12,.31,.12,6.043,1.24,side*1.04,red,.04);
    box(.12,.13,.12,6.043,.97,side*1.04,amber,.035);
  }
  line([[-6.1,1.47,-1.15],[-6.14,1.37,-.52],[-6.14,1.37,.52],[-6.1,1.47,1.15]],.018,chrome);
  for(let i=0;i<5;i++) box(.04,.017,1.31,-6.09,.85+i*.045,0,black,.005);
  const plate=canvasTexture(512,128,ctx=>{ctx.fillStyle='#ededdf';ctx.fillRect(0,0,512,128);ctx.fillStyle='#112138';ctx.fillRect(0,0,56,128);ctx.font='bold 67px Arial';ctx.textAlign='center';ctx.fillText('LDA 45 • 10 AE',288,90);});
  decal(plate,.68,.15,-6.123,.58,0,-Math.PI/2);
  decal(logoTexture,1.04,.32,6.048,2.73,0,Math.PI/2);
  // Windscreen wipers follow the bowed glass rather than floating in front of it.
  for(const side of [-1,1])line([[-6.18,1.97,side*.27],[-6.058,2.61,side*.51],[-5.982,3.01,side*.59]],.014,black);
  // Two axles, machined hubs, recesses, ten wheel studs and concentric tyre detail.
  for(const x of [-3.95,3.29])for(const side of [-1,1]){
    const z=side*1.16;
    const tyre=mesh(new THREE.CylinderGeometry(.615,.615,.31,64),rubber,x,.615,z);tyre.rotation.x=Math.PI/2;
    for(const radius of [.55,.585]){mesh(new THREE.TorusGeometry(radius,.012,8,64),black,x,.615,z+side*.161);}
    const rim=mesh(new THREE.CylinderGeometry(.405,.405,.325,64),chrome,x,.615,z);rim.rotation.x=Math.PI/2;
    const inside=mesh(new THREE.CylinderGeometry(.326,.326,.332,48),black,x,.615,z);inside.rotation.x=Math.PI/2;
    const hub=mesh(new THREE.CylinderGeometry(x<0?.22:.26,.25,.365,48),silver,x,.615,z);hub.rotation.x=Math.PI/2;
    for(let i=0;i<10;i++){
      const a=i*Math.PI/5;
      const bolt=mesh(new THREE.CylinderGeometry(.026,.026,.025,6),chrome,x+Math.cos(a)*.29,.615+Math.sin(a)*.29,z+side*.185);bolt.rotation.x=Math.PI/2;
    }
    const center=mesh(new THREE.CylinderGeometry(.10,.10,.38,32),chrome,x,.615,z);center.rotation.x=Math.PI/2;
  }
  // Soft contact shadow provides grounding without a visible floor rectangle.
  const shadow=canvasTexture(256,128,ctx=>{ctx.translate(128,64);ctx.scale(1,.45);const g=ctx.createRadialGradient(0,0,8,0,0,120);g.addColorStop(0,'rgba(13,27,46,.32)');g.addColorStop(.48,'rgba(13,27,46,.14)');g.addColorStop(1,'rgba(13,27,46,0)');ctx.fillStyle=g;ctx.fillRect(-128,-142,256,284);});
  const contact=mesh(new THREE.PlaneGeometry(14,6),new THREE.MeshBasicMaterial({map:shadow,transparent:true,depthWrite:false,opacity:.7}),0,.012,0);contact.rotation.x=-Math.PI/2;contact.castShadow=false;contact.receiveShadow=false;
  return { coach, textures };
}
