import re
with open('public/prototype.html', 'r') as f:
    html = f.read()

# Currently work items might just be revealed simply, or they have a complex horizontal scroll
# Wait, let's check how .pr is animated first.
