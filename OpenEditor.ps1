# Starts the local Valorant lineup editor (if needed) and opens it in your browser.
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$editorUrl = 'http://127.0.0.1:4322/'

$isRunning = Get-NetTCPConnection -State Listen -LocalPort 4322 -ErrorAction SilentlyContinue

if (-not $isRunning) {
  Start-Process -FilePath 'node' -ArgumentList 'scripts/lineup-editor.mjs' -WorkingDirectory $projectRoot -WindowStyle Hidden

  for ($attempt = 0; $attempt -lt 20; $attempt++) {
    Start-Sleep -Milliseconds 250
    if (Get-NetTCPConnection -State Listen -LocalPort 4322 -ErrorAction SilentlyContinue) {
      break
    }
  }
}

Start-Process $editorUrl
