#!/usr/bin/env bash

files=( "dip721" "user" "event" )

# Iterate over each key and process the corresponding file
for key in "${files[@]}"; do
    if [ "$key" != "__Candid_UI" ] && [ "$key" != "frontend" ] && [ "$key" != "internet_identity" ]; then
        # Construct the file path
        file_path="src/declarations/${key}/index.js"
        sed -i '$d' "$file_path"
        sed -i '$d' "$file_path"

        # Read the file content
        file_content=$(cat "$file_path")

        # Replace a specific string (e.g., "old_value" with "new_value")
        updated_content="${file_content//process.env./import.meta.env.VITE_}"

        # Write the updated content back to the file
        echo "$updated_content" > "$file_path"
    fi
done

echo "String replaced in all files."
