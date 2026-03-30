import re
import unicodedata
from pathlib import Path

# Read the products data file
path = Path('src/app/data/products-data-new.ts')
text = path.read_text(encoding='utf-8')

# Extract the products array
prod_text = text.split('export const products: Product[] = [', 1)[1].rsplit('];', 1)[0]

# Regex to match each product object
pattern = re.compile(r"""
\{\s*
id:\s*(\d+),\s*
name:\s*"([^"]*)",\s*
price:\s*(\d+)
(?:,\s*originalPrice:\s*(\d+))?
(?:,\s*discount:\s*(\d+))?
,\s*category:\s*'([^']+)',\s*
petType:\s*'([^']+)',\s*
image:\s*([^,]+),\s*
inStock:\s*(true|false)
(?:,\s*stock:\s*(\d+))?
(?:,\s*status:\s*'([^']+)')?
\s*\}
""", re.VERBOSE | re.MULTILINE)

rows = []
for match in pattern.finditer(prod_text):
    id_ = int(match.group(1))
    name = match.group(2)
    price = int(match.group(3))
    original_price = int(match.group(4)) if match.group(4) else None
    discount = int(match.group(5)) if match.group(5) else 0
    category = match.group(6)
    pet_type = match.group(7)
    image = match.group(8)
    in_stock = match.group(9) == 'true'
    stock = int(match.group(10)) if match.group(10) else (50 if in_stock else 0)
    status = match.group(11) if match.group(11) else ('active' if in_stock else 'out-of-stock')

    # Generate slug
    slug = name.lower()
    slug = unicodedata.normalize('NFKD', slug)
    slug = ''.join(ch for ch in slug if not unicodedata.combining(ch))
    slug = re.sub(r'[^a-z0-9]+', '-', slug).strip('-')

    # Description is name for now
    description = name

    # Placeholder image
    image_url = f'https://via.placeholder.com/400x400?text={slug}'

    rows.append((name, slug, description, category, price, original_price, discount, stock, image_url, status))

print(f'Found {len(rows)} products')

# Generate SQL
sql = "INSERT INTO products (name, slug, description, category, price, original_price, discount_percent, stock, image_url, status, featured) VALUES\n"
values = []
for name, slug, desc, category, price, orig_price, disc, stock, img, status in rows:
    name_esc = name.replace("'", "''")
    desc_esc = desc.replace("'", "''")
    img_esc = img.replace("'", "''")
    orig_price_str = str(orig_price) if orig_price else 'NULL'
    values.append(f"  ('{name_esc}', '{slug}', '{desc_esc}', '{category}', {price}, {orig_price_str}, {disc}, {stock}, '{img_esc}', '{status}', false)")

print(sql + ',\n'.join(values) + ';')