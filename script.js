const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const progressCurrPos = document.querySelector(".progress-curr-pos");
let isPlaying = false; //Check if playing
let songIndex = 0;
let isMouseDown = false;

//Songs
const songs = [
    {
        name:"music/Alan Walker-Faded.mp3",
        poster:"images/Alan-Walker.jpg",
        displayName:"Faded",
        artist:"Alan Walker",
        theme:"0 5px 30px 5px rgba(255,255,255,0.5)"
    },
    {
        name:"music/Adele-Skyfall.mp3",
        poster:"images/Adele-skyfall.jpg",
        displayName:"Skyfall",
        artist:"Adele",
        theme:"0 5px 30px 5px rgba(32, 106, 93, 1)"
    },
    {
        name:"music/lean-on.mp3",
        poster:"images/lean-on.jpg",
        displayName:"Lean On",
        artist:"Major Lazer & DJ Snake (feat. MØ)",
        theme:"0 5px 30px 5px rgba(40, 223, 153, 1)"
    },
    {
        name:"music/uptown-funk.mp3",
        poster:"images/uptown-funk.jpg",
        displayName:"Uptown Funk",
        artist:"Mark Ronson (feat Bruno Mars)",
        theme:"0 5px 30px 5px rgba(255,255,255,0.5)"
    },
]


//Pause
const playSong = ()=>{
    isPlaying = true;
    playBtn.classList.replace("fa-play","fa-pause");
    playBtn.setAttribute("title", "pause");
    music.play();
}

//Pause
const pauseSong = ()=>{
    isPlaying = false;
    playBtn.classList.replace("fa-pause","fa-play");
    playBtn.setAttribute("title", "play");
    music.pause();
}

//Play or Pause Event Listener

playBtn.addEventListener("click", ()=>(isPlaying?pauseSong():playSong()));
   

//loading song
const loadSong = (song)=>{
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.poster;
    music.src = song.name;
    image.style.boxShadow = song.theme;
}


//Update progress bar
const updateProgress = (e)=>{
        const {duration, currentTime} = e.target;

        //update progress bar width
        const progressPercent = (currentTime/duration)*100;
        progress.style.width = `${progressPercent}%`;

        //update duration display
        const timeDisplayFormat = (time)=>{
            time = time < 10?
                    `0${time}`:
                    `${time}`;
            return time;
        }
        const durationMinutes = Math.floor(duration/60);
        const durationSeconds = Math.floor(duration%60);

        //Delay switching duration element to avoid NaN
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:
                                 ${timeDisplayFormat(durationSeconds)}`;
        }

        //update current time display
        let currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime%60);
        currentTimeEl.textContent = `${currentMinutes}:
                                    ${timeDisplayFormat(currentSeconds)}`;
}

//change Progress
const changeProgress = (event, target)=>{
    let rect = event.currentTarget.getBoundingClientRect();
    let clickX = event.clientX - rect.left;
    let width = target.clientWidth;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;
}

//Set progress on click
const setProgress = function(e){
    changeProgress(e, this);
    isMouseDown = true;
}


//Set progress by dragging progress bar
const setProgressOnDrag = function(e){
    if(isMouseDown){
        changeProgress(e, this);
    }
}

const nextSong = ()=>{
    songIndex++;
    if(songIndex > songs.length-1){
        songIndex = 0;    
    }
    loadSong(songs[songIndex]);
    playSong();
}

//Event Listener
nextBtn.addEventListener("click", nextSong);

prevBtn.addEventListener("click",()=>{
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length-1;    
    }
    loadSong(songs[songIndex]);
    playSong();
    
});

//Set isMouseDown when end of progress bar is clicked
progressCurrPos.addEventListener("mousedown", (e)=>{
    e.preventDefault();
    isMouseDown = true;
})

document.body.addEventListener("mouseup", (e)=>{
    e.preventDefault();
    isMouseDown = false;
});

//change progress by dragging progress bar
document.body.addEventListener("mousemove", setProgressOnDrag);
 
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("mousedown", setProgress);
