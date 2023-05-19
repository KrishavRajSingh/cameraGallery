
let style;
let filterName;


filterIcon.addEventListener('click',(e)=>{
    
    filterCont.style.display = "flex";
    filterIcon.style.display = 'none';
    let allFilters = document.querySelectorAll('.filter');
    allFilters.forEach((filter)=>{
        filter.addEventListener('click',(e)=>{
            video.removeAttribute("style");
            let input = document.querySelector('input');           
            if(input)
            setToDefault();
            filterName=filter.classList[1];
            video.setAttribute('class',filterName);
            switch(filterName){
                case 'none':
                    filterCont.style.display = 'none';
                    video.style.filter = 'none';
                    filterIcon.style.display = 'block';
                break;
                case 'blur':
                    blurred();
                break;
                case 'brightness':
                    brighten();
                break;
                case 'contrast':
                    contrasted();
                break;
                case 'grayscale':
                    grayscaled();
                break;
                case 'hue-rotate':
                    hueRotated()
                break;
                case 'invert':
                    inverted();
                break;
                case 'opacity':
                    opacity();
                break;
                case 'saturate':
                    saturated();
                break;
                case 'sepia':
                    sepia();
                break;
            }
            // 
            // tool.filter = "blur(4px)";
        })
    })
})

function setToDefault(){
    
    input.remove();
    // filterCont.removeChild(input);
    video.setAttribute('class','none');
}

function blurred(){
    input = document.createElement('input');
    input.setAttribute('type','range');
    input.setAttribute("value",20);
    filterCont.appendChild(input);
    input.addEventListener('change',(e)=>{
        let value = input.value;
        video.style.filter = `blur(${value/10}px)`;
        
    })
}

function brighten(){
    
    input = document.createElement('input');
    input.setAttribute('type','range');
    input.setAttribute("value",100);
    filterCont.appendChild(input);

    input.addEventListener('change',(e)=>{
        let value = input.value;
        video.style.filter = `brightness(${value*2}%)`;
        
    })
}

function contrasted(){
    input = document.createElement('input');
    input.setAttribute('type','range');
    input.setAttribute("value",25);
    filterCont.appendChild(input);

    input.addEventListener('change',(e)=>{
        let value = input.value;
        video.style.filter = `contrast(${value*8}%)`;
        
    })
}

function grayscaled() {
    input = document.createElement('input');
    input.setAttribute('type','range');
    input.setAttribute("value",100);
    filterCont.appendChild(input);
    
    input.addEventListener('change',(e)=>{
        let value = input.value;
        video.style.filter = `grayscale(${value}%)`;
        
    })
}

function hueRotated() {
    input = document.createElement('input');
    input.setAttribute('type','range');
    input.setAttribute("value",12.5);
    filterCont.appendChild(input);
    
    input.addEventListener('change',(e)=>{
        let value = input.value;
        video.style.filter = `hue-rotate(${value*3.6}deg)`;
        
    })
}

function inverted(){
    input = document.createElement('input');
    input.setAttribute('type','range');
    input.setAttribute("value",100);
    filterCont.appendChild(input);
    
    input.addEventListener('change',(e)=>{
        let value = input.value;
        video.style.filter = `invert(${value}%)`;
        
    })
}
function opacity(){
    input = document.createElement('input');
    input.setAttribute('type','range');
    input.setAttribute("value",50);
    filterCont.appendChild(input);
    
    input.addEventListener('change',(e)=>{
        let value = input.value;
        video.style.filter = `opacity(${value}%)`;
        
    })
}

function saturated(){
    input = document.createElement('input');
    input.setAttribute('type','range');
    input.setAttribute("value",30);
    filterCont.appendChild(input);
    
    input.addEventListener('change',(e)=>{
        let value = input.value;
        video.style.filter = `saturate(${value/10})`;
        
    })
}

function sepia() {
    input = document.createElement('input');
    input.setAttribute('type','range');
    input.setAttribute("value",100);
    filterCont.appendChild(input);
    
    input.addEventListener('change',(e)=>{
        let value = input.value;
        video.style.filter = `sepia(${value}%)`;
        
    })
}