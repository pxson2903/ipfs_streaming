App = {
  init: function () {
    var video = document.getElementById('video');
    video.autoplay = false;
 
    var playlist = new URLSearchParams(window.location.search).get("video")

    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource("files/" + playlist);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        var promise = video.play();
        
        if (promise !== undefined) {
          promise.then(_ => {
            // Autoplay started!
          }).catch(error => {
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
          });
        }
      });
    }
  },
};
    


$(function () {
  $(window).load(function () {
    App.init();
  });
});
