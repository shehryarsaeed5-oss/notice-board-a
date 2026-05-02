$ErrorActionPreference = 'Stop'

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot '..')
Set-Location $repoRoot

$env:PM2_HOME = Join-Path $repoRoot '.pm2'
New-Item -ItemType Directory -Force -Path $env:PM2_HOME | Out-Null

pm2 restart notice-board-a --update-env
if ($LASTEXITCODE -ne 0) {
  pm2 start ecosystem.config.js --env production
}

pm2 status notice-board-a
