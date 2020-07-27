echo "start build ffmpeg"

cd /data/ffmpeg-3.3.9

rm -rf /data/web-capture/lib/ffmpeg-3.3.9

./configure \
    --prefix=/data/web-capture/lib/ffmpeg-3.3.9

make

make install