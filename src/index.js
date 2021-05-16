import WebCapture from './web-capture';

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
        fetch('/dist/web-capture.wasm')
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
        isInit = true;

        self.postMessage({
            type: 'init',
            data: {}
        });
    }
};
