#!/usr/bin/env bash

src_directory="$(dirname "$0")/src"
index_file="$src_directory/index.ts"
hooks_folders=$(find $src_directory -maxdepth 1 -type d -name 'use*')

# Create or overwrite the index.ts file
echo "/** @run \"pnpm prebuild\" to modify this file */" > $index_file

for folder in ${hooks_folders[@]}; do
  folder_name=$(basename $folder)
  exported_hooks=$(grep -oP "(?<=export const )use\w+" "$folder/index.ts" | sed ':a;N;$!ba;s/\n/, /g')

  echo "export { $exported_hooks } from './$folder_name';" >> $index_file
done
