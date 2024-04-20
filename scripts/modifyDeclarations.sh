#!/usr/bin/env bash

# Paths to files
initial_file=".dfx/local/canister_ids.json"
fallback_file="canister_ids.json"

# Read content from the initial file (if exists) or the fallback file
if [ -f "$initial_file" ]; then
    content=$(cat "$initial_file")
else
    content=$(cat "$fallback_file")
fi

# Iterate over each key and process the corresponding file
while IFS= read -r key; do
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
done <<< "$(echo "$content" | jq -r 'keys[]')"

echo "String replaced in all files."
