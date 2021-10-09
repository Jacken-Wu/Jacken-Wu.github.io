from pypinyin import lazy_pinyin

with open('./sim_tra.txt', 'r', encoding='utf-8') as f:
    l = f.read().split(',')
l.sort(key=lambda c: lazy_pinyin(c))
s = ','.join(l)
with open('./sim_tra.txt', 'w', encoding='utf-8') as f:
    f.write(s)
