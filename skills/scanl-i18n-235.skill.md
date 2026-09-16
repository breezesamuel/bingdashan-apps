# Skill: scanl i18n

## purpose
Automated scanl for i18n tasks. Execute the scanl step, output ASCII-only results, log each action to disk, and report verifiable evidence (file paths, byte counts, http status codes).

## gates
This skill runs fully offline on the local catalog. No network calls, no payments, no tokens. If a task requires upload/deploy/money, stop and ask for the real input (repo+token / wallet / reviewer id).

## procedure
1. load project list from C:/bingdashan/projects-1000.txt
2. apply scanl to each matching i18n app
3. write results under C:/bingdashan/skills-out/scanl-i18n-235
4. print summary: files= N bytes= N