App = {
  web3Provider: null,
  contracts: {},

  init: function () {
    $.getJSON("/playlists").then(function (files) {
      for (i = 0; i < files.length; i++) {
        playlist = files[i]
        var playlistsRow = $('#playlistsRow');
        var playlistsTemplate = $('#playlistsTemplate');

        playlistsTemplate.find('.link').attr('href', '/play.html?video='+playlist);
        playlistsTemplate.find('.link').text(playlist)

        playlistsRow.append(playlistsTemplate.html());
      }

    })

    App.bindEvents();
  },

  bindEvents: function () {
    $(document).on('click', '.btn-submit', App.handleClickUpload);
  },

  handleClickUpload: function () {
    document.getElementById('loading').classList.add("show");
  },

};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
