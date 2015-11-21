import json

poem_titles = ['disorder','to_send']
poems = {}
for title in poem_titles:
    f = open('assets/'+title+'.txt')
    lines = []
    
    for line in f:
        lines.append(line)
    poems[title] = lines
    f.close()
    
with open('assets/poems.json', 'w') as outfile:
    json.dump(poems, outfile)
    