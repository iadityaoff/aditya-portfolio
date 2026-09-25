import re

with open('public/prototype.html', 'r') as f:
    html = f.read()

# Add a specific CSS rule for previous cards: 
# If .pf has .done class, make it scale down. We'll update the JS to set .done on previous cards.

css_patch = """
.pf.done{transform:scale(0.92); opacity:0.4}
"""
html = html.replace('.pf.on{border-color:var(--accent-dk)}', '.pf.on{border-color:var(--accent-dk)}\n' + css_patch)


js_patch = """
    onUpdate:() => {
      pfs.forEach((pf,k) => { 
        const r = pf.getBoundingClientRect(); 
        const isPast = r.right < innerWidth*.3;
        const isOn = r.left < innerWidth*.62 && !isPast;
        pf.classList.toggle('on', isOn);
        pf.classList.toggle('done', isPast);
        if (links[k]) links[k].parentElement.style.setProperty('--d', clamp((innerWidth*.9 - r.right)/260, 0, 1).toFixed(3)); 
      });
    } } });
"""

html = re.sub(r'onUpdate:\(\) => \{.*?\} \} \}\);', js_patch.strip(), html, flags=re.DOTALL)

with open('public/prototype.html', 'w') as f:
    f.write(html)
