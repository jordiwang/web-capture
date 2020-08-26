source /data/emsdk/emsdk_env.sh

cd ../wasm

rm -rf capture.wasm capture.js

export TOTAL_MEMORY=33554432

export FFMPEG_PATH=/data/web-capture/lib/ffmpeg-emcc

export CLIB_PATH=/data/web-capture/clib

echo "Running Emscripten..."
emcc ${CLIB_PATH}/capture.c ${FFMPEG_PATH}/lib/libavformat.a ${FFMPEG_PATH}/lib/libavcodec.a ${FFMPEG_PATH}/lib/libswscale.a ${FFMPEG_PATH}/lib/libavutil.a \
    -O3 \
    -I "${FFMPEG_PATH}/include" \
    -s WASM=1 \
    -s TOTAL_MEMORY=${TOTAL_MEMORY} \
    -s EXPORTED_FUNCTIONS='["_main", "_free", "_realloc", "_malloc", "_memset", "_capture", "_setFile"]' \
    -s ASSERTIONS=1 \
    -s ALLOW_MEMORY_GROWTH=1 \
    -o /data/web-capture/wasm/capture.js

echo "Finished Build"
