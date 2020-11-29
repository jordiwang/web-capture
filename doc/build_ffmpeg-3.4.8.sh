echo "===== start build ffmpeg ====="

NOW_PATH=$(cd $(dirname $0); pwd)

WEB_CAPTURE_PATH=$(cd $NOW_PATH/../; pwd)

FFMPEG_PATH=$(cd $WEB_CAPTURE_PATH/../ffmpeg-3.4.8; pwd)

rm -rf $WEB_CAPTURE_PATH/lib/ffmpeg-3.4.8

cd $FFMPEG_PATH

./configure \
    --prefix=$WEB_CAPTURE_PATH/lib/ffmpeg-3.4.8

make

make install

echo "===== build ffmpeg finished  ====="