from pathlib import Path
import imghdr
files = ['public/og-image.png', 'src/assets/logo.webp', 'src/assets/Anseru_3 2.png']
for name in files:
    p = Path(name)
    if p.exists():
        print(name, 'exists', imghdr.what(name), p.stat().st_size)
    else:
        print(name, 'missing')
