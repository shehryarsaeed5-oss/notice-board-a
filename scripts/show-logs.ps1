$ErrorActionPreference = 'Stop'

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot '..')
Set-Location $repoRoot

$env:PM2_HOME = Join-Path $repoRoot '.pm2'
New-Item -ItemType Directory -Force -Path $env:PM2_HOME | Out-Null

pm2 logs notice-board-a --lines 200
