#!/usr/bin/env bash

readonly DENOPATH=${1:-"deno"}
readonly VERSION=$(git tag | sort -r --version-sort | head -n1)

readonly TARGETS=(
    "x86_64-unknown-linux-gnu"
    "x86_64-pc-windows-msvc"
    "x86_64-apple-darwin"
    "aarch64-apple-darwin"
)

for _target in ${TARGETS[@]}
do
    ${DENOPATH} compile --unstable --lite --allow-net \
        -o output/forchure.${VERSION}.${_target} \
        src/forchure.ts
done