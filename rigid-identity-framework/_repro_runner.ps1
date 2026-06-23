$ErrorActionPreference = 'Continue'
$root = $PSScriptRoot

# unit = @{ id; dir; base }
$units = @(
  @{ id='basecore';   dir='basecore';                              base='BASECORE' },
  @{ id='paper1';     dir='paper1';                                base='main' },
  @{ id='paper2';     dir='paper2';                                base='main' },
  @{ id='paper3';     dir='paper3';                                base='main' },
  @{ id='paper4';     dir='paper4';                                base='main' },
  @{ id='paper5';     dir='paper5_operational_consciousness';      base='main' },
  @{ id='paper6';     dir='paper6_predictions_falsation';          base='main' },
  @{ id='paper7';     dir='paper7_operational_life_subjecthood';   base='main' },
  @{ id='paper8';     dir='paper8_first_person_subjectivity';      base='main' },
  @{ id='paper9';     dir='paper9_phenomenal_bridge_organization'; base='main' },
  @{ id='paper10';    dir='paper10_external_adjudication';         base='main' },
  @{ id='paper_bridge'; dir='paper_bridge_operational_subjecthood'; base='main' },
  @{ id='monolithic'; dir='monolithic';                            base='QICN_MONOLITHIC' }
)

$results = @()

foreach ($u in $units) {
  $dir = Join-Path $root $u.dir
  $base = $u.base
  Write-Host "==== COMPILING $($u.id) in $dir ===="
  Push-Location $dir

  $e1 = $null; $e2 = $null; $e3 = $null; $e4 = $null
  & pdflatex -interaction=nonstopmode "$base.tex" *> "_p1.out"; $e1 = $LASTEXITCODE
  & biber $base *> "_biber.out"; $e2 = $LASTEXITCODE
  & pdflatex -interaction=nonstopmode "$base.tex" *> "_p3.out"; $e3 = $LASTEXITCODE
  & pdflatex -interaction=nonstopmode "$base.tex" *> "_p4.out"; $e4 = $LASTEXITCODE

  $logPath = "$base.log"
  $pdfPath = "$base.pdf"

  $undefRefs = 0; $undefCites = 0; $multiLabels = 0; $pages = $null; $sha = $null
  $citeList = @(); $errSnippet = ''
  if (Test-Path $logPath) {
    $log = Get-Content $logPath -Raw -ErrorAction SilentlyContinue
    $logLines = Get-Content $logPath -ErrorAction SilentlyContinue
    # undefined references / citations summary line
    $undefRefs = ([regex]::Matches($log, 'reference\s+`[^'']*'' on page')).Count
    $citeMatches = [regex]::Matches($log, "Citation `([^']*)' (?:on page [^ ]+ )?undefined")
    $undefCites = $citeMatches.Count
    $citeList = @($citeMatches | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique)
    $multiLabels = ([regex]::Matches($log, 'multiply defined')).Count
    $pm = [regex]::Match($log, 'Output written on .+ \((\d+) pages?')
    if ($pm.Success) { $pages = [int]$pm.Groups[1].Value }
    # error snippet (lines beginning with !)
    $errLines = @($logLines | Where-Object { $_ -match '^! ' } | Select-Object -First 5)
    $errSnippet = ($errLines -join ' || ')
  }
  if (Test-Path $pdfPath) {
    $sha = (Get-FileHash $pdfPath -Algorithm SHA256).Hash
  }

  $compiled = (Test-Path $pdfPath) -and ($pages -ne $null)
  if (-not $compiled) {
    $status = 'FAIL'
  } elseif ($undefRefs -eq 0 -and $undefCites -eq 0 -and $multiLabels -eq 0) {
    $status = 'CLEAN'
  } else {
    $status = 'WARN'
  }

  $results += [PSCustomObject]@{
    id = $u.id
    dir = $u.dir
    pdf = (Join-Path $u.dir "$base.pdf")
    exit_pdflatex_1 = $e1
    exit_biber = $e2
    exit_pdflatex_2 = $e3
    exit_pdflatex_3 = $e4
    pages = $pages
    sha256 = $sha
    undefined_refs = $undefRefs
    undefined_citations = $undefCites
    undefined_citation_keys = $citeList
    multiply_defined_labels = $multiLabels
    error_snippet = $errSnippet
    status = $status
  }

  # cleanup transient capture files
  Remove-Item "_p1.out","_biber.out","_p3.out","_p4.out" -ErrorAction SilentlyContinue
  Pop-Location
}

$out = Join-Path $root "_repro_results.json"
$results | ConvertTo-Json -Depth 5 | Set-Content $out -Encoding UTF8
Write-Host "==== DONE -> $out ===="
$results | Format-Table id,pages,status,undefined_refs,undefined_citations,multiply_defined_labels -AutoSize

