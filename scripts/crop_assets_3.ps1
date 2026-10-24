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

# Section 11: Payment badges strip
CropImage "$base\section-11-payment-methods.png" "$base\payment-methods-strip.png" 250 170 510 65

Write-Host "Payment strip cropped!"
