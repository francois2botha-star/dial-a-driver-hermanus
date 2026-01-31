#!/usr/bin/env python3
"""
Download and optimize Hermanus images from Unsplash and save them locally.
This script fetches high-quality images and optimizes them for web use.
"""

import os
import requests
from PIL import Image
from io import BytesIO
import sys

# Image URLs from Unsplash (high-quality, royalty-free)
images = {
    'whale-watching.jpg': 'https://images.unsplash.com/photo-1508264165352-c0bd5f6f4a3a?w=1200&q=80',
    'cliff-path.jpg': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    'grotto-beach.jpg': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    'fernkloof-nature.jpg': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80',
    'wine-tasting.jpg': 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1200&q=80',
    'shark-cage-diving.jpg': 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&q=80',
    'old-harbour.jpg': 'https://images.unsplash.com/photo-1500877442673-2a37265b5fa3?w=1200&q=80',
    'walker-bay-sunset.jpg': 'https://images.unsplash.com/photo-1495567720989-cebf7d89d46c?w=1200&q=80',
    'fynbos-flowers.jpg': 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&q=80',
    'local-market.jpg': 'https://images.unsplash.com/photo-1488854216446-ad6174a8b5cc?w=1200&q=80',
}

# Output directory
output_dir = os.path.join(os.path.dirname(__file__), 'src', 'assets', 'hermanus')

# Create directory if it doesn't exist
os.makedirs(output_dir, exist_ok=True)

def download_and_optimize(filename, url):
    """Download image and optimize for web."""
    try:
        print(f'Downloading {filename}...', end=' ')
        response = requests.get(url, timeout=10)
        response.raise_for_status()

        # Open image
        img = Image.open(BytesIO(response.content))

        # Convert RGBA to RGB if necessary
        if img.mode in ('RGBA', 'LA', 'P'):
            rgb_img = Image.new('RGB', img.size, (255, 255, 255))
            rgb_img.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
            img = rgb_img

        # Resize if too large (max 1200px width)
        if img.width > 1200:
            ratio = 1200 / img.width
            new_height = int(img.height * ratio)
            img = img.resize((1200, new_height), Image.Resampling.LANCZOS)

        # Save optimized
        filepath = os.path.join(output_dir, filename)
        img.save(filepath, 'JPEG', quality=85, optimize=True)
        size_kb = os.path.getsize(filepath) / 1024
        print(f'✓ ({size_kb:.1f} KB)')
        return True

    except Exception as e:
        print(f'✗ Error: {str(e)}')
        return False

print('Downloading and optimizing Hermanus images...\n')
success_count = 0
for filename, url in images.items():
    if download_and_optimize(filename, url):
        success_count += 1

print(f'\nCompleted: {success_count}/{len(images)} images downloaded and optimized')
print(f'Images saved to: {output_dir}')
