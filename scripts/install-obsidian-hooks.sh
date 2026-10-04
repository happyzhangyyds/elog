#!/bin/sh
# Install local Git hooks that keep Obsidian index notes in sync.
# Hooks are intentionally local: Git does not distribute .git/hooks on clone.
set -eu

repo=$(git rev-parse --show-toplevel)
cd "$repo"
hooks_dir=$(git rev-parse --git-path hooks)
marker='# managed by elog Obsidian index hooks'

install_hook() {
    hook_name=$1
    hook_path="$hooks_dir/$hook_name"
    if [ -e "$hook_path" ] && ! grep -Fq "$marker" "$hook_path"; then
        printf 'Refusing to replace existing unmanaged hook: %s\n' "$hook_path" >&2
        printf 'Merge the commands from scripts/install-obsidian-hooks.sh manually.\n' >&2
        exit 1
    fi
    mkdir -p "$hooks_dir"
    case "$hook_name" in
        pre-commit)
            printf '%s\n' '#!/bin/sh' "$marker" 'set -eu' 'python3 scripts/build-obsidian-index.py' 'git add -- obsidian' > "$hook_path"
            ;;
        post-merge)
            printf '%s\n' '#!/bin/sh' "$marker" 'set -eu' 'python3 scripts/build-obsidian-index.py' > "$hook_path"
            ;;
    esac
    chmod 755 "$hook_path"
    printf 'Installed %s\n' "$hook_path"
}

install_hook pre-commit
install_hook post-merge

# Keep repository dependencies and site build output out of the local graph.
# The vault config is ignored by Git and never replaces an existing user setup.
settings_dir="$repo/.obsidian"
settings_file="$settings_dir/app.json"
if [ ! -e "$settings_file" ]; then
    mkdir -p "$settings_dir"
    printf '%s\n' '{' '  "userIgnoreFilters": [' '    "node_modules/",' '    "public/"' '  ]' '}' > "$settings_file"
    printf 'Created local Obsidian ignore filters: %s\n' "$settings_file"
fi

printf '%s\n' 'Done. Obsidian changes will regenerate indexes before commits; pulls will refresh local indexes.'
