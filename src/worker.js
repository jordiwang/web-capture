class WebCapture {
    constructor() {
        this.isMKDIR = false;

        this.cCapture = null;
    }

    _getImageInfo(imgDataPtr) {
        let width = Module.HEAPU32[imgDataPtr / 4],
            height = Module.HEAPU32[imgDataPtr / 4 + 1],
            duration = Module.HEAPU32[imgDataPtr / 4 + 2],
            imageBufferPtr = Module.HEAPU32[imgDataPtr / 4 + 3],
            imageBuffer = Module.HEAPU8.slice(imageBufferPtr, imageBufferPtr + width * height * 3);

        Module._free(imgDataPtr);
        Module._free(imageBufferPtr);

        const imageDataBuffer = new Uint8ClampedArray(width * height * 4);

        let j = 0;
        for (let i = 0; i < imageBuffer.length; i++) {
            if (i && i % 3 == 0) {
                imageDataBuffer[j] = 255;
                j += 1;
            }

            imageDataBuffer[j] = imageBuffer[i];
            j += 1;
        }

        return {
            width,
            height,
            duration,
            imageDataBuffer
        };
    }

    capture({ file, timeStamp }) {
        const MOUNT_DIR = '/working';

        if (!this.isMKDIR) {
            FS.mkdir(MOUNT_DIR);
            this.isMKDIR = true;
        }

        FS.mount(WORKERFS, { files: [file] }, MOUNT_DIR);

        if (!this.cCapture) {
            this.cCapture = Module.cwrap('capture', 'number', ['number', 'string']);
        }

        let imgDataPtr = this.cCapture(timeStamp, `${MOUNT_DIR}/${file.name}`);

        FS.unmount(MOUNT_DIR);

        const evt = {
            type: 'capture',
            data: this._getImageInfo(imgDataPtr)
        };

        self.postMessage(evt, [evt.data.imageDataBuffer.buffer]);
    }
}

const webCapture = new WebCapture();

let isInit = false;

self.onmessage = function (evt) {
    const evtData = evt.data;

    if (isInit && webCapture[evtData.type]) {
        webCapture[evtData.type](evtData.data);
    }
};

self.Module = {
    instantiateWasm: (info, receiveInstance) => {
        var binary_string = self.atob(WASM_STRING);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }

        WebAssembly.instantiate(bytes, info).then(result => {
            receiveInstance(result.instance);
        });
    },
    onRuntimeInitialized: () => {
        isInit = true;

        self.postMessage({
            type: 'init',
            data: {}
        });
    }
};
