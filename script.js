// querySelector - class,Element or id
const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')
const currentTimeEL = document.getElementById('current-time')
const durationEL = document.getElementById('duration')



// Music
const songs = [
    {
        name: 'song-1',
        displayName: 'Electric Chill Machine',
        artist:'Jacinto Design',
    },
    {
        name: 'song-2',
        displayName: 'Seven Natoin Army',
        artist:'John Marshal',
    },
    {
        name: 'song-3',
        displayName: 'Dance Monkey',
        artist:'Tommy Cursie',
    },
    {
        name: 'song-4',
        displayName: 'Front Row (Remix)',
        artist:'Snow White',
    }
]


// Check if Playing
let isPlaying = false;
// play
function playSong(){
    isPlaying=true;
    playBtn.classList.replace('fa-play','fa-pause')
    playBtn.setAttribute('title','Pause')
    music.play();
}

//Pause
function pauseSong(){
    isPlaying=false;
    playBtn.classList.replace('fa-pause','fa-play')
    playBtn.setAttribute('title','Play')
    music.pause();
}

// play or pause Event Listner
playBtn.addEventListener('click', ()=> (isPlaying? pauseSong() : playSong()));

// Update DOM
function loadSong(song){
    title.textContent =song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current song
let songIndex = 0;

// Next Song
function nextSong(){
    songIndex++;
    if(songIndex === songs.length){
        songIndex = 0;
    }
    // console.log(songIndex)
    
    loadSong(songs[songIndex])
    playSong();
}
// Prev Song
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length-1;
    }
    // console.log(songIndex)
    
    loadSong(songs[songIndex])
    playSong();
}


// ON load - Slect First Song
loadSong(songs[songIndex]);

// Update Progress bar and time
function updateProgressBar(e){
    if(isPlaying){
        const{duration,currentTime} = e.srcElement;
        // Update Progress bar width
        const progressPercent = (currentTime/duration)*100;
        progress.style.width = `${progressPercent}%`;
        // Cal & display duration
        const durationMins = Math.floor(duration / 60);
        let durationSec = Math.floor(duration % 60);
        if(durationSec < 10){
            durationSec = `0${durationSec}`;
        }

        // Delay Switching a elemetn to avoid NaN
        if(durationSec){
            durationEL.textContent=`${durationMins}:${durationSec}`;
        }
        //cal display for current
        const currentMins = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);
        if(currentSec < 10){
            currentSec = `0${currentSec}`;
        }
        currentTimeEL.textContent = `${currentMins}:${currentSec}`


    }
}
// Set Progress Bar - (Best Part)
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;

}

// Event Listners
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('timeupdate',updateProgressBar)
music.addEventListener('ended',nextSong)
progressContainer.addEventListener('click',setProgressBar)