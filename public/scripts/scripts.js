let width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
let height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
let headerHeight = Math.max(document.getElementById('header').clientHeight || 0);
let useableHeight = height - headerHeight;
let useableWidth = width-18;

new Twitch.Embed("twitch-embed", {
  width: useableWidth,
  height: useableHeight,
  theme: 'dark',
  channel: "the_geeze"
});

function twitchSize() {
  document.getElementById('twitch-embed').innerHTML = "";

  let width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  let height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  let headerHeight = Math.max(document.getElementById('header').clientHeight || 0);
  let useableHeight = height - headerHeight;
  let useableWidth = width-18;

  new Twitch.Embed("twitch-embed", {
    width: useableWidth,
    height: useableHeight,
    theme: 'dark',
    channel: "the_geeze"
  });
}
window.onload = function() {
  var xmlhttp = new XMLHttpRequest();
  var currentURL = window.location.origin;
  console.log(currentURL)

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) { 
      if (xmlhttp.status == 200) {
        const data = JSON.parse(xmlhttp.response);

        for(let i=0;i<data.length;i++){
          const title = data[i].title;
          const link = data[i].link.slice(9, data[i].link.length);
          const url = 'https://www.youtube.com/embed/' + link; //+ '?'
          let iframe = document.createElement('IFRAME');
          document.getElementById('youtube-section').appendChild(iframe)
          iframe.classList.add('youtube-video')
          iframe.setAttribute('id', 'youtube-video'+i)
          iframe.setAttribute('src', url)
          iframe.setAttribute('frameborder', "0")
          iframe.setAttribute('allow', "autoplay; encrypted-media")
          iframe.setAttribute('allowfullscreen', true)


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

