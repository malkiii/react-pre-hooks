#!/usr/bin/env bash

src_directory="$(dirname "$0")/src"
index_file="$src_directory/index.ts"
hooks_folders=$(find $src_directory -maxdepth 1 -type d -name 'use*')

# Create or overwrite the index.ts file
echo "/** @run \"pnpm prebuild\" to modify this file */" > $index_file

export_with() {
  for folder in ${hooks_folders[@]}; do
    folder_name=$(basename $folder)
    exports=$(grep -oP "$2" "$folder/index.ts" | sed ':a;N;$!ba;s/\n/, /g')

    if [ -n "$exports" ]; then
      echo "export $1{ $exports } from './$folder_name';" >> $index_file
    fi
  done
}

# export hooks
export_with "" "(?<=export const )use\w+"

echo "" >> $index_file

# export types
export_with "type " "(?<=export type )\w+"