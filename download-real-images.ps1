$images = @{
    'whale-watching.jpg' = 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=85&auto=format&fit=crop'
    'fernkloof-nature.jpg' = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=85&auto=format&fit=crop'
    'wine-tasting.jpg' = 'https://images.unsplash.com/photo-1554118811-1e0d58224d09?w=1200&q=85&auto=format&fit=crop'
    'cliff-path.jpg' = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&auto=format&fit=crop'
    'grotto-beach.jpg' = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85&auto=format&fit=crop'
    'shark-cage-diving.jpg' = 'https://images.unsplash.com/photo-1583212192454-1fe6229603b7?w=1200&q=85&auto=format&fit=crop'
    'old-harbour.jpg' = 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&q=85&auto=format&fit=crop'
    'walker-bay-sunset.jpg' = 'https://images.unsplash.com/photo-1495567720989-cebf7d89d46c?w=1200&q=85&auto=format&fit=crop'
    'fynbos-flowers.jpg' = 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&q=85&auto=format&fit=crop'
    'local-market.jpg' = 'https://images.unsplash.com/photo-1488854216446-ad6174a8b5cc?w=1200&q=85&auto=format&fit=crop'
}

$outputDir = 'c:\Users\User-PC\Desktop\folder\src\assets\hermanus'

Write-Host "Downloading real stock photos from Unsplash...`n"

$count = 0
foreach ($filename in $images.Keys) {
    $url = $images[$filename]
    $filepath = Join-Path $outputDir $filename
    
    Write-Host -NoNewline "Downloading $filename... "
    
    try {
        $WebClient = New-Object System.Net.WebClient
        $WebClient.Headers.Add("User-Agent", "Mozilla/5.0")
        $WebClient.DownloadFile($url, $filepath)
        
        $file = Get-Item $filepath
        $sizeKb = [math]::Round($file.Length / 1024, 1)
        Write-Host "[OK] ($sizeKb KB)"
        $count++
    } catch {
        Write-Host "[FAIL] ($($_.Exception.Message))"
    }
}

Write-Host "`n[OK] Downloaded $count/$($images.Count) real stock images"
Write-Host "Images saved to: $outputDir"
