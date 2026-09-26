import re

with open('public/prototype.html', 'r') as f:
    html = f.read()

# Extract main CSS
start = html.find('/* =========================================================')
end = html.find('</style>', start)
css = html[start:end]

# Scoping logic
css = css.replace('html.motion', '.gsap-prototype-root.motion')
css = css.replace('html.cine', '.gsap-prototype-root.cine')
css = css.replace('html.js', '.gsap-prototype-root.js')
css = css.replace('html:not(.js)', '.gsap-prototype-root:not(.js)')
css = css.replace('html:not(.motion)', '.gsap-prototype-root:not(.motion)')
css = css.replace('html:not(.cine)', '.gsap-prototype-root:not(.cine)')
css = css.replace('html.has-cur', '.gsap-prototype-root.has-cur')
css = css.replace('html.show-grid', '.gsap-prototype-root.show-grid')
css = css.replace('html[data-zone-now', '.gsap-prototype-root[data-zone-now')
css = css.replace('*,html,body{', '*, .gsap-prototype-root {')
css = css.replace('body{', '.gsap-prototype-root {')
css = css.replace('html{', '.gsap-prototype-root {')

with open('src/components/home/prototype.css', 'w') as f:
    f.write(css)

