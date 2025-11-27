#!/bin/bash

# Créer des images placeholder 1x1 pixel PNG (le plus petit PNG valide)
# PNG 1x1 transparent encodé en base64

cd "src/assets"

# Liste de tous les fichiers PNG requis
FILES=(
  "0690a5805cd67144f4f9f4968e8da6dc518fa63d.png"
  "06c17fd60b109f44663983174a9fcffb6a7e8ca4.png"
  "0add018c10f3889f2c712223ec4a093b5ddf753a.png"
  "122dcd2ebe2b9d58e158d5aa006fd43d2ea55ea8.png"
  "16b71f196debb8a02e63c336078a93f05b9711fe.png"
  "2c508c4e08485a8f3e97314d1e81a5ddf454e5a1.png"
  "5d083b8c046522abf88456dc17431671c7a94f0d.png"
  "78561249bdabb10db45f2e19c3785798769f88cb.png"
  "7908cc95b51e4da62111a52533d59e9ff10cea21.png"
  "7b72549a8a77efb9402ca42ba29b2b153272e742.png"
  "889909b48ee021025e71d69b390ad6902f141398.png"
  "8aed63db7b98c23095a2c7c5d9cbdea71c63cebf.png"
  "9fbd94f84c686f8a660346c0a5b33d5f11f2713f.png"
  "a3d62fe320695b906cb3bc1f68f9228f8d43ed2c.png"
  "b45cb94262e9dc3e4f49d97475ceb9570d781443.png"
  "b5d162384a2ba13d77f091ac4c17c3ffe2c0ba8d.png"
  "bfa55256432d7539c6b31bba765fd93642044b16.png"
  "c64c6e3c6e39c9c66e75dde8e3b1ae2feb40a370.png"
  "cd7a3ba47085bb0a7c2fa0d53a61aab19bcb87b9.png"
  "e5d9a2a1cdcb17f07c69550c0cd20071344f5cec.png"
  "ee083d841901de5407c30b4be9b4a42239af9fc0.png"
  "f1baab1b3b8f881d3d83c13cb1c12b8ee0fe7321.png"
  "fd2d84766f3bd55ec81bb9f9d14061be4b7db6eb.png"
  "ffe26301c2af5df48a3eace6ad54f9fb2585a75c.png"
)

# PNG 1x1 transparent minimal (en base64)
PNG_BASE64="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="

# Créer chaque fichier PNG
for file in "${FILES[@]}"; do
  echo "$PNG_BASE64" | base64 -d > "$file"
  echo "Created: $file"
done

# GIF placeholder (GIF 1x1 transparent)
GIF_BASE64="R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
echo "$GIF_BASE64" | base64 -d > "52f7e7d0adee03854e33fae60c4b2d16b8b1e46e.gif"
echo "Created: 52f7e7d0adee03854e33fae60c4b2d16b8b1e46e.gif"

echo "✅ All placeholder images created!"
