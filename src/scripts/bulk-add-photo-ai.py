#!/usr/bin/env python3
"""
Script pour ajouter "Photo AI " devant tous les titres qui n'ont pas déjà ce préfixe
dans le fichier ideasData.ts
"""

import re

# Lire le fichier
with open('components/ideasData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern pour trouver tous les titres qui n'ont PAS déjà "Photo AI"
# Utilise une negative lookahead
pattern = r'title: "(?!Photo AI)([^"]+)"'

# Fonction de remplacement
def add_prefix(match):
    original_title = match.group(1)
    return f'title: "Photo AI {original_title}"'

# Compter combien il y en a
matches = re.findall(pattern, content)
print(f"Trouvé {len(matches)} titres sans 'Photo AI' prefix")

# Afficher quelques exemples
if matches:
    print("\nExemples de titres à modifier:")
    for title in matches[:10]:
        print(f"  - {title}")
    
    # Faire le remplacement
    new_content = re.sub(pattern, add_prefix, content)
    
    # Écrire le fichier
    with open('components/ideasData.ts', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"\n✅ Tous les {len(matches)} titres ont été modifiés avec succès!")
    
    # Vérifier qu'il n'en reste plus
    remaining = re.findall(pattern, new_content)
    print(f"Titres restants sans prefix: {len(remaining)}")
else:
    print("✅ Tous les titres ont déjà le prefix 'Photo AI'!")
