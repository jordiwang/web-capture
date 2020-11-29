echo "===== start build ffmpeg-emcc ====="

NOW_PATH=$(cd $(dirname $0); pwd)

WEB_CAPTURE_PATH=$(cd $NOW_PATH/../; pwd)

FFMPEG_PATH=$(cd $WEB_CAPTURE_PATH/../ffmpeg-3.4.8; pwd)

source $WEB_CAPTURE_PATH/../emsdk/emsdk_env.sh

rm -rf  $WEB_CAPTURE_PATH/lib/ffmpeg-emcc

mkdir $WEB_CAPTURE_PATH/lib/ffmpeg-emcc

cd $FFMPEG_PATH

make clean

emconfigure ./configure \
    --prefix=$WEB_CAPTURE_PATH/lib/ffmpeg-emcc \
    --cc="emcc" \
    --cxx="em++" \
    --ar="emar" \
    --cpu=generic \
    --target-os=none \
    --arch=x86_32 \
    --enable-gpl \
    --enable-version3 \
    --enable-cross-compile \
    --disable-logging \
    --disable-programs \
    --disable-ffmpeg \
    --disable-ffplay \
    --disable-ffprobe \
    --disable-ffserver \
    --disable-doc \
    --disable-swresample \
    --disable-postproc  \
    --disable-avfilter \
    --disable-pthreads \
    --disable-w32threads \
    --disable-os2threads \
    --disable-network \
    --disable-everything \
    --enable-protocol=file \
    --enable-demuxer=mov \
    --enable-demuxer=matroska \
    --enable-demuxer=flv \
    --enable-demuxer=avi \
    --enable-decoder=h264 \
    --enable-decoder=hevc \
    --enable-decoder=mpeg4 \
    --enable-decoder=vp8 \
    --enable-decoder=vp9 \
    --enable-decoder=wmv3 \
    --disable-asm \
    --disable-debug \

make

make install

echo "===== build ffmpeg-emcc finished  ====="