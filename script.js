let video = document.querySelector('video');
let recordBtnCont = document.querySelector('.record-btn-cont');
let captureBtnCont = document.querySelector('.capture-btn-cont');
let recordBtn = document.querySelector('.record-btn');
let captureBtn = document.querySelector('.capture-btn');
let recordFlag = false;
let recorder;
let timerId;
let filterCont = document.querySelector('.filter-cont');
let filterIcon = document.querySelector('.filter-icon');
// let filterCont = document.querySelector('.filter-cont');
// media data is stored in chunks
let chunks = [];    
let imageCapture ;
let constraints = {
    video: true,
    audio: true
}

navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{
    video.srcObject = stream;
    
    recorder = new MediaRecorder(stream);
    recorder.addEventListener('start',(e)=>{
        chunks = [];
    })
    recorder.addEventListener('dataavailable',(e)=>{
    chunks.push(e.data);
    })
    recorder.addEventListener('stop',(e)=>{
        // convert chunks to media and download
        let blob = new Blob(chunks, {type: "video/mp4"});
        if(db){
            let videoID = shortid();
            let dbTransaction = db.transaction("video","readwrite");
            let videoStore = dbTransaction.objectStore("video");
            let videoEntry = {
                id: `vid-${videoID}`,
                blobData: blob
            }
            videoStore.add(videoEntry);
        }
        // let a = document.createElement('a');
        // let videoURL = URL.createObjectURL(blob);
        // a.href = videoURL;
        // a.download = "Stream.mp4";
        // a.click()
    })
}) 

recordBtnCont.addEventListener('click',(e)=>{
    if(!recorder)
    return;
    recordFlag = !recordFlag;
    if(recordFlag){
        // start recording
        recorder.start();
        recordBtn.classList.add('scale-record');
        startTimer();
    }else{
        // stop recording
        recorder.stop();
        recordBtn.classList.remove('scale-record');
        stopTimer();
    }

})
let imgID;
captureBtnCont.addEventListener('click',(e)=>{
    captureBtn.classList.add('scale-capture');
    setTimeout(()=>{
        captureBtn.classList.remove('scale-capture');
    },2000);
    let canvas = document.createElement('canvas');
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
    let tool = canvas.getContext("2d");
    if(video.hasAttribute("filter"))
    tool.filter = video.style.filter;
    else{
        tool.filter = getComputedStyle(video).filter;
    }   
    tool.drawImage(video,0,0,canvas.width,canvas.height);
    let imgURL = canvas.toDataURL();
    if(db){
        let imageID = shortid();
        let dbTransaction = db.transaction("image","readwrite");
        let imageStore = dbTransaction.objectStore("image");
        let imageEntry = {
            id: `img-${imageID}`,
            url: imgURL
        }
        imageStore.add(imageEntry);
    }
    // let a = document.createElement('a');
    // a.href = imgURL;
    // a.download = "image.jpg";
    // a.click();
    filterCont.style.display = 'none';
    filterIcon.style.display = 'block';
    
})


let counter = 0;    // total seconds
let timer = document.querySelector('.timer');
function startTimer(){
    
    function displayTimer(){
        let seconds = counter;
        console.log(seconds);
        
        let hours = Number.parseInt(seconds/3600);
        seconds = seconds%3600;
        let minutes = Number.parseInt(seconds/60);
        seconds = seconds%60;
        hours = hours<10?`0${hours}`:hours;
        minutes = minutes<10?`0${minutes}`:minutes;
        seconds = seconds<10?`0${seconds}`:seconds;
        console.log(seconds,69);
        timer.innerText = hours+":"+minutes+":"+seconds;
        counter++;
        // console.log(72);
    }
    timerId = setInterval(displayTimer,1000);
}

function stopTimer(){
    clearInterval(timerId);
    timer.innerText = "";
    counter = 0;
}
