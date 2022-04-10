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
const popSongs = ['kiss me more', 'the perfect girl', 'smokin out the window', 'boyfriend', 'middle of the night', 'leave the door open', 'heat waves'];
const popArtists = ['doja cat ft sza', 'mareux', 'silk sonic', 'dove cameron', 'elley duhé', 'silk sonic', 'glass animals'];
const popSongFiles = ['kiss-me-more_doja-cat_sza', 'the-perfect-girl_mareux', 'smokin-out-the-window_silk-sonic', 'boyfriend_dove-cameron', 'middle-of-the-night_elley-duhe', 'leave-the-door-open_silk-sonic', 'heat-waves_glass-animals'];

const rapSongs = ['catch me outside', 'e-er', 'love sosa', 'money so big', 'nuketown'];
const rapArtists = ['ski mask the slump god', 'ski mask the slump god, danny towers & lil yachty', 'chief keef', 'yeat', 'ski mask the slump god'];
const rapSongFiles = ['catch-me-outside_ski-mask', 'e-er_ski-mask_danny-towers_lil-yachty', 'love-sosa_chief-keef', 'money-so-big_yeat', 'nuketown_ski-mask'];

const countrySongs = [];
const countryArtists = [];
const countrySongFiles = [];

const trapSongs = ['love sosa'];
const trapArtists = ['chief keef (rl grime remix)'];
const trapSongFiles = ['love-sosa_chief-keef_trap'];

let songIndex = 1;

var currentPage = window.location.pathname;

switch(currentPage)
{
  case '/genres/pop.html':
    loadPopSong(popSongFiles[songIndex]);
    break;
  case '/genres/rap.html':
    loadRapSong(rapSongFiles[songIndex]);
    break;
  case '/genres/country.html':
    loadCountrySong(countrySongFiles[songIndex]);
    break;
  case '/genres/trap.html':
    loadTrapSong(trapSongFiles[songIndex]);
    break;
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
  title.innerText = rapSongs[songIndex];
  artist.innerText = rapArtists[songIndex];
  audio.src = `../songs/rap-songs/${songFile}.mp3`;
  cover.src = `../album-covers/rap-album-covers/${songFile}.jpg`;
}

function loadCountrySong(songFile) 
{
  title.innerText = countrySongs[songIndex];
  artist.innerText = countryArtists[songIndex];
  audio.src = `../songs/country-songs/${songFile}.mp3`;
  cover.src = `../album-covers/country-album-covers/${songFile}.jpg`;
}

function loadTrapSong(songFile) 
{
  title.innerText = trapSongs[songIndex];
  artist.innerText = trapArtists[songIndex];
  audio.src = `../songs/trap-songs/${songFile}.mp3`;
  cover.src = `../album-covers/trap-album-covers/${songFile}.jpg`;
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
  
  switch(currentPage)
  {
    case '/genres/pop.html':
      if(songIndex < 0) 
      {
        songIndex = popSongs.length - 1;
      }
      loadPopSong(popSongFiles[songIndex]);
      break;
    case '/genres/rap.html':
      if(songIndex < 0) 
      {
        songIndex = rapSongs.length - 1;
      }
      loadRapSong(rapSongFiles[songIndex]);
      break;
    case '/genres/country.html':
      if(songIndex < 0) 
      {
        songIndex = countrySongs.length - 1;
      }
      loadCountrySong(countrySongFiles[songIndex]);
      break;
    case '/genres/trap.html':
      if(songIndex < 0) 
      {
        songIndex = trapSongs.length - 1;
      }
      loadTrapSong(trapSongFiles[songIndex]);
      break;
  }
  playSong();
}

// func: next song
function nextSong() {
  songIndex++;
  
  switch(currentPage)
  {
    case '/genres/pop.html':
      if(songIndex > popSongs.length - 1)
      {
        songIndex = 0;
      }
      loadPopSong(popSongFiles[songIndex]);
      break;
    case '/genres/rap.html':
      if(songIndex > rapSongs.length - 1)
      {
        songIndex = 0;
      }
      loadRapSong(rapSongFiles[songIndex]);
      break;
    case '/genres/country.html':
      if(songIndex > countrySongs.length - 1)
      {
        songIndex = 0;
      }
      loadCountrySong(countrySongFiles[songIndex]);
      break;
    case '/genres/trap.html':
      if(songIndex > trapSongs.length - 1)
      {
        songIndex = 0;
      }
      loadTrapSong(trapSongFiles[songIndex]);
      break;
  }
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
