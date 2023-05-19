setTimeout(()=>{
    // takes some time to load page 
    if(db){

        let galleryCont = document.querySelector(".gallery-cont");
        // image retrieval
        let dbImgTransaction = db.transaction('image',"readonly");
        let imgStore = dbImgTransaction.objectStore("image");
        let imgRequest = imgStore.getAll();
        imgRequest.onsuccess = (e)=>{
            let imgResult = imgRequest.result;
            
            imgResult.forEach((imgObject)=>{
                let mediaElem = document.createElement('div');
                mediaElem.setAttribute('class','media-cont');
                mediaElem.setAttribute('id',imgObject.id);
                mediaElem.innerHTML = `
                <div class="media">
                <img src="${imgObject.url}">
                </div>
                <div class="buttons">
                <div class="download">DOWNLOAD</div>
                <div class="delete">DELETE</div>
                </div>
                `;
                // add the media-cont to gallery
                galleryCont.appendChild(mediaElem);

                // add functionalities of delete and download -> i> enlarge image   ii> delete  iii> download  
                // get enlarge image of clicked image
                let media = mediaElem.querySelector(".media");
                media.addEventListener("click",(e)=>{
                    let bigMedia = document.createElement("div");
                    bigMedia.setAttribute("class","bigMedia-cont")
                    bigMedia.innerHTML = `
                    <span class="material-icons close">
                    close
                    </span>
                    <img src="${imgObject.url}" class="bigMedia">
                    `;
                    galleryCont.appendChild(bigMedia);

                    let closeBtn = bigMedia.querySelector(".close");
                    closeBtn.addEventListener("click",(e)=>{
                        e.target.parentElement.remove();
                    })
                });
                // Delete
                let dltBtn = mediaElem.querySelector(".delete");
                dltBtn.addEventListener("click",(e)=>{
                    let id = e.target.parentElement.parentElement.getAttribute("id");
                
                    // DB removal
                    let dbImgTransaction = db.transaction('image',"readwrite");
                    let imgStore = dbImgTransaction.objectStore("image");
                    imgStore.delete(id);
                    // UI removal
                    e.target.parentElement.parentElement.remove();      
                });

                // Download
                let downloadBtn = mediaElem.querySelector(".download");
                downloadBtn.addEventListener("click",(e)=>{
                    let id = e.target.parentElement.parentElement.getAttribute("id");
                    
                    let dbImgTransaction = db.transaction("image","readwrite");
                    let imageStore = dbImgTransaction.objectStore("image");
                    let imgRequest = imageStore.get(id);
                    imgRequest.onsuccess = (e)=>{
                        // get imgObject from database
                        
                        let imgResult = imgRequest.result;
                        let a = document.createElement('a');
                        a.href = imgResult.url;
                        a.download = "image.jpg";
                        a.click();
                    }
                });
            })
        }
        // videos retrieval
        let dbVidTransaction = db.transaction("video","readonly");
        let videoStore = dbVidTransaction.objectStore("video");
        let videoRequest = videoStore.getAll();     //event driven  requests for all the videos
        videoRequest.onsuccess = (e)=>{
            let videoResult = videoRequest.result;
            
            videoResult.forEach((videoObj)=>{
                let mediaElem = document.createElement('div');
                mediaElem.setAttribute('class','media-cont');
                mediaElem.setAttribute('id',videoObj.id);
                let url = URL.createObjectURL(videoObj.blobData);
                mediaElem.innerHTML = `
                <div class="media">
                    <video autoplay muted loop src="${url}"></video>
                </div>
                <div class="buttons">
                <div class="download">DOWNLOAD</div>
                <div class="delete">DELETE</div>
                </div>
                `;
                // add the media-cont to gallery
                galleryCont.appendChild(mediaElem);
                // add functionalities of delete and download
                
                // video in bigger frame
                let media = mediaElem.querySelector(".media");
                media.addEventListener("click",(e)=>{
                    
                    let bigMedia = document.createElement("div");
                    bigMedia.setAttribute("class","bigMedia-cont");
                    bigMedia.innerHTML = `
                    <span class="material-icons close">
                    close
                    </span>      
                    <video src="${url}" controls class="bigMedia"></video>      
                    `
                    galleryCont.appendChild(bigMedia);

                    let closeBtn = bigMedia.querySelector(".close");
                    closeBtn.addEventListener("click",(e)=>{
                        e.target.parentElement.remove();
                    })
                })
                // Delete
                let dltBtn = mediaElem.querySelector(".delete");
                dltBtn.addEventListener("click",(e)=>{
                    let id = e.target.parentElement.parentElement.getAttribute("id");
              
                    // DB removal
                    let dbVidTransaction = db.transaction("video","readwrite");
                    let videoStore = dbVidTransaction.objectStore("video");
                    videoStore.delete(id);
                    // UI removal
                    e.target.parentElement.parentElement.remove(); 
                })

                // Download
                let downloadBtn = mediaElem.querySelector(".download");
                downloadBtn.addEventListener("click",(e)=>{
                    let id = e.target.parentElement.parentElement.getAttribute('id');

                    let dbVidTransaction = db.transaction("video","readonly");
                    let videoStore = dbVidTransaction.objectStore("video");
                    let videoRequest = videoStore.get(id);
                    videoRequest.onsuccess = (e)=>{
                        let videoResult = videoRequest.result;

                        let a = document.createElement('a');
                        let videoURL = URL.createObjectURL(videoResult.blobData);
                        a.href = videoURL;
                        a.download = "Stream.mp4";
                        a.click();
                    }
                });

            })
        }
    }
},100)
