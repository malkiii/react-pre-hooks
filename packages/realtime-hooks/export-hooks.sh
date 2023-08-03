#!/usr/bin/env bash

src_directory="$(dirname "$0")/src"
index_file="$src_directory/index.ts"
hooks_files=$(find $src_directory -maxdepth 1 -type d -name 'use*')

# Create or overwrite the index.ts file
echo "/** @run \"pnpm prebuild\" to modify this file */" > $index_file

for file in ${hooks_files[@]}; do
  filename=$(basename $file)
  exported_hooks=$(grep -oP "(?<=export const )use\w+" "$file/index.ts" | sed ':a;N;$!ba;s/\n/, /g')

  echo "export { $exported_hooks } from './$filename';" >> $index_file
done
