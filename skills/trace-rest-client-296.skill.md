# Skill: trace rest-client

## purpose
Automated trace for rest-client tasks. Execute the trace step, output ASCII-only results, log each action to disk, and report verifiable evidence (file paths, byte counts, http status codes).

## gates
This skill runs fully offline on the local catalog. No network calls, no payments, no tokens. If a task requires upload/deploy/money, stop and ask for the real input (repo+token / wallet / reviewer id).

## procedure
1. load project list from C:/bingdashan/projects-1000.txt
2. apply trace to each matching rest-client app
3. write results under C:/bingdashan/skills-out/trace-rest-client-296
4. print summary: files= N bytes= N