Add-Type -AssemblyName System.Drawing
function CropImage($src, $dest, $x, $y, $w, $h) {
    $bmp = [System.Drawing.Bitmap]::FromFile($src)
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = $bmp.Clone($rect, $bmp.PixelFormat)
    $bmp.Dispose()
    $cropped.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    Write-Host "Saved $dest"
}

$base = "C:\Users\hogar\Documents\TOPONE LANDING INDIVIDUAL\public\images\landing"
CropImage "$base\hero-section-1.png" "$base\hero-creatine-can.png" 204 43 273 274
CropImage "$base\cta-product-section-5.png" "$base\cta-creatine-can.png" 508 51 213 226
CropImage "$base\transparency-section-3.png" "$base\transparency-diagram.png" 526 211 215 204

# Also let's crop the 4 athlete images from signals-section-2.png if needed, or we can use the full section!
# Image 2 width 1024, height 394
CropImage "$base\signals-section-2.png" "$base\athlete-1.png" 160 59 173 250
CropImage "$base\signals-section-2.png" "$base\athlete-2.png" 333 59 173 250
CropImage "$base\signals-section-2.png" "$base\athlete-3.png" 506 59 173 250
CropImage "$base\signals-section-2.png" "$base\athlete-4.png" 679 59 173 250

Write-Host "All assets generated successfully!"
