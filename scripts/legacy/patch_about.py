import re

with open('public/prototype.html', 'r') as f:
    html = f.read()

# Make spans dim by default
css_patch = """
#statement span { opacity: 0.15; transition: opacity 0.4s ease-out; }
#statement span.hl { opacity: 1; }
"""
html = html.replace('.statement{font-size:', css_patch + '.statement{font-size:')

# Add GSAP scrub timeline for #statement spans
js_patch = """
/* Generic reveals — level 2 */
if (MOTION){
  const stSpans = $$('#statement span');
  if (stSpans.length) {
    gsap.to(stSpans, {
      scrollTrigger: {
        trigger: '#statement',
        start: 'top 80%',
        end: 'top 30%',
        scrub: true,
        onUpdate: self => {
          const p = self.progress;
          stSpans.forEach((s, i) => {
            const thresh = (i + 1) / (stSpans.length + 1);
            s.classList.toggle('hl', p > thresh - 0.1);
          });
        }
      }
    });
  }
"""
html = html.replace('/* Generic reveals — level 2 */\nif (MOTION){', js_patch)

with open('public/prototype.html', 'w') as f:
    f.write(html)
