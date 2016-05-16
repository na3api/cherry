var player = {
    state: 0,
    direction: 0, // 0 - right | 1 - left
    last_change: 0,
    progress: 1,
    speed: 0.6,
    action: 'stand',
    pos: [30, 300],
    size: [ 37, 53],
    animation: {
        stand: {
            loop: false,
            speed: 180,
            slide: [
                [17, 20],
                [65, 20],
                [114, 20],
                [164, 20]]},
        walk: {
            loop: true,
            speed: 120,
            slide: [
                [243, 20],
                [288, 20],
                [327, 20],
                [369, 20],
                [411, 18],
                [450, 18]
            ]},
        run: {
            loop: true,
            speed: 120,
            slide: [
                [243, 20],
                [288, 20],
                [327, 20],
                [369, 20],
                [411, 18],
                [450, 18]
            ]}
    },
    show: function () {        
        if ($c.lastTime - this.last_change > this.animation[this.action].speed) {
            this.last_change = $c.lastTime;
            if (this.animation[this.action].loop) {
                this.state++;
            } else {
                this.state = this.state + this.progress;
            }
            if (this.animation[this.action].slide[this.state] == undefined)
            {
                if (this.progress > 0)
                    this.progress = -1;
                else
                    this.progress = 1;

                if (this.animation[this.action].loop) {
                    this.state = 0;
                } else {
                    this.state = this.state + this.progress + this.progress;
                }

            }

        }
        $c.image($c.images.naruto_sprite3, [this.pos, this.size, this.animation[this.action].slide[this.state]], this.direction);
        return this;
    },
    press: function (btn_key, callback) {
        if (!$c.player.click) {
            document.addEventListener('keydown', function (e) {
                console.log(e)
                return callback($c.player);
            });
            $c.player.click = true;
        }
        if (!$c.player.click) {
            document.addEventListener('dblclick', function (e) {
                console.log(e)
                return callback($c.player);
            });
            $c.player.click = true;
        }

    }
};