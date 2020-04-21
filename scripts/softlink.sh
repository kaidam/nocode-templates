#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

function softlink_module() {
  local module="$1"

  if [[ -z "$module" ]]; then
    echo 1>&2 "Module argument required"
    exit 1
  fi

  local package_source_dir=$(realpath "$PWD/../../nocode-toolkit/packages/$module")
  local package_target_dir="$PWD/node_modules/@nocode-works/$module"

  if [ -d "$package_source_dir" ]; then
    echo "Module directory found: $module"
  else
    echo 1>&2 "Module directory not found: $package_source_dir"
    exit 1
  fi

  cp -r "$package_target_dir/node_modules" "/tmp/nocode-temp-node-modules"
  rm -rf $package_target_dir
  cp -r $package_source_dir $package_target_dir
  mv "/tmp/nocode-temp-node-modules" "$package_target_dir/node_modules"

  echo "Code updated for: $module"
}

for module in "$@"; do
  softlink_module "$module"
done