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

  console.log('WIDTH'+width)
  console.log('HEIGHT'+height)
  console.log('HEADER'+headerHeight)
  console.log('UHEIGHT'+useableHeight)
  console.log('WIDTH'+useableWidth)

  new Twitch.Embed("twitch-embed", {
    width: useableWidth,
    height: useableHeight,
    theme: 'dark',
    channel: "the_geeze"
  });
}

