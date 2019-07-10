App = {
  init: function () {
    var video = document.getElementById('video');
    video.autoplay = false;
 
    var playlist = new URLSearchParams(window.location.search).get("video")

    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(playlist);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
      })
    }
  },
};
    


$(function () {
  $(window).load(function () {
    App.init();
  });
});
