import re

with open('public/prototype.html', 'r') as f:
    html = f.read()

# Replace from `const al = $('#al');` to `/* Generic reveals — level 2 */`
new_block = """
const al = $('#al');
function countUp(){ $$('[data-count]', al).forEach(b => { const n = +b.dataset.count, o={v:0}; gsap.to(o,{v:n,duration:1.4,ease:'power2.out',onUpdate:()=>b.textContent=Math.round(o.v)+'+'}); }); }
if (MOTION) {
  const sts = $$('.st', al);
  
  // Set initial state for stack
  al.style.position = 'relative';
  al.style.height = '300px';
  al.style.display = 'flex';
  al.style.justifyContent = 'center';
  al.style.alignItems = 'center';
  
  sts.forEach((s, i) => {
    s.style.position = 'absolute';
    s.style.width = '320px';
    s.style.zIndex = 10 - i;
    gsap.set(s, { opacity: 0, y: 100, scale: 0.9 });
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: al,
      start: 'center center',
      end: '+=250%',
      pin: true,
      scrub: 1,
      onEnter: countUp
    }
  });

  // 1. Card 1 enters
  tl.to(sts[0], { opacity: 1, y: 0, scale: 1, duration: 1 })
  
  // 2. Card 1 left, Card 2 enters
  .to(sts[0], { x: -160, scale: 0.94, opacity: 0.6, duration: 1 }, "+=0.2")
  .to(sts[1], { opacity: 1, y: 0, x: 160, scale: 1, duration: 1 }, "<")
  
  // 3. Card 1 & 2 move left, Card 3 enters
  .to(sts[0], { x: -320, opacity: 0.4, duration: 1 }, "+=0.2")
  .to(sts[1], { x: 0, scale: 0.94, opacity: 0.6, duration: 1 }, "<")
  .to(sts[2], { opacity: 1, y: 0, x: 320, scale: 1, duration: 1 }, "<")
  
  // 4. Final row! 
  .to(sts[0], { x: -492, opacity: 1, scale: 1, duration: 1, ease: 'power2.inOut' }, "+=0.2")
  .to(sts[1], { x: -164, opacity: 1, scale: 1, duration: 1, ease: 'power2.inOut' }, "<")
  .to(sts[2], { x: 164, opacity: 1, scale: 1, duration: 1, ease: 'power2.inOut' }, "<")
  .to(sts[3], { opacity: 1, y: 0, x: 492, scale: 1, duration: 1, ease: 'power2.inOut' }, "<");
}

/* Generic reveals — level 2 */
"""

html = re.sub(r"const al = \$\('#al'\);.*?/\* Generic reveals — level 2 \*/", new_block.strip() + "\n", html, flags=re.DOTALL)

with open('public/prototype.html', 'w') as f:
    f.write(html)
