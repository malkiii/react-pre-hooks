#!/bin/bash

src_directory="$(dirname "$0")/src"
index_file="$src_directory/index.ts"
hooks_files=$(find $src_directory -type f -name 'use*.ts' -maxdepth 1)

# Create or overwrite the index.ts file
echo -n > $index_file

for file in ${hooks_files[@]}; do
  filename=$(basename "${file%.*}")
  exported_hooks=$(grep -oP "(?<=export const )use\w+" $file | sed ':a;N;$!ba;s/\n/, /g')

  echo "export { $exported_hooks } from './$filename';" >> $index_file
done
