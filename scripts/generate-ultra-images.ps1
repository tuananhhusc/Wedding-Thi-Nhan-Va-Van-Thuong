Add-Type -AssemblyName System.Drawing

$sourceDir = "D:\damcuoichigai\public\image"
$galleryOutDir = Join-Path $sourceDir "gallery-ultra"
$heroOutDir = Join-Path $sourceDir "hero-ultra"

foreach ($dir in @($galleryOutDir, $heroOutDir)) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir | Out-Null
    }
}

$galleryLong = 3000
$heroLong = 4200
$quality = 96L

$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters 1
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
    [System.Drawing.Imaging.Encoder]::Quality,
    $quality
)

function Save-ResizedJpeg {
    param(
        [string]$SourcePath,
        [string]$OutputPath,
        [int]$MaxLong
    )

    $img = [System.Drawing.Image]::FromFile($SourcePath)
    $w = $img.Width
    $h = $img.Height

    if ($w -ge $h) {
        $newW = [Math]::Min($MaxLong, $w)
        $newH = [int]($h * $newW / $w)
    } else {
        $newH = [Math]::Min($MaxLong, $h)
        $newW = [int]($w * $newH / $h)
    }

    $bmp = New-Object System.Drawing.Bitmap $newW, $newH
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.DrawImage($img, 0, 0, $newW, $newH)
    $g.Dispose()

    $bmp.Save($OutputPath, $encoder, $encoderParams)
    $bmp.Dispose()
    $img.Dispose()

    return Get-Item $OutputPath
}

$files = Get-ChildItem -Path $sourceDir -Filter "DSC*.jpg" | Sort-Object Name
$index = 1

foreach ($file in $files) {
    $outName = "{0:D2}.jpg" -f $index
    $outPath = Join-Path $galleryOutDir $outName
    $saved = Save-ResizedJpeg -SourcePath $file.FullName -OutputPath $outPath -MaxLong $galleryLong
    $sizeMb = [Math]::Round($saved.Length / 1MB, 2)
    Write-Host "$($file.Name) -> gallery-ultra/$outName ($sizeMb MB)"
    $index++
}

$heroSource = Join-Path $sourceDir "DSC00737.jpg"
$heroOutput = Join-Path $heroOutDir "mobile-hero.jpg"
$heroSaved = Save-ResizedJpeg -SourcePath $heroSource -OutputPath $heroOutput -MaxLong $heroLong
$heroSizeMb = [Math]::Round($heroSaved.Length / 1MB, 2)
Write-Host "DSC00737.jpg -> hero-ultra/mobile-hero.jpg ($heroSizeMb MB)"

Write-Host "Done."
