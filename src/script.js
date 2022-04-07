const musicContainer = document.getElementById('audio-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songs = ['melody', 'the perfect girl - mareux', 'peace'];
const songFiles = ['melody', 'the-perfect-girl_mareux', 'peace'];

// Keep track of song
let songIndex = 1;
let songFileIndex = 1;

// Initially load song details into DOM
loadSong(songs[songIndex], songFiles[songIndex]);

// Update song details
function loadSong(song, songFile) {
  title.innerText = song;
  audio.src = `../songs/pop-songs/${songFile}.mp3`;
  cover.src = `../album-covers/pop-album-covers/${songFile}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
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

// Next song
function nextSong() {
  songIndex++;
  songFileIndex++;

  if(songIndex > songs.length - 1)
  {
    songIndex = 0;
  }
  if(songFileIndex > songs.length - 1)
  {
    songFileIndex = 0;
  }
  
  loadSong(songs[songIndex], songFiles[songFileIndex]);
  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration

  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
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

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);
