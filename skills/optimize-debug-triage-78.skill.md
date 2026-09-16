# Skill: optimize debug-triage

## purpose
Automated optimize for debug-triage tasks. Execute the optimize step, output ASCII-only results, log each action to disk, and report verifiable evidence (file paths, byte counts, http status codes).

## gates
This skill runs fully offline on the local catalog. No network calls, no payments, no tokens. If a task requires upload/deploy/money, stop and ask for the real input (repo+token / wallet / reviewer id).

## procedure
1. load project list from C:/bingdashan/projects-1000.txt
2. apply optimize to each matching debug-triage app
3. write results under C:/bingdashan/skills-out/optimize-debug-triage-78
4. print summary: files= N bytes= N