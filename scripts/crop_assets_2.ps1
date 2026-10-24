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

# Section 6: Athlete drinking creatine with can
CropImage "$base\section-6-composition.png" "$base\athlete-drinking.png" 280 80 200 230

# Section 7: Comparison creatine jars
CropImage "$base\section-7-comparison.png" "$base\comparison-cans.png" 560 120 150 160

# Section 10: Plan 1, Plan 2, Plan 3 cans
CropImage "$base\section-10-pricing-plans.png" "$base\plan-1-can.png" 310 145 60 85
CropImage "$base\section-10-pricing-plans.png" "$base\plan-2-cans.png" 448 150 96 85
CropImage "$base\section-10-pricing-plans.png" "$base\plan-3-cans.png" 600 155 96 80

Write-Host "Assets cropped successfully!"
