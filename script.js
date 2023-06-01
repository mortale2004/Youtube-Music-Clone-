const nextBtn = document.getElementById("nextBtn");
const playBtn = document.getElementById("pauseBtn");
const preBtn = document.getElementById("preBtn");
const seekBar = document.getElementById("seekBar");
const volumeBar = document.getElementById("volumeBar");
const songListCon = document.getElementsByClassName("songList")[0].firstElementChild;
const centreFooter = document.getElementsByClassName("centerFooter")[0];
const likeBtn = document.getElementById("likeBtn");
const dislikeBtn = document.getElementById("dislikeBtn");
const leftSection = document.getElementsByClassName("leftSection")[0]; leftSection
const volumeIcon = document.getElementById("volumeIcon");
const songTime = document.getElementById("songTime");
const toggleButton = document.getElementById("toggleButtons");

const songList = [
    { name: "Ajj Din Chadheya", singer: "Rahat Fateh Ali Khan", path: "songs/din chadeya.mp4", views: "5M", likes: "434", covers: "covers/aaj din chadeya.jpg" },
    { name: "Zaroori Tha", singer: "Rahat Fateh Ali Khan", path: "songs/zaroori tha.mp4", views: "1.4B", likes: "833", covers: "covers/zaroori tha.jpg" },
    { name: "Main Jahaan Rahoon", singer: "Rahat Fateh Ali Khan", path: "songs/main jahaan rahoon.mp4", views: "153", likes: "132", covers: "covers/main jahan rahoon.jpg" },
    { name: "Phir Bhi Tumko Chahunga", singer: "Arijit singh", path: "songs/phir bhi tumko.mp4", views: "54M", likes: "232", covers: "covers/phir bhi tumko.jpg" },
    { name: "O Re Piya", singer: "Rahat Fateh Ali Khan", path: "songs/o re piya.mp3", views: "10M", likes: "824", covers: "covers/o re piya.jpg" },
    { name: "O Bedardeya", singer: "Arjit Singh", path: "songs/O Bedardeya", views: "20M", likes: "2124", covers: "covers/O Bedardeya.jpg" },
    { name: "Pee Loon", singer: "Pritam", path: "songs/Pee Loon", views: "320M", likes: "142", covers: "covers/Pee Loon.jpg" },
    { name: "Apna Bana Le", singer: "Arjit Singh", path: "songs/apna Bana Le", views: "132M", likes: "8224", covers: "covers/Apna Bana Le.jpg" },
    { name: "Ishq Sufiyana", singer: "Vishal Shekhar", path: "songs/Ishq Sufiyana", views: "13M", likes: "321", covers: "covers/Ishq Sufiyana.jpg" },
    
]

let index = 0;
let songElem = new Audio(songList[index].path);




playBtn.addEventListener("click", () => {
    if (songElem.paused || songElem.currentTime == 0) {
        songElem.play();
        playBtn.innerHTML = `<svg viewBox="0 0 24 24"><g height="24" viewBox="0 0 24 24" width="24" ><path d="M9,19H7V5H9ZM17,5H15V19h2Z" ></path></g></svg>`

    }
    else {
        songElem.pause();
        playBtn.innerHTML = `<svg viewBox="0 0 24 24"><g ><path d="M6,4l12,8L6,20V4z" ></path></g></svg>
        `
    }
})


// To add all songs in the document from array of objects
const addSongs = () => {
    songList.forEach((e, i) => {
        songListCon.innerHTML += `
        <li id="${i}" class="song">
        <img class="songCover" src="${songList[i].covers}" alt="">
        <div class="nameInfo">
        <h1 class="songName">${songList[i].name}</h1>
        <p class="songInfo">${songList[i].singer}</p>
        </div>
        <img class="gif" src="images/volume.gif">
        </li>
        `
    })
}

// Changes the seekbar position when time updates
const timeUpdate = () => {
    songElem.addEventListener("timeupdate", () => {
        seekBar.value = parseInt((songElem.currentTime / songElem.duration) * 100);
        seekBar.style.background = `linear-gradient(to right,
            #cc181e 0%, #cc181e ${seekBar.value}%,
            #444 ${seekBar.value}%, #444 100%)`;

        let dur = ((songElem.duration / 60) % 10).toFixed(2).toString()
        let cur = ((songElem.currentTime / 60) % 10).toFixed(2).toString();
        cur = cur.replace(".", ":");
        dur = dur.replace(".", ":");
        songTime.innerText = `
            ${cur}/${dur}
            `
    })
}
// ********************************************************************




// Self calling
addSongs();
timeUpdate();





// To 
Array.from(songListCon.childNodes).forEach((elem, index) => {
    elem.addEventListener("click", (e) => {
    
        changeSong(Number(elem.id));
})
})

const changeSong = (index)=>{
    if (!songElem.paused) {
        songElem.pause();
        playBtn.innerHTML = `<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"  style="pointer-events: none; display: block; width: 100%; height: 100%;"><g ><path d="M6,4l12,8L6,20V4z" ></path></g></svg>
        `
    }
    const gif = Array.from(document.getElementsByClassName("gif"))
    gif.forEach((e)=>{
        e.style.opacity=0;
    })

    gif[index].style.opacity = "1";
    leftSection.innerHTML = ` <img src="${songList[index].covers}" alt="" width="100%" height="100%">`;

    centreFooter.innerHTML = `
    <img class="songCover" src="${songList[index].covers}" alt="">
    <div class="masterInfo">
    <h1 class="songName">${songList[index].name}</h1>
    <div class="songInfo"> 
    <ul>
        <li>Singer:${songList[index].singer}</li>
        <li id="like">&bull;Likes:<span>${songList[index].likes}</span></li>
        <li>&bull;Views:${songList[index].views}</li>
    </ul>
    
    <div class="icon" id="dislikeBtn">
        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z" class="style-scope yt-icon"></path></g></svg>
        </div>
        <div class="icon" id="likeBtn">
        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z" class="style-scope yt-icon"></path></g></svg>
        </div>
        
        <div class="icon">
        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M12,16.5c0.83,0,1.5,0.67,1.5,1.5s-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5S11.17,16.5,12,16.5z M10.5,12 c0,0.83,0.67,1.5,1.5,1.5s1.5-0.67,1.5-1.5s-0.67-1.5-1.5-1.5S10.5,11.17,10.5,12z M10.5,6c0,0.83,0.67,1.5,1.5,1.5 s1.5-0.67,1.5-1.5S12.83,4.5,12,4.5S10.5,5.17,10.5,6z" class="style-scope yt-icon"></path></g></svg>
        </div>
        </div>
        `
    songElem = new Audio(songList[index].path);
    songElem.play();
    playBtn.innerHTML = `<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"  style="pointer-events: none; display: block; width: 100%; height: 100%;"><g height="24" viewBox="0 0 24 24" width="24" ><path d="M9,19H7V5H9ZM17,5H15V19h2Z" ></path></g></svg>`
    songElem.currentTime = 0;
    timeUpdate();


    songElem.volume = volumeBar.value / 100;
    volumeBar.style.background = `linear-gradient(to right,
        white 0%, white ${songElem.volume * 100}%,
        #444 ${songElem.volume * 100}%, #444 100%)`;
    const likeBtn = document.getElementById("likeBtn")
    const dislikeBtn = document.getElementById("dislikeBtn");
    
    
    likeBtn.addEventListener("click", () => {
        const likeElem = document.getElementById("like").firstElementChild;
        if (likeCount === 0) {
            likeElem.innerText = Number(likeElem.innerText) + 1;
           
            likeCount++;
        }
        else if (likeCount == 1) {
            likeElem.innerText = Number(likeElem.innerText) - 1;
            likeCount--;
         
        }

        
    })
    
    dislikeBtn.addEventListener("click", () => {
        const likeElem = document.getElementById("like").firstElementChild;
        if (likeCount === 1) {
            likeElem.innerText = Number(likeElem.innerText) - 1;
            likeCount--;
    
        }
    });
 
}




// When user changes seekbar position then current time of song changes
seekBar.addEventListener("change", () => {
    songElem.currentTime = (seekBar.value * songElem.duration / 100);
})
// ********************************************************************





// like button and dislike button logic  

let likeCount = 0;

likeBtn.addEventListener("click", () => {
    const likeElem = document.getElementById("like").firstElementChild;
    if (likeCount === 0) {
        likeElem.innerText = Number(likeElem.innerText) + 1;
       
        likeCount++;
    }
    else if (likeCount == 1) {
        likeElem.innerText = Number(likeElem.innerText) - 1;
        likeCount--;
     
    }
})
    
dislikeBtn.addEventListener("click", () => {
    const likeElem = document.getElementById("like").firstElementChild;
    if (likeCount === 1) {
        likeElem.innerText = Number(likeElem.innerText) - 1;
        likeCount--;

    }
});



// ********************************************************************

// When user changes the value of volume bar then volume of song changes
volumeBar.addEventListener("change", () => {
    if (volumeBar.value>0)
    {
        volumeIcon.innerHTML = `
         <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"  style="pointer-events: none; display: block; width: 100%; height: 100%;"><g ><path d="M17.5,12c0,2.14-1.5,3.92-3.5,4.38v-1.04c1.44-0.43,2.5-1.76,2.5-3.34c0-1.58-1.06-2.9-2.5-3.34V7.62 C16,8.08,17.5,9.86,17.5,12z M12,4.07v15.86L6.16,15H3V9h3.16L12,4.07z M11,6.22L6.52,10H4v4h2.52L11,17.78V6.22z M21,12 c0,4.08-3.05,7.44-7,7.93v-1.01c3.39-0.49,6-3.4,6-6.92s-2.61-6.43-6-6.92V4.07C17.95,4.56,21,7.92,21,12z" ></path></g></svg>
        `
    }
    songElem.volume = volumeBar.value / 100;
    volumeBar.style.background = `linear-gradient(to right,
        white 0%, white ${songElem.volume * 100}%,
        #444 ${songElem.volume * 100}%, #444 100%)`;
});
// ********************************************************************

// Volume mute and unmute
volumeIcon.addEventListener("click", () => {

    if (songElem.volume > 0) {
        songElem.volume = 0;
        volumeIcon.innerHTML = `
        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"  style="pointer-events: none; display: block; width: 100%; height: 100%;"><g ><path d="M3.15,3.85l4.17,4.17L6.16,9H3v6h3.16L12,19.93v-7.22l2.45,2.45c-0.15,0.07-0.3,0.13-0.45,0.18v1.04 c0.43-0.1,0.83-0.27,1.2-0.48l1.81,1.81c-0.88,0.62-1.9,1.04-3.01,1.2v1.01c1.39-0.17,2.66-0.71,3.73-1.49l2.42,2.42l0.71-0.71 l-17-17L3.15,3.85z M11,11.71v6.07L6.52,14H4v-4h2.52l1.5-1.27L11,11.71z M10.33,6.79L9.62,6.08L12,4.07v4.39l-1-1V6.22L10.33,6.79 z M14,8.66V7.62c2,0.46,3.5,2.24,3.5,4.38c0,0.58-0.13,1.13-0.33,1.64l-0.79-0.79c0.07-0.27,0.12-0.55,0.12-0.85 C16.5,10.42,15.44,9.1,14,8.66z M14,5.08V4.07c3.95,0.49,7,3.85,7,7.93c0,1.56-0.46,3.01-1.23,4.24l-0.73-0.73 C19.65,14.48,20,13.28,20,12C20,8.48,17.39,5.57,14,5.08z" ></path></g></svg>
        `
    }
    else {
        songElem.volume = volumeBar.value / 100;
        volumeIcon.innerHTML = `
        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"  style="pointer-events: none; display: block; width: 100%; height: 100%;"><g ><path d="M17.5,12c0,2.14-1.5,3.92-3.5,4.38v-1.04c1.44-0.43,2.5-1.76,2.5-3.34c0-1.58-1.06-2.9-2.5-3.34V7.62 C16,8.08,17.5,9.86,17.5,12z M12,4.07v15.86L6.16,15H3V9h3.16L12,4.07z M11,6.22L6.52,10H4v4h2.52L11,17.78V6.22z M21,12 c0,4.08-3.05,7.44-7,7.93v-1.01c3.39-0.49,6-3.4,6-6.92s-2.61-6.43-6-6.92V4.07C17.95,4.56,21,7.92,21,12z" ></path></g></svg>
        `
    }
});
// ********************************************************************



preBtn.addEventListener("click", ()=>{
    index-=1;
    if (index<0)
    {
        index=songList.length-1;
    }
    changeSong(index);
})

nextBtn.addEventListener("click", ()=>{
    index+=1;
    if (index>songList.length-1)
    {
        index=0;
    }
    changeSong(index);
})


window.addEventListener("keydown", (e)=>{
    
    if (e.code==="Space")
    {
        if (songElem.paused)
        {
            songElem.play();
            playBtn.innerHTML = `<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"  style="pointer-events: none; display: block; width: 100%; height: 100%;"><g height="24" viewBox="0 0 24 24" width="24" ><path d="M9,19H7V5H9ZM17,5H15V19h2Z" ></path></g></svg>`


        }
        else
        {
            songElem.pause();
            playBtn.innerHTML = `<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"  style="pointer-events: none; display: block; width: 100%; height: 100%;"><g ><path d="M6,4l12,8L6,20V4z" ></path></g></svg>
            `
        }
    }

})


toggleButton.addEventListener("click", ()=>{
    toggleButton.previousElementSibling.classList.toggle("hidden")
    if (toggleButton.previousElementSibling.classList.contains("hidden"))
    {
        document.getElementsByClassName("rightFooter")[0].style.background = "transparent";
    }
    else
    {
        document.getElementsByClassName("rightFooter")[0].style.background = "#212121";
    }
})

