const volumeContainer = document.querySelector('.volume-container');
const volumeRange = document.querySelector('.volume-range');
const volumeCover = document.querySelector('.volume-cover');
let isMouseDownOnVolume = false;

const settingIntialVolume = (()=>{
	music.volume = 0.5;
})();

const changeVol = (e)=>{
	e.stopPropagation();
	try{
		if(isMouseDownOnVolume){
			let height, left, top, width, x, y, _ref, startAngle;
			_ref = volumeContainer.getBoundingClientRect(), top = _ref.top, left = _ref.left, height = _ref.height, width = _ref.width;
		    center = {
		      x: left + (width / 2),
		      y: top + (height)
		    };  
		    let clientX = /touch/.test(e.type) ? e.touches[0].clientX : e.clientX;
		    let clientY = /touch/.test(e.type) ? e.touches[0].clientY : e.clientY;
		    x = center.x - clientX;
		    y = center.y - clientY;
		    angle = (180/(Math.PI)) * Math.atan2(y, x);
		    volumeRange.style.transform = `rotate(${angle}deg)`;
		    music.volume = (angle/18)/10;
		    console.log(music.volume);
		}
	}
	catch(error){
		isMouseDownOnVolume = false;
	}
}

volumeContainer.addEventListener("mousemove", changeVol);

volumeContainer.addEventListener("mousedown", (e)=>{
	isMouseDownOnVolume = true;
	changeVol(e);
});
volumeContainer.addEventListener("mouseup", (e)=>{
	isMouseDownOnVolume = false;
});

document.body.addEventListener("mouseup", (e)=>{
	isMouseDownOnVolume = false;
});

volumeCover.addEventListener("mousedown", (e)=>{
	e.stopPropagation();
})

volumeCover.addEventListener("mousemove", (e)=>{
	e.stopPropagation();
})

//For Touch screen

volumeContainer.addEventListener("touchstart", (e)=>{
    if(e.cancelable){
        e.preventDefault();
        isMouseDownOnVolume = true;
        changeVol(e);
    }
});

volumeContainer.addEventListener("touchmove", (e)=>{
	if(e.cancelable){
        e.preventDefault();
        changeVol(e);
    }
});

volumeContainer.addEventListener("touchend",(e)=>{
   if(e.cancelable){
        e.preventDefault();
        isMouseDownOnVolume = false;
   }
})

document.body.addEventListener("touchenter", (e)=>{
	console.log("hello");
	if(e.cancelable){
        e.preventDefault();
        isMouseDownOnVolume = false;
   }
});


