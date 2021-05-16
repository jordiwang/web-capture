#include <libavcodec/avcodec.h>
#include <libavformat/avformat.h>
#include <libavutil/imgutils.h>
#include <libswscale/swscale.h>

typedef struct {
    uint32_t width;
    uint32_t height;
    uint32_t duration;
    uint8_t *data;
} ImageData;


int main(int argc, char const *argv[]) {
    av_register_all();
    return 0;
}

AVFrame *initAVFrame(AVCodecContext *pCodecCtx, uint8_t **frameBuffer) {
    AVFrame *pFrameRGB = av_frame_alloc();
    if (pFrameRGB == NULL) {
        return NULL;
    }

    int numBytes;
    numBytes = av_image_get_buffer_size(AV_PIX_FMT_RGB24, pCodecCtx->width, pCodecCtx->height, 1);

    *frameBuffer = (uint8_t *)av_malloc(numBytes * sizeof(uint8_t));

    av_image_fill_arrays(pFrameRGB->data, pFrameRGB->linesize, *frameBuffer, AV_PIX_FMT_RGB24, pCodecCtx->width, pCodecCtx->height, 1);

    return pFrameRGB;
}

AVFrame *readAVFrame(AVCodecContext *pCodecCtx, AVFormatContext *pFormatCtx, AVFrame *pFrameRGB, int videoStream, int ms) {
    struct SwsContext *sws_ctx = NULL;

    AVPacket packet;
    AVFrame *pFrame = NULL;

    pFrame = av_frame_alloc();

    sws_ctx = sws_getContext(pCodecCtx->width, pCodecCtx->height, pCodecCtx->pix_fmt, pCodecCtx->width, pCodecCtx->height, AV_PIX_FMT_RGB24, SWS_BILINEAR, NULL, NULL, NULL);

    int timeStamp = ((double)ms / (double)1000) * pFormatCtx->streams[videoStream]->time_base.den / pFormatCtx->streams[videoStream]->time_base.num;

    int ret = av_seek_frame(pFormatCtx, videoStream, timeStamp, AVSEEK_FLAG_BACKWARD);

    if (ret < 0) {
        fprintf(stderr, "av_seek_frame failed\n");
        return NULL;
    }

    while (av_read_frame(pFormatCtx, &packet) >= 0) {
        if (packet.stream_index == videoStream) {
            if (avcodec_send_packet(pCodecCtx, &packet) != 0) {
                fprintf(stderr, "avcodec_send_packet failed\n");
                av_packet_unref(&packet);
                continue;
            }

            if (avcodec_receive_frame(pCodecCtx, pFrame) == 0) {
                sws_scale(sws_ctx, (uint8_t const *const *)pFrame->data, pFrame->linesize, 0, pCodecCtx->height, pFrameRGB->data, pFrameRGB->linesize);

                sws_freeContext(sws_ctx);
                av_frame_free(&pFrame);
                av_packet_unref(&packet);

                return pFrameRGB;
            }
        }
    }

    sws_freeContext(sws_ctx);
    av_frame_free(&pFrame);
    av_packet_unref(&packet);

    return NULL;
}

// 读取帧数据并返回 uint8 buffer
uint8_t *getFrameBuffer(AVFrame *pFrame, AVCodecContext *pCodecCtx) {
    int width = pCodecCtx->width;
    int height = pCodecCtx->height;

    uint8_t *buffer = (uint8_t *)malloc(height * width * 3);
    for (int y = 0; y < height; y++) {
        memcpy(buffer + y * pFrame->linesize[0], pFrame->data[0] + y * pFrame->linesize[0], width * 3);
    }
    return buffer;
}

// 截取指定位置视频画面
ImageData *capture(int ms, char *path) {
    ImageData *imageData = NULL;

    AVFormatContext *pFormatCtx = avformat_alloc_context();  

    if (avformat_open_input(&pFormatCtx, path, NULL, NULL) < 0) {
        fprintf(stderr, "avformat_open_input failed\n");
        return NULL;
    }

    if (avformat_find_stream_info(pFormatCtx, NULL) < 0) {
        fprintf(stderr, "avformat_find_stream_info failed\n");
        return NULL;
    }

    int videoStream = -1;
    for (int i = 0; i < pFormatCtx->nb_streams; i++) {
        if (pFormatCtx->streams[i]->codecpar->codec_type == AVMEDIA_TYPE_VIDEO) {
            videoStream = i;
            break;
        }
    }

    if (videoStream == -1) {
        return NULL;
    }

    AVCodecContext *pCodecCtx = pFormatCtx->streams[videoStream]->codec;

    AVCodec *pCodec = NULL;

    pCodec = avcodec_find_decoder(pCodecCtx->codec_id);
    if (pCodec == NULL) {
        fprintf(stderr, "avcodec_find_decoder failed\n");
        return NULL;
    }

    AVCodecContext *pNewCodecCtx = avcodec_alloc_context3(pCodec);
    if (avcodec_copy_context(pNewCodecCtx, pCodecCtx) != 0) {
        fprintf(stderr, "avcodec_copy_context failed\n");
        return NULL;
    }

    if (avcodec_open2(pNewCodecCtx, pCodec, NULL) < 0) {
        fprintf(stderr, "avcodec_open2 failed\n");
        return NULL;
    }

    if (!pNewCodecCtx) {
        fprintf(stderr, "pNewCodecCtx is NULL\n");
        return NULL;
    }

    uint8_t *frameBuffer;
    AVFrame *pFrameRGB = initAVFrame(pNewCodecCtx, &frameBuffer);
    pFrameRGB = readAVFrame(pNewCodecCtx, pFormatCtx, pFrameRGB, videoStream, ms);

    if (pFrameRGB == NULL) {
        fprintf(stderr, "readAVFrame failed\n");
        return NULL;
    }

    imageData = (ImageData *)malloc(sizeof(ImageData));
    imageData->width = (uint32_t)pNewCodecCtx->width;
    imageData->height = (uint32_t)pNewCodecCtx->height;
    imageData->duration = (uint32_t)pFormatCtx->duration;
    imageData->data = getFrameBuffer(pFrameRGB, pNewCodecCtx);

    avcodec_close(pNewCodecCtx);
    av_free(pCodec);
    avcodec_close(pCodecCtx);
    av_frame_free(&pFrameRGB);    
    av_free(frameBuffer);
    avformat_close_input(&pFormatCtx);

    return imageData;
}
