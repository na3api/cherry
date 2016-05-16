var game_area = {
    place: {x1: 20, y1: 20, x2: 500, y2: 350},
    available_zone: {x1: 18, y1: 200, x2: 484, y2: 318},
    show: function () {
        //pattern: {img: $c.images.terrain, type: 'no-repeat'},
        $c.rect(0, 0, 700, 400, {background: 'yellow', width: 1, line: 'black'})
        $c.image($c.images.terrain, [[this.place.x1, this.place.y1], [this.place.x2, this.place.y2], [0, 0]]);
    }
};