const songs =
    [
        {
            name: 'The search',
            author: 'NF',
            path: './Assets/songs/Song1 - The_search-NF.mp3',
            image: './Assets/thumbnails/Song1.jpg',
            price: 55,
        },
        {
            name: 'Thủ Đô Cypher',
            author: 'Rappers mashup',
            path: './Assets/songs/Song2 - Thủ Đô Cypher  BeckStage X Bitis Hunter  RPT Orijinn LOW G RZMas RPT MCK.mp3',
            image: './Assets/thumbnails/Song2.jpg',
            price: 30,

        },
        {
            name: 'Càng cua',
            author: 'Low G',
            path: './Assets/songs/Song3 - Càng Cua  Low G x Last Fire Crew  Nhà Hóa Học Đống Đa.mp3',
            image: './Assets/thumbnails/Song3.jpg',
            price: 40,

        },
        {
            name: 'Anh thấy mình yếu đuối',
            author: 'Tùa',
            path: './Assets/songs/Song4 - CM1X  NẾU ANH THẤY LÒNG MÌNH YẾU ĐUỐI  TÙA  MUSIC VIDEO.mp3',
            image: './Assets/thumbnails/Song4.jpg',
            price: 45,

        },
        {
            name: 'Khi em lớn',
            author: 'Orange x Hoàng Dũng',
            path: './Assets/songs/Song5 - Orange x Hoàng Dũng  Khi Em Lớn Official MV.mp3',
            image: './Assets/thumbnails/Song5.jpg',
            price: 20,

        },
        {
            name: 'Rap Chậm Thôi',
            author: 'RPT MCK',
            path: './Assets/songs/Song6 - Rap Cham Thoi HNDCMM  RPT MCK x RPT Orijinn ft RZ Ma Official Lyric Video.mp3',
            image: './Assets/thumbnails/Song6.jpg',
            price: 60,

        },
        {
            name: 'Mercy Acoustic',
            author: 'Shawn Mendes',
            path: './Assets/songs/Song7 - Shawn Mendes  Mercy Acoustic.mp3',
            image: './Assets/thumbnails/Song7.jpg',
            price: 100,

        },
        {
            name: 'Monster',
            author: 'Shawn Mendes x JB',
            path: './Assets/songs/Song8 - Shawn Mendes Justin Bieber  Monster.mp3',
            image: './Assets/thumbnails/Song8.jpg',
            price: 45,

        },
        {
            name: 'Lily',
            author: 'Alan Walker',
            path: './Assets/songs/Song9 - Vietsub  Lyrics Lily  Alan Walker K391  Emelie Hollow.mp3',
            image: './Assets/thumbnails/Song9.jpg',
            price: 25,

        },

    ]


// bind query selector
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const expandBtn = $('.control-button')
const closeBtn = $('.close-btn')
const expandSection = $('.expand-section')
const songList = $('.song-list-body ul')
const audio = $('audio')
const mainBtn = $('.main-play-button')
const altBtn = $('.play-pause-btn i')
const seekBtn = $('input[type = range]')
let currentIndex = 0;


// Default on window load
window.addEventListener('load', () => {
    renderSong();
    loadSong(currentIndex)
});

// handle expand menu
expandBtn.addEventListener('click', function () {
    expandSection.classList.toggle('active')
})
closeBtn.onclick = () => expandBtn.click()


// render song list
function renderSong() {
    var htmls = songs.map((song,index) => {
        return `
            <li  class="song-item">
                <img data-index="${index}" src="${song.image}" alt="">
            </li>
        `
    }).join("")
    songList.innerHTML = htmls
}

//function play-pause
if(audio.ended) {
        mainIcon.classList.remove('fa-play')
        altBtn.classList.remove('fa-play')
        mainIcon.classList.add('fa-pause')
        altBtn.classList.add('fa-pause')
}
mainBtn.addEventListener('click', () => {   
    const mainIcon = mainBtn.querySelector('i')
    if(!audio.paused && !audio.ended) {
        mainIcon.classList.remove('fa-pause')
        altBtn.classList.remove('fa-pause')
        mainIcon.classList.add('fa-play')
        altBtn.classList.add('fa-play')
        audio.pause();
    }
    else if (audio.paused) {
        mainIcon.classList.remove('fa-play')
        altBtn.classList.remove('fa-play')
        mainIcon.classList.add('fa-pause')
        altBtn.classList.add('fa-pause')
        audio.play();
    }
})
altBtn.onclick = () => {
    mainBtn.click();
}


//load the song
function loadSong(num) {
    audio.src = songs[num].path
    $('.song-img img').src = songs[num].image
    $('.song-detail .song-name').innerText = songs[num].name
    $('.song-detail .song-author').innerText = songs[num].author
    $('.thumbnail img').src = songs[num].image
    $('.information .name').innerText = songs[num].name
    $('.information .author').innerText = songs[num].author
    $('.information .price').innerText = `$${songs[num].price}`
}



// Handle playpause using thumbnail
songList.onclick = (e) => {
    if(e.target.closest('img')) {
        if(currentIndex != e.target.getAttribute('data-index'))
        {
            currentIndex = e.target.getAttribute('data-index')
            console.log(currentIndex)
            loadSong(currentIndex)
            mainBtn.click();
            console.log(e.target)
    }}
}


//handle seeking
seekBtn.oninput = (e) =>{
    audio.currentTime = e.target.value / 100 * audio.duration
}
audio.ontimeupdate = (e) => {
    seekBtn.value = e.target.currentTime / e.target.duration * 100
    console.log(e.target.currentTime)
    $('.progress').style.width = `${audio.currentTime / audio.duration * 100}%`
}