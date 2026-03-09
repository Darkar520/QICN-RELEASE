# GitHub Release Push Note

Gate: `DG`

## Freeze source
- Local repository root: `C:\Users\irisp\OneDrive\Escritorio\TRADING 3.0`
- Local branch used for freeze: `main`
- Freeze commit: `6ae6f003efa9022bd061071e9f8dd07a8e1ddded`
- Commit message: `Freeze internal scientific release final`

## Remote publication result
- Remote URL: `https://github.com/Darkar520/QUICN-RELEASE.git`
- Remote default branch was not overwritten.
- Frozen release was pushed to the dedicated branch:
  - `internal-scientific-release-final-freeze`

## Why a dedicated branch was used
- `origin/main` already contained older release history and rejected a direct push as non-fast-forward.
- Overwriting `main` would have been a destructive publication choice.
- The freeze was therefore published on a new explicit branch preserving both histories.

## Exact push sequence used
```powershell
git fetch origin main
git push -u origin main:internal-scientific-release-final-freeze
```

## Package published in the freeze branch
- canonical core and `paper1..paper6`
- `framework_overview_strict`
- `release/references.bib`
- selected final `artifacts/release_audit/` release and claim/freeze documents

## Remaining publication caveat
- Private/public visibility of the GitHub repository itself was not verified from this environment.
- The remote URL supplied by the user was used as-is.
