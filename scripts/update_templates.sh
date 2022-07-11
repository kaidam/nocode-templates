#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

export DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

function update_template() {
  local template="$1"

  if [[ -z "$template" ]]; then
    echo 1>&2 "Template argument required"
    exit 1
  fi

  local template_dir=$(realpath "$DIR/../$template")
  cd $template_dir
  yarn template:unlink
  yarn template:upgrade
}

update_template blog
update_template business
update_template central
update_template cv
update_template minimal
update_template standard
