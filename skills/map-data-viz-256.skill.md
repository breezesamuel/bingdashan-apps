# Skill: map data-viz

## purpose
Automated map for data-viz tasks. Execute the map step, output ASCII-only results, log each action to disk, and report verifiable evidence (file paths, byte counts, http status codes).

## gates
This skill runs fully offline on the local catalog. No network calls, no payments, no tokens. If a task requires upload/deploy/money, stop and ask for the real input (repo+token / wallet / reviewer id).

## procedure
1. load project list from C:/bingdashan/projects-1000.txt
2. apply map to each matching data-viz app
3. write results under C:/bingdashan/skills-out/map-data-viz-256
4. print summary: files= N bytes= N