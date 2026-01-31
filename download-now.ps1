$ProgressPreference = 'SilentlyContinue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$imagesData = @(
    @{name='whale-watching.jpg'; url='https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&q=80&auto=format&fit=crop'},
    @{name='fernkloof-nature.jpg'; url='https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80&auto=format&fit=crop'},
    @{name='wine-tasting.jpg'; url='https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80&auto=format&fit=crop'},
    @{name='cliff-path.jpg'; url='https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80&auto=format&fit=crop'},
    @{name='grotto-beach.jpg'; url='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80&auto=format&fit=crop'},
    @{name='shark-cage-diving.jpg'; url='https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80&auto=format&fit=crop'},
    @{name='old-harbour.jpg'; url='https://images.unsplash.com/photo-1500877442673-2a37265b5fa3?w=1200&q=80&auto=format&fit=crop'},
    @{name='walker-bay-sunset.jpg'; url='https://images.unsplash.com/photo-1495567720989-cebf7d89d46c?w=1200&q=80&auto=format&fit=crop'},
    @{name='fynbos-flowers.jpg'; url='https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&q=80&auto=format&fit=crop'},
    @{name='local-market.jpg'; url='https://images.unsplash.com/photo-1488854216446-ad6174a8b5cc?w=1200&q=80&auto=format&fit=crop'}
)

$outputDir = 'c:\Users\User-PC\Desktop\folder\src\assets\hermanus'

Write-Host "Downloading REAL stock images from Unsplash..." -ForegroundColor Cyan
Write-Host ""

$successCount = 0

foreach ($item in $imagesData) {
    $filename = $item.name
    $url = $item.url
    $filepath = Join-Path $outputDir $filename
    
    Write-Host -NoNewline "Downloading $filename ... "
    
    try {
        $response = Invoke-WebRequest -Uri $url -OutFile $filepath -ErrorAction Stop -PassThru
        
        $file = Get-Item $filepath
        $sizeKB = [math]::Round($file.Length / 1024, 1)
        
        if ($file.Length -gt 20000) {
            Write-Host "OK ($sizeKB KB)" -ForegroundColor Green
            $successCount++
        } else {
            Write-Host "FAIL - Invalid image size ($sizeKB KB)" -ForegroundColor Red
            Remove-Item $filepath -ErrorAction SilentlyContinue
        }
    } catch {
        Write-Host "FAIL - Download error" -ForegroundColor Red
    }
    
    Start-Sleep -Milliseconds 300
}

Write-Host ""
Write-Host "Successfully downloaded: $successCount/10 images" -ForegroundColor Cyan
Write-Host ""
Write-Host "Files in $outputDir" -ForegroundColor Yellow
Get-ChildItem $outputDir -Filter "*.jpg" | Format-Table Name, @{Name='Size (KB)'; Expression={[math]::Round($_.Length/1024,1)}}
