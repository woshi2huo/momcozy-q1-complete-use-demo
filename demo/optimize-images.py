from concurrent.futures import ThreadPoolExecutor
from io import BytesIO
from pathlib import Path
import hashlib
import json

from PIL import Image, ImageChops


def optimize(source):
    image = Image.open(source).convert('RGBA')
    buffer = BytesIO()
    image.save(buffer, format='WEBP', lossless=True, exact=True, method=4)
    data = buffer.getvalue()
    restored = Image.open(BytesIO(data)).convert('RGBA')
    if any(channel.getbbox() for channel in ImageChops.difference(image, restored).split()):
        raise ValueError(f'Pixel verification failed: {source}')
    digest = hashlib.sha256(data).hexdigest()[:10]
    target = source.parent.parent / 'optimized' / f'{source.stem}.{digest}.webp'
    target.parent.mkdir(exist_ok=True)
    target.write_bytes(data)
    return source.name, './assets/optimized/' + target.name, source.stat().st_size, len(data)


def main():
    root = Path(__file__).resolve().parent
    for demo in ('q1-mobile', 'q1-complete-use'):
        folder = root / demo
        sources = sorted(source for source in (folder / 'assets/hd').iterdir() if source.suffix in ('.png', '.jpg'))
        with ThreadPoolExecutor(max_workers=3) as pool:
            results = list(pool.map(optimize, sources))
        mapping = {name: url for name, url, _, _ in results}
        manifest = 'window.Q1_IMAGE_ASSETS = ' + json.dumps(mapping, ensure_ascii=False, indent=2) + ';\n'
        (folder / 'image-assets.js').write_text(manifest, encoding='utf-8')
        before = sum(result[2] for result in results)
        after = sum(result[3] for result in results)
        print(f'{demo}: {len(results)} images, {before:,} -> {after:,} bytes ({1 - after / before:.1%} smaller)')


if __name__ == '__main__':
    main()
