#!/bin/sh

echo "===== start build wasm ====="

NOW_PATH=$(cd $(dirname $0); pwd)

WEB_CAPTURE_PATH=$(cd $NOW_PATH/../; pwd)

FFMPEG_PATH=$(cd $WEB_CAPTURE_PATH/lib/ffmpeg-emcc; pwd)

TOTAL_MEMORY=33554432

source $WEB_CAPTURE_PATH/../emsdk/emsdk_env.sh

rm -rf $WEB_CAPTURE_PATH/dist

mkdir $WEB_CAPTURE_PATH/dist

emcc $WEB_CAPTURE_PATH/src/capture.c $FFMPEG_PATH/lib/libavformat.a $FFMPEG_PATH/lib/libavcodec.a $FFMPEG_PATH/lib/libswscale.a $FFMPEG_PATH/lib/libavutil.a \
    -O3 \
    -lworkerfs.js \
    --pre-js $WEB_CAPTURE_PATH/tmp/capture.js \
    -I "$FFMPEG_PATH/include" \
    -s WASM=1 \
    -s TOTAL_MEMORY=$TOTAL_MEMORY \
    -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' \
    -s EXPORTED_FUNCTIONS='["_main", "_free", "_capture"]' \
    -s ASSERTIONS=0 \
    -s ALLOW_MEMORY_GROWTH=1 \
    -o $WEB_CAPTURE_PATH/dist/web-capture.js

echo "===== build wasm finished  ====="
