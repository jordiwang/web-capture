class WebCapture {
    constructor(){
        this.captureWorker = new Worker('/src/capture.js')


        this.captureWorker.addEventListener('message',evt=>{
            console.log('==========');
            console.log(evt);

            const evtData = evt.data
            if (evtData.type == 'capture') {
                console.log(evtData.data);


                this.callback(this._getImageDataUrl(evtData.data),evtData.data)
            }
        })
    }

    capture(file,timeStamp,callback){

        const evt = {
            type:'capture',
            data:{
                file,
                timeStamp
            }
        }

        this.captureWorker.postMessage(evt)
        this.callback = callback
    }


    _getImageDataUrl(data) {
        const {width, height, imageBuffer} = data
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
}