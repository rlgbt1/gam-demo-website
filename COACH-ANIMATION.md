# Huambo Expresso scroll animation

The homepage uses a lazy-loaded Three.js coach in the first manifesto chapter. It holds a three-quarter pose, turns with the existing GSAP scroll timeline to reveal the side logo, then fades before the sky chapter. No query parameter is required.

The model is an original visual study inspired by the supplied reference, not manufacturer CAD. The supplied Huambo Expresso logo is applied to the model. Geometry and materials are in `src/redesign/coachModel.ts`; rendering and resource cleanup are in `HuamboCoach.tsx`.

WebGL loads near the viewport. Rendering occurs only on scroll/resize changes and stops outside the chapter or when the page is hidden. Reduced motion uses a static pose. The original artwork remains the fallback when WebGL is unavailable.

Hero/company videos and other animation chapters are unchanged.
