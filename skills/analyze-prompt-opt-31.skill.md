# Skill: analyze prompt-opt

## purpose
Automated analyze for prompt-opt tasks. Execute the analyze step, output ASCII-only results, log each action to disk, and report verifiable evidence (file paths, byte counts, http status codes).

## gates
This skill runs fully offline on the local catalog. No network calls, no payments, no tokens. If a task requires upload/deploy/money, stop and ask for the real input (repo+token / wallet / reviewer id).

## procedure
1. load project list from C:/bingdashan/projects-1000.txt
2. apply analyze to each matching prompt-opt app
3. write results under C:/bingdashan/skills-out/analyze-prompt-opt-31
4. print summary: files= N bytes= N