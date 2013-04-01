window.FlippinView = Backbone.View.extend({

    el: '#wrapper',

    template: 'backbone/index',

    events: {
        'click a.money4trax': 'addSong',
        'click a.playlist': 'showPlaylist',
        'click a.cta-donate': 'addSong'
    },

    initialize: function() {
        //_.bindAll(this, 'render');

        //$(this.el).html('<ul><li><a id="pl">playlist</a></li><li><a id="dn">donate</a></li><li><a id="th">thanks</a></li><li><a id="mp">map</a></li><li><a id="hm">home</a></li></ul>');
    },

    addSong: function(ev) {
        ev.preventDefault();

        ev.stopPropagation();

        App.navigate('/addsong', { trigger: true });
    },

    showPlaylist: function(ev) {
        ev.preventDefault();

        ev.stopPropagation();

        App.navigate('/playlist', { trigger: true });
    },

    render: function(state) {
        this.$el.html(JST[this.template]);

        $.when(App.homePage.fetch()).done(function() {
            new HomePageView({
                model: App.homePage
            }).render();
        });

        $.when(App.playlist.fetch()).done(function() {
            new PlaylistView({
                collection: App.playlist
            }).render();
        });

        if(state === "playlist") {
            this.$el.find('.flipContainer').addClass('flipped');
        } else {
            this.$el.find('.flipContainer').removeClass('flipped');
        }

        return this;
    }
});