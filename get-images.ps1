$ErrorActionPreference = 'Continue'
$ProgressPreference = 'SilentlyContinue'

cd 'c:\Users\User-PC\Desktop\folder\src\assets\hermanus'

$urls = @(
    @{ name = 'whale-watching.jpg'; url = 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&q=80' },
    @{ name = 'fernkloof-nature.jpg'; url = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80' },
    @{ name = 'wine-tasting.jpg'; url = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80' },
    @{ name = 'cliff-path.jpg'; url = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80' },
    @{ name = 'grotto-beach.jpg'; url = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80' },
    @{ name = 'shark-cage-diving.jpg'; url = 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80' },
    @{ name = 'old-harbour.jpg'; url = 'https://images.unsplash.com/photo-1500877442673-2a37265b5fa3?w=1200&q=80' },
    @{ name = 'walker-bay-sunset.jpg'; url = 'https://images.unsplash.com/photo-1495567720989-cebf7d89d46c?w=1200&q=80' },
    @{ name = 'fynbos-flowers.jpg'; url = 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&q=80' },
    @{ name = 'local-market.jpg'; url = 'https://images.unsplash.com/photo-1488854216446-ad6174a8b5cc?w=1200&q=80' }
)

Write-Host "Downloading REAL stock images..." -ForegroundColor Cyan
Write-Host ""

$count = 0
foreach ($item in $urls) {
    $name = $item.name
    $url = $item.url
    
    Write-Host -NoNewline "[$count] $name ... "
    
    try {
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        $client = New-Object System.Net.WebClient
        $client.Headers.Add('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)')
        $client.DownloadFile($url, $name)
        
        $fileSize = (Get-Item $name).Length
        $fileSizeKB = [math]::Round($fileSize / 1024, 1)
        
        if ($fileSize -gt 10000) {
            Write-Host "OK ($fileSizeKB KB)" -ForegroundColor Green
            $count++
        }
        else {
            Write-Host "FAIL - too small ($fileSizeKB KB)" -ForegroundColor Red
            Remove-Item $name
        }
    }
    catch {
        Write-Host "FAIL - $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Start-Sleep -Milliseconds 400
}

Write-Host ""
Write-Host "Downloaded $count/10 images" -ForegroundColor Cyan
ls *.jpg | Format-Table Name, @{Name='Size (KB)'; Expression={[math]::Round($_.Length/1024,1)}}
