import re

with open('public/prototype.html', 'r') as f:
    html = f.read()

# Get content between </header> and first script
content = html.split('</header>')[1]
content = content.split('<script src="https://')[0]

with open('src/components/home/prototype-markup.ts', 'w') as f:
    f.write('export const PROTOTYPE_HTML = `\n')
    f.write(content.replace('`', '\\`'))
    f.write('\n`;\n')
