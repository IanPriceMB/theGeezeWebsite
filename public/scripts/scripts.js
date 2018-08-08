let width;
let height;
let headerHeight;
let useableHeight;
let useableWidth;

//all the functions that need to run when the page loads
window.onload = function() {
  //adding the auto scroll function to the page
  addScroll();
  //get the screen size so that twitch will load properly
  screenSize();
  //create a new twitch player that is the right size
    new Twitch.Embed("twitch-embed", {
    width: useableWidth,
    height: useableHeight,
    theme: 'dark',
    channel: "the_geeze"
  });
  //getting my youtube videos
  ajaxCall();  

}

//handle the math for dynamically siznig twitch feed
//does width minus scroll bar and height minus header
function screenSize() {
  width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  headerHeight = Math.max(document.getElementById('header').clientHeight || 0);
  useableHeight = height - headerHeight;
  useableWidth = width-18;
}

// tied to body in html
//this will resize twitch feed when the window is resized
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

//this is supposed to make the currently viewed youtube video the big on it the grid
//this is not working
function mainVideo() {
  console.log(this)
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

//this makes and ajax call to get the videos from the database
function ajaxCall() {
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
          iframe.setAttribute('onclick', 'mainVideo()')
          
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

// this is for adding an on click scroll leven to nav items and scroll buttons
function autoScroll(location) {
  document.getElementById(location).scrollIntoView({behavior: 'smooth', block: 'start'})
}

//this is for adding the auto scroll function to the right elements
function addScroll() {
  const navItems = document.getElementsByClassName("navItem");
  const scrollButtons = document.getElementsByClassName("scroll-button");
  
  for(let i =0; i < navItems.length; i++) {
    navItems[i].setAttribute('onclick', 'autoScroll("'+navItems[i].attributes[1].nodeValue+'")')
  }
  for(let i =0; i < scrollButtons.length; i++) {
    scrollButtons[i].setAttribute('onclick', 'autoScroll("'+scrollButtons[i].attributes[1].nodeValue+'")')
  }
}