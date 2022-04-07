const musicContainer = document.getElementById('audio-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// song titles and file names
const songs = ['kiss me more - doja cat ft sza', "the perfect girl - &#10;mareux", 'smokin out the window - silk sonic', 'boyfriend - dove cameron', 'middle of the night - elley duhé', 'leave the door open - silk sonic', 'heat waves - glass animals'];
const songFiles = ['kiss-me-more_doja-cat_sza', 'the-perfect-girl_mareux', 'smokin-out-the-window_silk-sonic', 'boyfriend_dove-cameron', 'middle-of-the-night_elley-duhe', 'leave-the-door-open_silk-sonic', 'heat-waves_glass-animals'];

// increments song
let songIndex = 1;
let songFileIndex = 1;

// loads stuff
loadSong(songs[songIndex], songFiles[songFileIndex]);

// updates song info
function loadSong(song, songFile) {
  title.innerText = song;
  audio.src = `../songs/pop-songs/${songFile}.mp3`;
  cover.src = `../album-covers/pop-album-covers/${songFile}.jpg`;
}

// func: play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// func: pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// func: prev song
function prevSong() {
  songIndex--;
  songFileIndex--;

  if(songIndex < 0) 
  {
    songIndex = songs.length - 1;
  }
  if(songFileIndex < 0)
  {
    songFileIndex = songFiles.length - 1;
  }

  loadSong(songs[songIndex], songFiles[songFileIndex]);
  playSong();
}

// func: next song
function nextSong() {
  songIndex++;
  songFileIndex++;

  if(songIndex > songs.length - 1)
  {
    songIndex = 0;
  }
  if(songFileIndex > songFiles.length - 1)
  {
    songFileIndex = 0;
  }
  
  loadSong(songs[songIndex], songFiles[songFileIndex]);
  playSong();
}

// updates progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// creates progress bar
function setProgress(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration

  audio.currentTime = (clickX / width) * duration;
}

// event listeners
playBtn.addEventListener('click', () => 
{
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) 
  {
    pauseSong();
  } 
  else 
  {
    playSong();
  }
});

// change song stuff
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// updates song info
audio.addEventListener('timeupdate', updateProgress);

// evemt listener on progress bar
progressContainer.addEventListener('click', setProgress);

// goes to next song if cur song ends (hopefully)
audio.addEventListener('ended', nextSong);
