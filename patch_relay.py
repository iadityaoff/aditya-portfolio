with open('public/prototype.html', 'r') as f:
    html = f.read()

script = """
  lenis.on('scroll', (e) => {
    window.parent.postMessage({ type: 'iframe_scroll', scrollY: e.scroll, direction: e.direction }, '*');
  });
"""

html = html.replace("lenis.on('scroll', ScrollTrigger.update);", "lenis.on('scroll', ScrollTrigger.update);" + script)

with open('public/prototype.html', 'w') as f:
    f.write(html)
