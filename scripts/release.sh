#!/usr/bin/env sh

ROOT_DIR="$(dirname $(dirname "$0"))"
PACKAGE_VERSION="v$(node -pe "require('$ROOT_DIR/packages/hooks/package.json').version")"

git tag $PACKAGE_VERSION && git push --tags