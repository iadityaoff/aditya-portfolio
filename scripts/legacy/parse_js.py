with open('public/prototype.html', 'r') as f:
    html = f.read()

# Get JS
start = html.rfind('<script>') + 8
end = html.rfind('</script>')
js = html[start:end]

# Modify JS for React environment
js = js.replace('const $ = (s, p=d) => p.querySelector(s);', 'const $ = (s, p=d) => p ? p.querySelector(s) : null;')
js = js.replace('const $$ = (s, p=d) => Array.from(p.querySelectorAll(s));', 'const $$ = (s, p=d) => p ? Array.from(p.querySelectorAll(s)) : [];')

# Strip out lenis initialization
import re
js = re.sub(r'const lenis = new Lenis\([^)]+\);', '', js)
js = js.replace("lenis.on('scroll', ScrollTrigger.update);", '')
js = js.replace("gsap.ticker.add((time)=>{ lenis.raf(time * 1000) });", '')
js = js.replace("gsap.ticker.lagSmoothing(0);", '')

# Strip out the block that does lenis = new Lenis
js = re.sub(r'// =========================================================.*?const lenis = new Lenis.*?\};', '', js, flags=re.DOTALL)


output = """import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Flip from "gsap/Flip";

export function initPrototype(root: HTMLElement, lenisRef: any) {
  if (!root) return () => {};
  
  // Register plugins if not already registered
  gsap.registerPlugin(ScrollTrigger, Flip);
  
  const d = root;
  let lenis = lenisRef;
  const MOTION = true;

  // Add state classes
  d.classList.add('js');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduce) d.classList.add('motion');
  if(window.matchMedia('(min-width: 900px) and (hover: hover)').matches && !reduce) d.classList.add('cine');

""" + js + """

  return () => {
    if (typeof teardown !== 'undefined') teardown.forEach(f => f && f());
    ScrollTrigger.getAll().forEach(t => t.kill());
    gsap.killTweensOf('*');
  };
}
"""

with open('src/components/home/init-prototype.ts', 'w') as f:
    f.write(output)
