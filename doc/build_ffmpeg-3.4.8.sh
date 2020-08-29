echo "start build ffmpeg"

cd /data/ffmpeg-3.4.8

rm -rf /data/web-capture/lib/ffmpeg-3.4.8

./configure \
    --prefix=/data/web-capture/lib/ffmpeg-3.4.8

make

make install