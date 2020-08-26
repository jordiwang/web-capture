
class WebCapture {
    constructor(option) {
        this.option = option;

        this.cacheFile = null;
        this.cacheFilePtr = 0;

        window.Module = {
            instantiateWasm: (info, receiveInstance) => {
                fetch('./wasm/capture.wasm')
                    .then(response => {
                        return response.arrayBuffer();
                    })
                    .then(bytes => {
                        return WebAssembly.instantiate(bytes, info);
                    })
                    .then(result => {
                        receiveInstance(result.instance);
                    });
            },
            onRuntimeInitialized: () => {
                if (this.option.onInit) {
                    this.option.onInit();
                }
            }
        };

        this._loadLib();
    }

    _loadLib() {
        let node = document.createElement('script');

        node.onload = () => {
            document.body.removeChild(node);
            node = null;
        };

        node.async = true;
        node.src = './wasm/capture.js';
        node.crossOrigin = 'true';

        document.body.appendChild(node);
    }

    _getImageDataUrl(width, height, imageBuffer) {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');

        canvas.width = width;
        canvas.height = height;

        let imageData = ctx.createImageData(width, height);

        let j = 0;
        for (let i = 0; i < imageBuffer.length; i++) {
            if (i && i % 3 == 0) {
                imageData.data[j] = 255;
                j += 1;
            }

            imageData.data[j] = imageBuffer[i];
            j += 1;
        }

        ctx.putImageData(imageData, 0, 0, 0, 0, width, height);

        return canvas.toDataURL('image/jpeg');
    }

    _getImageInfo(imgDataPtr) {
        let width = Module.HEAPU32[imgDataPtr / 4],
            height = Module.HEAPU32[imgDataPtr / 4 + 1],
            duration = Module.HEAPU32[imgDataPtr / 4 + 2],
            imageBufferPtr = Module.HEAPU32[imgDataPtr / 4 + 3],
            imageBuffer = Module.HEAPU8.subarray(imageBufferPtr, imageBufferPtr + width * height * 3);

        Module._free(imgDataPtr);
        Module._free(imageBufferPtr);

        return {
            width,
            height,
            duration,
            imageBuffer
        };
    }

    setFile(file, callback) {
        // this.cacheFile = file;

        //         if (this.cacheFilePtr) {

        //             Module._free(this.cacheFilePtr);
        //         }
        let fileReader = new FileReader();
        let filePtr = 0;

        fileReader.onload = () => {
            let fileBuffer = new Uint8Array(fileReader.result);

            setInterval(() => {



                if (filePtr > 0) {
                    Module._free(filePtr);
                }


                filePtr = Module._malloc(fileBuffer.length)

                Module.HEAP8.set(fileBuffer, filePtr);


                let code = Module._setFile(filePtr, fileBuffer.length);

                console.log(code);
                console.log(filePtr);

            }, 1000);


            // filePtr = Module._malloc(fileBuffer.length);


            // console.log('==========', filePtr);

            // this.cacheFilePtr = filePtr;

            // Module.HEAP8.set(fileBuffer, filePtr);

            // let code = Module._setFile(filePtr, fileBuffer.length);


            // callback(filePtr);
        };

        fileReader.readAsArrayBuffer(file);




    }

    capture(file, timeStamp, callback) {
        if (file === this.cacheFile) {
            let imgDataPtr = Module._capture(timeStamp);

            let imgInfo = this._getImageInfo(imgDataPtr);

            let dataUrl = this._getImageDataUrl(imgInfo.width, imgInfo.height, imgInfo.imageBuffer);

            callback(dataUrl, imgInfo);
        } else {
            this.setFile(file, () => {
                let imgDataPtr = Module._capture(timeStamp);

                let imgInfo = this._getImageInfo(imgDataPtr);

                let dataUrl = this._getImageDataUrl(imgInfo.width, imgInfo.height, imgInfo.imageBuffer);

                callback(dataUrl, imgInfo);
            });
        }
    }
}

window.WebCapture = WebCapture;

export default WebCapture;
