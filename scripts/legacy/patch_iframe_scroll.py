with open('public/prototype.html', 'r') as f:
    html = f.read()

script = """
/* Relay scroll to parent window for Next.js Nav */
lenis.on('scroll', (e) => {
  window.parent.postMessage({ type: 'iframe_scroll', scrollY: e.scroll, direction: e.direction }, '*');
});
"""

html = html.replace('// 3. GSAP THEMES', script + '\n// 3. GSAP THEMES')

with open('public/prototype.html', 'w') as f:
    f.write(html)
