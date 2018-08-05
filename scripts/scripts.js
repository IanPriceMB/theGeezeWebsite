
const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
const headerHeight = Math.max(document.getElementById('header').clientHeight || 0);
const useableHeight = height - headerHeight;
const useableWidth = width-18;

new Twitch.Embed("twitch-embed", {
    width: useableWidth,
    height: useableHeight,
    theme: 'dark',
    channel: "the_geeze"
  });




