import re

with open('public/prototype.html', 'r') as f:
    html = f.read()

# Add transition to html.cine .fr
css_patch = """
html.cine .fr{transition:transform 0.6s var(--ease-out), opacity 0.6s var(--ease-out); transform:scale(0.96); opacity:0.4}
"""
html = html.replace('html.cine .fr{position:absolute;width:1200px;height:740px}', 'html.cine .fr{position:absolute;width:1200px;height:740px}\n' + css_patch)

with open('public/prototype.html', 'w') as f:
    f.write(html)
