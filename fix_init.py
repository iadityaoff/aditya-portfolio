with open('src/components/home/init-prototype.ts', 'r') as f:
    content = f.read()

# Replace document.documentElement with root
content = content.replace('const d = document.documentElement;', 'const d = root;')
# Replace r=document with r=root
content = content.replace('r=document', 'r=root')
# Fix HAS_G
content = content.replace('const HAS_G = !!(window.gsap && window.ScrollTrigger);', 'const HAS_G = true;')
# Fix window.Flip
content = content.replace('window.Flip', 'true')
# Fix window.Lenis (we pass lenis)
content = content.replace('window.Lenis', 'true')

with open('src/components/home/init-prototype.ts', 'w') as f:
    f.write(content)
