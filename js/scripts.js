document.addEventListener('DOMContentLoaded', function() {
    // Lista de canciones (deberás actualizar esto con tus archivos)
    const songs = [
        {
            title: "Gota de Luz",
            artist: "José Villamayor",
            cover: "images/album1.jpg",
            file: "audio/Gota_de_luz.mp3",
            duration: "05:09"
        },
        {
            title: "La fiesta de la vida",
            artist: "José Villamayor",
            cover: "images/album1.jpg",
            file: "audio/La_fiesta_de_la_vida.mp3",
            duration: "05:48"
        },
        {
            title: "Lo que faltó decir",
            artist: "José Villamayor",
            cover: "images/album1.jpg",
            file: "audio/lo_que_falto_decir.mp3",
            duration: "05:23"
        },
        {
            title: "Una hoja al viento",
            artist: "José Villamayor",
            cover: "images/album1.jpg",
            file: "audio/Una_hoja_al_viento.mp3",
            duration: "04:58"
        },
        {
            title: "Nanduti",
            artist: "José Villamayor",
            cover: "images/album1.jpg",
            file: "audio/nanduti.mp3",
            duration: "05:14"
        },
        {
            title: "Paseo por el río",
            artist: "José Villamayor",
            cover: "images/album1.jpg",
            file: "audio/paseo_por_el_rio.mp3",
            duration: "07:04"
        },
        {
            title: "Arasunu",
            artist: "José Villamayor",
            cover: "images/album1.jpg",
            file: "audio/Arasunu.mp3",
            duration: "05:53"
        },
        {
            title: "Pya'e",
            artist: "José Villamayor",
            cover: "images/album1.jpg",
            file: "audio/pyae.mp3",
            duration: "04:01"
        },
        {
            title: "Canción para los sobrevivientes",
            artist: "José Villamayor",
            cover: "images/album1.jpg",
            file: "audio/Cancion_para_los_sobrevivientes.mp3",
            duration: "06:03"
        },
        {
            title: "La esperanza de un nuevo día",
            artist: "José Villamayor",
            cover: "images/album1.jpg",
            file: "audio/La_esperanza_de_un_nuevo_dia.mp3",
            duration: "07:05"
        }
    ];

    // Elementos del DOM
    const audioPlayer = document.getElementById('audioPlayer');
    const currentSongTitle = document.getElementById('currentSongTitle');
    const currentArtist = document.getElementById('currentArtist');
    const currentAlbumArt = document.getElementById('currentAlbumArt');
    const progressBar = document.getElementById('progressBar');
    const currentTime = document.getElementById('currentTime');
    const duration = document.getElementById('duration');
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const volumeBtn = document.getElementById('volumeBtn');
    const volumeControl = document.getElementById('volumeControl');
    const songList = document.getElementById('songList');

    // Variables de estado
    let currentSongIndex = 0;
    let isPlaying = false;

    // Inicializar el reproductor
    function initPlayer() {
        // Cargar la primera canción
        loadSong(currentSongIndex);
        
        // Crear la lista de canciones
        renderSongList();
        
        // Configurar eventos
        setupEventListeners();
    }

    // Cargar una canción
    function loadSong(index) {
        const song = songs[index];
        audioPlayer.src = song.file;
        currentSongTitle.textContent = song.title;
        currentArtist.textContent = song.artist;
        currentAlbumArt.src = song.cover;
        duration.textContent = song.duration;
        
        // Resaltar la canción actual en la lista
        updateActiveSongInList();
    }

    // Renderizar la lista de canciones
    function renderSongList() {
        songList.innerHTML = '';
        let totalSeconds = 0;
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="song-number">${index + 1}</span>
                <div class="song-info">
                    <div class="song-title">${song.title}</div>
                    <div class="song-artist">${song.artist}</div>
                </div>
                <span class="song-duration">${song.duration}</span>
            `;
            
            li.addEventListener('click', () => {
                currentSongIndex = index;
                loadSong(currentSongIndex);
                playSong();
            });
            
            songList.appendChild(li);
            // Sumar duración
            const [min, sec] = song.duration.split(':').map(Number);
            totalSeconds += min * 60 + sec;
        });
        // Mostrar suma total al final
        const totalLi = document.createElement('li');
        totalLi.style.justifyContent = 'flex-end';
        totalLi.style.fontWeight = 'bold';
        totalLi.style.border = 'none';
        totalLi.style.background = 'transparent';
        totalLi.style.cursor = 'default';
        totalLi.classList.add('total-duration');
        const totalMin = Math.floor(totalSeconds / 60);
        const totalSec = (totalSeconds % 60).toString().padStart(2, '0');
        totalLi.innerHTML = `<span style="margin-left:auto;">Duración total: ${totalMin}:${totalSec}</span>`;
        songList.appendChild(totalLi);
    }

    // Actualizar la canción activa en la lista
    function updateActiveSongInList() {
        const items = songList.querySelectorAll('li');
        items.forEach((item, index) => {
            if (index === currentSongIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Reproducir canción
    function playSong() {
        isPlaying = true;
        audioPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }

    // Pausar canción
    function pauseSong() {
        isPlaying = false;
        audioPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }

    // Canción anterior
    function prevSong() {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = songs.length - 1;
        }
        loadSong(currentSongIndex);
        if (isPlaying) {
            playSong();
        }
    }

    // Siguiente canción
    function nextSong() {
        currentSongIndex++;
        if (currentSongIndex >= songs.length) {
            currentSongIndex = 0;
        }
        loadSong(currentSongIndex);
        if (isPlaying) {
            playSong();
        }
    }

    // Actualizar la barra de progreso
    function updateProgressBar() {
        const { currentTime: ct, duration: d } = audioPlayer;
        const progressPercent = (ct / d) * 100;
        progressBar.value = progressPercent;
        
        // Formatear tiempo currente
        const minutes = Math.floor(ct / 60);
        const seconds = Math.floor(ct % 60).toString().padStart(2, '0');
        currentTime.textContent = `${minutes}:${seconds}`;
    }

    // Configurar eventos
    function setupEventListeners() {
        // Botón play/pause
        playBtn.addEventListener('click', () => {
            if (isPlaying) {
                pauseSong();
            } else {
                playSong();
            }
        });

        // Botón anterior
        prevBtn.addEventListener('click', prevSong);

        // Botón siguiente
        nextBtn.addEventListener('click', nextSong);

        // Barra de progreso
        progressBar.addEventListener('input', () => {
            const seekTime = (progressBar.value / 100) * audioPlayer.duration;
            audioPlayer.currentTime = seekTime;
        });

        // Actualizar barra de progreso mientras se reproduce
        audioPlayer.addEventListener('timeupdate', updateProgressBar);

        // Cuando termina la canción, pasar a la siguiente
        audioPlayer.addEventListener('ended', nextSong);

        // Control de volumen
        volumeControl.addEventListener('input', () => {
            audioPlayer.volume = volumeControl.value;
            
            // Actualizar icono del volumen
            if (volumeControl.value == 0) {
                volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else if (volumeControl.value < 0.5) {
                volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
            } else {
                volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
        });

        // Botón de mute
        volumeBtn.addEventListener('click', () => {
            if (audioPlayer.volume > 0) {
                audioPlayer.volume = 0;
                volumeControl.value = 0;
                volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else {
                audioPlayer.volume = 0.7;
                volumeControl.value = 0.7;
                volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
        });

        // Teclado
        document.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'Space':
                    e.preventDefault();
                    if (isPlaying) {
                        pauseSong();
                    } else {
                        playSong();
                    }
                    break;
                case 'ArrowLeft':
                    audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 5);
                    break;
                case 'ArrowRight':
                    audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 5);
                    break;
                case 'ArrowUp':
                    volumeControl.value = Math.min(1, parseFloat(volumeControl.value) + 0.1);
                    audioPlayer.volume = volumeControl.value;
                    break;
                case 'ArrowDown':
                    volumeControl.value = Math.max(0, parseFloat(volumeControl.value) - 0.1);
                    audioPlayer.volume = volumeControl.value;
                    break;
            }
        });
    }

    // Iniciar el reproductor
    initPlayer();
});