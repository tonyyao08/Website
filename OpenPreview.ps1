# Starts the local Astro preview server (if needed) and opens the Valorant lineup page.
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$previewUrl = 'http://127.0.0.1:4321/Website/tools/valorant-lineups/'

$isRunning = Get-NetTCPConnection -State Listen -LocalPort 4321 -ErrorAction SilentlyContinue

if (-not $isRunning) {
  $command = '$env:ASTRO_TELEMETRY_DISABLED = ''1''; npm.cmd run dev -- --host 127.0.0.1'
  Start-Process -FilePath 'powershell.exe' -ArgumentList '-NoProfile', '-Command', $command -WorkingDirectory $projectRoot -WindowStyle Hidden

  for ($attempt = 0; $attempt -lt 20; $attempt++) {
    Start-Sleep -Milliseconds 250
    if (Get-NetTCPConnection -State Listen -LocalPort 4321 -ErrorAction SilentlyContinue) {
      break
    }
  }
}

Start-Process $previewUrl
