let width;
let height;
let headerHeight;
let useableHeight;
let useableWidth;

function screenSize() {
  width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  headerHeight = Math.max(document.getElementById('header').clientHeight || 0);
  useableHeight = height - headerHeight;
  useableWidth = width-18;
}

function scalingSize() {
  
  document.getElementById('twitch-embed').innerHTML = "";

  screenSize();

  new Twitch.Embed("twitch-embed", {
    width: useableWidth,
    height: useableHeight,
    theme: 'dark',
    channel: "the_geeze"
  });
}

window.onload = function() {
  
  screenSize();

  new Twitch.Embed("twitch-embed", {
    width: useableWidth,
    height: useableHeight,
    theme: 'dark',
    channel: "the_geeze"
  });

  const xmlhttp = new XMLHttpRequest();
  const currentURL = window.location.origin;

  xmlhttp.onreadystatechange = function() {

    if (xmlhttp.readyState == XMLHttpRequest.DONE) { 

      if (xmlhttp.status == 200) {

        const data = JSON.parse(xmlhttp.response);

        for(let i=0;i<9;i++){
          const title = data[i].title;
          const link = data[i].link.slice(9, data[i].link.length);
          const url = 'https://www.youtube.com/embed/' + link; //+ '?'

          const iframe = document.createElement('IFRAME');
  
          document.getElementById('video-section').appendChild(iframe)
 
          iframe.classList.add('youtube-video')
          iframe.setAttribute('id', 'youtube-video'+i)
          iframe.setAttribute('src', url)
          iframe.setAttribute('frameborder', "0")
          iframe.setAttribute('allow', "autoplay; encrypted-media")
          iframe.setAttribute('allowfullscreen', true)
          iframe.setAttribute('onClick', 'mainVideo()')
          
          if (i===0) {
            iframe.classList.add('main-video')
          }
        }
      }
      else if (xmlhttp.status == 400) {
        alert('There was an error 400');
      }
      else {
        alert('something else other than 200 was returned');
      }
    }
  };  
  xmlhttp.open("GET", currentURL+"/geeze/videos", true);
  xmlhttp.send();
}

function mainVideo(event) {
  event.preventDefault();

  if (!this.classList.contains("main-video")){
    var nodes = document.getElementById('video-section').childNodes;

    for(var i=0; i<nodes.length; i++) {
      if (nodes[i].classList.contains('main-video')) {
        nodes[i].classList.remove('main-video')
      }
    }

    this.classList.add('main-video')
  }
}