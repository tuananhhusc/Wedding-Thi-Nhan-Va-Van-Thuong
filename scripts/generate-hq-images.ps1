Add-Type -AssemblyName System.Drawing

$sourceDir = "D:\damcuoichigai\public\image"
$outDir = Join-Path $sourceDir "gallery-hq"
if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir | Out-Null
}

$maxLong = 2400
$quality = 92L

$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters 1
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
    [System.Drawing.Imaging.Encoder]::Quality,
    $quality
)

$files = Get-ChildItem -Path $sourceDir -Filter "DSC*.jpg" | Sort-Object Name
$index = 1

foreach ($file in $files) {
    $outName = "{0:D2}.jpg" -f $index
    $outPath = Join-Path $outDir $outName

    $img = [System.Drawing.Image]::FromFile($file.FullName)
    $w = $img.Width
    $h = $img.Height

    if ($w -ge $h) {
        $newW = [Math]::Min($maxLong, $w)
        $newH = [int]($h * $newW / $w)
    } else {
        $newH = [Math]::Min($maxLong, $h)
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

    $bmp.Save($outPath, $encoder, $encoderParams)
    $bmp.Dispose()
    $img.Dispose()

    $sizeMb = [Math]::Round((Get-Item $outPath).Length / 1MB, 2)
    Write-Host "$($file.Name) -> $outName ($newW x $newH, $sizeMb MB)"
    $index++
}

Write-Host "Done. Output: $outDir"
