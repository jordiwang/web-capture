# web-capture

## 依赖库&编译工具

* ffmpeg-3.4.8
* emscripten-2.0.21

## 支持编码

* H.264
* H.265
* Mpeg2
* Mpeg4
* VP8
* VP9

## 支持格式

* Mkv
* Mov
* Avi
* Mp4
* Webm

## 注意事项

* 建议基于 `Ubuntu` 系统进行编译安装，已知 `Windows`、`Mac`都会出现各种文件丢失和环境不一致导致的问题

* 编译前需要下载 [ffmpeg-3.4.8.tar.xz](http://ffmpeg.org/releases/ffmpeg-3.4.8.tar.xz) 并解压至与 `web-capture` 同级的目录

* `emsdk` 安装目录需要与 `web-capture` 同级


## demo运行

```
npm install

npm run server

http://localhost:3000/demo/index.html

```

## 使用

因为使用 webassembly 的限制，必须在 `web woker` 中才能对文件对象进行直接读取，否则必须讲文件对象拷贝在内存中。故需要使用 `web worker` 的方式进行调用， 示例如下

```js

const captureWorker = new Worker('/dist/web-capture.js');

captureWorker.onmessage = function (evt) {
    console.log('========');
    console.log(evt.data);

    // capture 截取后结果
    if (evt.data.type == 'capture') {
        // imageDataBuffer: Uint8ClampedArray 图像像素数据
        // width: 宽度
        // height: 高度
        // duraion: 视频时长 ms
        const { imageDataBuffer, width, height, duration } = evt.data.data;

        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');

        canvas.width = width;
        canvas.height = height;

        const imageData = new ImageData(imageDataBuffer, width, height);
        ctx.putImageData(imageData, 0, 0, 0, 0, width, height);

        resultContainer.appendChild(canvas);
    }
};

// 获取文件后使用 postMessage 调用 capture 截取视频帧
captureWorker.postMessage({
    type: 'capture',
    data: {
        file,
        timeStamp: 1000      // ms
    }
});

```

## 本地编译

```
npm run build [wasm path]
```

通过 npm run build 编译项目，[wasm path] 为自定义的 wasm 加载路径，最终产物在 dist 目录下

例: 项目计划 wasm 文件存放的 cdn 路径为 `https://cdn.demo.com/wasm/web-capture.wasm`, 则编译命令如下 

```
npm run build https://cdn.demo.com/wasm/web-capture.wasm
```

## 参考文章

https://www.jianshu.com/p/d08c0cff8a77
https://juejin.im/entry/5afd7963f265da0ba3524439
http://dranger.com/ffmpeg/tutorial01.html
https://zhuanlan.zhihu.com/p/40786748
https://blog.csdn.net/shixin_0125/article/details/106937186
https://www.cnblogs.com/renhui/p/6922971.html
https://cloud.tencent.com/developer/article/1393972
https://www.jianshu.com/p/3c95b0471d3a

