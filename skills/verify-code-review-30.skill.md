# Skill: verify code-review

## purpose
Automated verify for code-review tasks. Execute the verify step, output ASCII-only results, log each action to disk, and report verifiable evidence (file paths, byte counts, http status codes).

## gates
This skill runs fully offline on the local catalog. No network calls, no payments, no tokens. If a task requires upload/deploy/money, stop and ask for the real input (repo+token / wallet / reviewer id).

## procedure
1. load project list from C:/bingdashan/projects-1000.txt
2. apply verify to each matching code-review app
3. write results under C:/bingdashan/skills-out/verify-code-review-30
4. print summary: files= N bytes= N