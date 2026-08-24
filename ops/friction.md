# Friction log — site repo

| Date | Role | Category | Note |
|---|---|---|---|
| 2026-08-24 | site-build | technical | mediabeast runs Node 18; Playwright ≥1.60 requires Node 20+, so browser verification had to run on tsv01 instead of the build machine. Consider upgrading mediabeast Node or standardizing verification on tsv01. |
| 2026-08-24 | site-build | ignorance | tsv01's global Playwright (/usr/lib/node_modules) is not importable by ESM scripts via NODE_PATH; workaround is `ln -sfn /usr/lib/node_modules /tmp/node_modules` next to the script. Worth a note in tsv01's RUNNING.md. |
| 2026-08-24 | site-build | technical | rsync --delete removed DreamHost's root-owned `.dh-diag` symlink from the docroot along with the placeholder files. Harmless (panel diagnostic link), but deploy.sh mirrors exactly — anything DreamHost drops into the docroot will be deleted on next deploy. |
| 2026-08-24 | site-build | ignorance | New repo clones on mediabeast must blank the credential-helper list before adding the tsv-claude PAT helper (`helper = ""` then the PAT line, as tsv-ops does) — otherwise the global gh helper answers first with the wrong account and pushes fail "Repository not found". |
