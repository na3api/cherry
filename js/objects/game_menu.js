var game_menu = {
    place: {x1: 530, y1: 40, x2: 600, y2: 350},
    show: function (user_score) {
        $c.text('FIRST GAME', {stroke: true, position: [this.place.x1, this.place.y1], color: 'black', font: '24px Arial'})
                .text('Frame count: ' + user_score, {position: [this.place.x1, this.place.y1 + 30], color: 'black'})
                .text('Player position: ' + Math.round($c.objects.player.pos[0]) + ' ' + Math.round($c.objects.player.pos[1]), {position: [this.place.x1, this.place.y1 + 60], color: 'black'})
    }
};
