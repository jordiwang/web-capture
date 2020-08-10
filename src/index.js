class WebCapture {
    constructor(option) {
        this.option = option;

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

    _getImage(width, height, imageBuffer) {
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

    readFile(file, callback) {
        let fileReader = new FileReader();

        fileReader.onload = () => {
            let fileBuffer = new Uint8Array(fileReader.result);
            callback(fileBuffer);
        };

        fileReader.readAsArrayBuffer(file);
    }

    setFile(file, callback) {
        let fileReader = new FileReader();

        fileReader.onload = () => {
            let fileBuffer = new Uint8Array(fileReader.result);

            let filePtr = Module._malloc(fileBuffer.length * 1.5);

            Module.HEAP8.set(fileBuffer, filePtr);

            Module._setFile(filePtr, fileBuffer.length);

            callback(filePtr);
        };

        fileReader.readAsArrayBuffer(file);
    }

    capture(timeStamp) {
        let imgDataPtr = Module._capture(timeStamp);

        let width = Module.HEAPU32[imgDataPtr / 4],
            height = Module.HEAPU32[imgDataPtr / 4 + 1],
            duration = Module.HEAPU32[imgDataPtr / 4 + 2],
            imageBufferPtr = Module.HEAPU32[imgDataPtr / 4 + 3],
            imageBuffer = Module.HEAPU8.subarray(imageBufferPtr, imageBufferPtr + width * height * 3);

        let dataUrl = this._getImage(width, height, imageBuffer);

        Module._free(imgDataPtr);
        Module._free(imageBufferPtr);

        return {
            dataUrl,
            width,
            height,
            duration
        };
    }
}

window.WebCapture = WebCapture;

export default WebCapture;
