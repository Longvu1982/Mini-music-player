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
const altBtnWrap = $('.play-pause-btn')
const seekBtn = $('input[type = range]')
const smallImg = $('.song-img')
const firstBackgr = $('.background')
const secondBackgr = $('.background-child')
const nextBtn = $('.next-btn')
const prevBtn = $('.prev-btn')
const mainIcon = mainBtn.querySelector('i')
const loopBtn = $('.loop-btn')
const downloadBtn = $('.more-action')
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

//function playState
function playState () {
    mainIcon.classList.remove('fa-play')
    altBtn.classList.remove('fa-play')
    mainIcon.classList.add('fa-pause')
    altBtn.classList.add('fa-pause')
    // stop spinning
    smallImg.style.animationPlayState = "running"
    //stop animate background
    firstBackgr.style.animationPlayState = "running"
    secondBackgr.style.animationPlayState = "running"
}


//function pauseState
function pauseState () {
    mainIcon.classList.remove('fa-pause')
    altBtn.classList.remove('fa-pause')
    mainIcon.classList.add('fa-play')
    altBtn.classList.add('fa-play')
     //spin the disk
     smallImg.style.animationPlayState = "paused"
     //animate background
     firstBackgr.style.animationPlayState = "paused"
     secondBackgr.style.animationPlayState = "paused"
}

//function play-pause
mainBtn.addEventListener('click', () => {   
    if(!audio.paused && !audio.ended) {
        pauseState();
        audio.pause();
       
    }
    else if (audio.paused) {
        playState();
        audio.play();
        
    }
})
altBtnWrap.onclick = () => {
    mainBtn.click();
}


//load the song
function loadSong(num) {
    audio.src = songs[num].path
    console.log(audio.currentTime)
    $('.song-img img').src = songs[num].image
    $('.song-detail .song-name').innerText = songs[num].name
    $('.song-detail .song-author').innerText = songs[num].author
    $('.thumbnail img').src = songs[num].image
    $('.information .name').innerText = songs[num].name
    $('.information .author').innerText = songs[num].author
    $('.information .price').innerText = `$${songs[num].price}`
    seekBtn.value = 0;
    $('.progress').style.width = '0%'
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


//handle seeking and timing
seekBtn.oninput = (e) =>{
    audio.currentTime = e.target.value / 100 * audio.duration
}
audio.ontimeupdate = (e) => {
    seekBtn.value = e.target.currentTime / e.target.duration * 100
    $('.progress').style.width = `${audio.currentTime / audio.duration * 100}%`
    $('.time-section .current').innerText = fancyTimeFormat(audio.currentTime)
}
audio.onloadeddata = () =>{
    $('.time-section .duration').innerText = fancyTimeFormat(audio.duration)
}

//handle next and prev song
nextBtn.addEventListener('click', () => {
    currentIndex ++;
    if (currentIndex == songs.length ) currentIndex = 0;
    seekBtn.value = 0;
    $('.progress').style.width = '0%'
    loadSong(currentIndex)
    mainBtn.click();
})

prevBtn.addEventListener('click', () => {
    currentIndex --;
    if (currentIndex == -1 ) currentIndex = songs.length - 1;
    seekBtn.value = 0;
    $('.progress').style.width = '0%'
    loadSong(currentIndex)
    mainBtn.click();
})


// loop icon change
let loopState = 0;
loopBtn.addEventListener('click', () => {
    if (window.getComputedStyle(loopBtn).color != "rgb(229, 229, 229)") {
        loopBtn.style.color = "rgb(229, 229, 229)"
        loopState = 1;
    }
    else if (window.getComputedStyle(loopBtn).color == "rgb(229, 229, 229)" && loopBtn.querySelector('i').classList.contains('fa-repeat')) {
        loopBtn.querySelector('i').classList.remove('fa-repeat')
        loopBtn.querySelector('i').classList.add('fa-random')
        loopState = 2;
    }
    else if (loopBtn.querySelector('i').classList.contains('fa-random')) {
        loopBtn.style.color = "rgba(255,255,255,0.5)"
        loopBtn.querySelector('i').classList.add('fa-repeat')
        loopBtn.querySelector('i').classList.remove('fa-random')
        loopState = 0;
    }
})

// handle loop
audio.addEventListener('ended', () => {
    switch(loopState) {
        case 0:
            nextBtn.click();
            break;         
        case 1:
            audio.play();
            break;
        case 2:
            currentIndex = Math.floor(Math.random() * (songs.length - 1));
            loadSong(currentIndex);
            mainBtn.click();
    }
})


// format time from second
function fancyTimeFormat(duration)
{   
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}


// download song
downloadBtn.addEventListener('click', () => {
    var link = document.createElement("a");
    // If you don't know the name or want to use
    // the webserver default set name = ''
    link.setAttribute('download', '');
    link.href = songs[currentIndex].path;
    document.body.appendChild(link);
    link.click();
    link.remove();
})
