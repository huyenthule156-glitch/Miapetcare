$content = Get-Content -Raw 'src/app/data/products-data-new.ts'
$start = @'
export const products: Product[] = [
'@
$end = @'
];
'@
$startEscaped = [regex]::Escape($start)
$endEscaped = [regex]::Escape($end)
$productsText = (($content -split $startEscaped , 2)[1] -split $endEscaped , 2)[0]
$pattern = '\{\s*id:\s*(\d+),\s*name:\s*"([^"]*)",\s*price:\s*(\d+)(?:,\s*originalPrice:\s*(\d+))?(?:,\s*discount:\s*(\d+))?,\s*category:\s*''([^'']+)''\s*,\s*petType:\s*''([^'']+)''\s*,\s*image:\s*([^,]+),\s*inStock:\s*(true|false)(?:,\s*stock:\s*(\d+))?(?:,\s*status:\s*''([^'']+)''\s*)?\s*\}'
$matches = [regex]::Matches($productsText, $pattern, [System.Text.RegularExpressions.RegexOptions]::Singleline)
Write-Host "Found $($matches.Count) products"
$sql = "INSERT INTO products (name, slug, description, category, price, original_price, discount_percent, stock, image_url, status, featured) VALUES`n"
$values = @()
foreach ($match in $matches) {
  $id = [int]$match.Groups[1].Value
  $name = $match.Groups[2].Value
  $price = [int]$match.Groups[3].Value
  $originalPrice = if ($match.Groups[4].Success) { [int]$match.Groups[4].Value } else { $null }
  $discount = if ($match.Groups[5].Success) { [int]$match.Groups[5].Value } else { 0 }
  $category = $match.Groups[6].Value
  $petType = $match.Groups[7].Value
  $image = $match.Groups[8].Value
  $inStock = $match.Groups[9].Value -eq 'true'
  $stock = if ($match.Groups[10].Success) { [int]$match.Groups[10].Value } else { if ($inStock) { 50 } else { 0 } }
  $status = if ($match.Groups[11].Success) { $match.Groups[11].Value } else { if ($inStock) { 'active' } else { 'out-of-stock' } }
  $slug = $name.ToLower() -replace '[^a-z0-9]+', '-' -replace '^-|-$', ''
  $description = $name
  $imageUrl = "https://via.placeholder.com/400x400?text=$slug"
  $nameEsc = $name -replace "'", "''"
  $descEsc = $description -replace "'", "''"
  $imgEsc = $imageUrl -replace "'", "''"
  $origPriceStr = if ($originalPrice) { $originalPrice.ToString() } else { 'NULL' }
  $values += "  ('$nameEsc', '$slug', '$descEsc', '$category', $price, $origPriceStr, $discount, $stock, '$imgEsc', '$status', false)"
}
$sql + ($values -join ",`n") + ';'