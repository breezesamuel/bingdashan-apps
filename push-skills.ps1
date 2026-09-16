$d='C:\bingdashan'
$repo=''   # <<< FILL: owner/repo e.g. yourname/agent-skills
$token=''  # <<< FILL: GitHub personal access token (repo scope)
if(-not $repo -or -not $token){ Write-Output 'MISSING repo or token. This is the only real gate. Fill the two lines above and rerun.'; exit 1 }
$dir="$d\skills"
$api="https://api.github.com/repos/$repo/contents"
Get-ChildItem $dir -Filter *.skill.md | ForEach-Object {
  $name=$_.Name
  $content=[Convert]::ToBase64String([IO.File]::ReadAllBytes($_.FullName))
  $body=@{ message="add skill $name"; content=$content } | ConvertTo-Json -Compress
  $r=Invoke-RestMethod -Method Put -Uri "$api/$name" -Headers @{ Authorization="token $token" } -ContentType 'application/json' -Body $body
  Write-Output "PUT $name -> $($r.content.path)"
}
Write-Output "DONE pushed $(Get-ChildItem $dir -Filter *.skill.md | Measure-Object | Select-Object -ExpandProperty Count) skills"