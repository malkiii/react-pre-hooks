#!/usr/bin/env bash

src_directory="$(dirname "$0")/src"
index_file="$src_directory/index.ts"
hooks_files=$(find $src_directory -type f -name 'use*')

# Create or overwrite the index.ts file
echo "/** @run \"pnpm prebuild\" to modify this file */" > $index_file

export_with() {
  for file in ${hooks_files[@]}; do
    name=$(basename $file | sed 's/\.ts$//g')
    exports=$(grep -oP "$2" "$file" | sed ':a;N;$!ba;s/\n/, /g')

    if [ -n "$exports" ]; then
      echo "export $1{ $exports } from './$name';" >> $index_file
    fi
  done
}

# export hooks
export_with "" "(?<=export const )use\w+"

echo "" >> $index_file

# export types
export_with "type " "(?<=export type )\w+"