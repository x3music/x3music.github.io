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
const popSongs = ['kiss me more', "the perfect girl", 'smokin out the window', 'boyfriend', 'middle of the night', 'leave the door open', 'heat waves'];
const popArtists = ['doja cat ft sza', 'mareux', 'silk sonic', 'dove cameron', 'elley duhé', 'silk sonic', 'glass animals'];
const popSongFiles = ['kiss-me-more_doja-cat_sza', 'the-perfect-girl_mareux', 'smokin-out-the-window_silk-sonic', 'boyfriend_dove-cameron', 'middle-of-the-night_elley-duhe', 'leave-the-door-open_silk-sonic', 'heat-waves_glass-animals'];

const rapSongs = [];
const rapArtists = [];
const rapSongFiles = [];

const countrySongs = [];
const countryArtists = [];
const countrySongFiles = [];

let songIndex = 1;

var currentPage = window.location.pathname;
switch(currentPage)
{
  case '/genres/pop.html':
    loadPopSong(popSongFiles[songIndex]);
  case '/genres/rap.html':
    loadRapSong(rapSongFiles[songIndex]);
  case '/genres/country.html':
    loadCountrySong(countrySongFiles[songIndex]);
}

// updates song info
function loadPopSong(songFile) 
{
  title.innerText = popSongs[songIndex];
  artist.innerText = popArtists[songIndex];
  audio.src = `../songs/pop-songs/${songFile}.mp3`;
  cover.src = `../album-covers/pop-album-covers/${songFile}.jpg`;
}

function loadRapSong(songFile) 
{
  title.innerText = popSongs[songIndex];
  artist.innerText = popArtists[songIndex];
  audio.src = `../songs/rap-songs/${songFile}.mp3`;
  cover.src = `../album-covers/rap-album-covers/${songFile}.jpg`;
}

// updates song info
function loadCountrySong(songFile) 
{
  title.innerText = countrySongs[songIndex];
  artist.innerText = countryArtists[songIndex];
  audio.src = `../songs/country-songs/${songFile}.mp3`;
  cover.src = `../album-covers/country-album-covers/${songFile}.jpg`;
}

// func: play song
function playSong() 
{
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// func: pause song
function pauseSong() 
{
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// func: prev song
function prevSong() 
{
  songIndex--;

  if(songIndex < 0) 
  {
    songIndex = songs.length - 1;
  }
  
  loadSong(songFiles[songIndex]);
  playSong();
}

// func: next song
function nextSong() {
  songIndex++;

  if(songIndex > songs.length - 1)
  {
    songIndex = 0;
  }
  
  loadSong(songs[songIndex]);
  playSong();
}

// updates progress bar
function updateProgress(e) 
{
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
