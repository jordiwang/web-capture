#!/bin/bash

echo "===== start build ====="

NOW_PATH=$(cd $(dirname $0); pwd)

WEB_CAPTURE_PATH=$(cd $NOW_PATH/../; pwd)

cd $WEB_CAPTURE_PATH

rm -rf ./dist/
rm -rf ./tmp/

if [ ! "$1" ]
then
    WASM_PATH="/dist/web-capture.wasm"
else
    WASM_PATH=$1
fi

echo "===== start build js ====="

echo "wasm path is: $WASM_PATH"

export WASM_PATH

npm run webpack

echo "===== finish build js ====="

$WEB_CAPTURE_PATH/script/build_wasm.sh

rm -rf ./tmp/

echo "===== finish build ====="