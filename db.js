// database
let db;
// request indexedDB to open db
let openRequest = indexedDB.open('myDB');
openRequest.addEventListener('success',(e)=>{
    // console.log('DB success');
    db = openRequest.result;
})
openRequest.addEventListener('upgradeneeded',(e)=>{
    // console.log('DB upgraded');
    db = openRequest.result;
    db.createObjectStore('image',{keyPath: "id"});
    db.createObjectStore('video',{keyPath: "id"});
})
openRequest.addEventListener('error',(e)=>{
    console.log('DB ERROR');
})

