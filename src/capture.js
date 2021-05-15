
let isMKDIR = false


function capture(file,timeStamp) {
    const MOUNT_DIR = '/working'

    if (!isMKDIR) {
        FS.mkdir(MOUNT_DIR);
        isMKDIR = true
    }

    FS.mount(WORKERFS, { files: [file] }, MOUNT_DIR)

    const c_capture = Module.cwrap('capture', 'number', ['number', 'string']);

   let imgDataPtr = c_capture(timeStamp, `${MOUNT_DIR}/${file.name}`);

    FS.unmount(MOUNT_DIR)

    const evt = {
        type:'capture',
        data:getImageInfo(imgDataPtr)
    }



   self.postMessage(evt,[evt.data.imageBuffer.buffer])
}


function getImageInfo(imgDataPtr) {
    let width = Module.HEAPU32[imgDataPtr / 4],
        height = Module.HEAPU32[imgDataPtr / 4 + 1],
        duration = Module.HEAPU32[imgDataPtr / 4 + 2],
        imageBufferPtr = Module.HEAPU32[imgDataPtr / 4 + 3],
        imageBuffer = Module.HEAPU8.slice(imageBufferPtr, imageBufferPtr + width * height * 3);

    Module._free(imgDataPtr);
    Module._free(imageBufferPtr);

    return {
        width,
        height,
        duration,
        imageBuffer
    };
}

self.addEventListener('message',evt=>{
    console.log('/////////');
    console.log(evt);

    const evtData = evt.data

    if (evtData.type == 'capture') {
        capture(evtData.data.file,evtData.data.timeStamp)
    }
})

self.Module = {
    instantiateWasm: (info, receiveInstance) => {
        fetch('/wasm/capture.wasm')
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
        console.log('========= init ==========');


    }
}

importScripts('/wasm/capture.js')