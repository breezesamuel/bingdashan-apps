# Skill: integrate accessibility

## purpose
Automated integrate for accessibility tasks. Execute the integrate step, output ASCII-only results, log each action to disk, and report verifiable evidence (file paths, byte counts, http status codes).

## gates
This skill runs fully offline on the local catalog. No network calls, no payments, no tokens. If a task requires upload/deploy/money, stop and ask for the real input (repo+token / wallet / reviewer id).

## procedure
1. load project list from C:/bingdashan/projects-1000.txt
2. apply integrate to each matching accessibility app
3. write results under C:/bingdashan/skills-out/integrate-accessibility-164
4. print summary: files= N bytes= N