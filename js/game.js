var timeout;
cherry.init('#canvas', {width: 700, height: 400, frame: true,
    resources: {
        terrain: 'images/sprites/terrain.png',
        naruto_sprite3: 'images/sprites/NarutoSprites3.png',
        player: 'js/objects/player.js', 
        player_2: 'js/objects/player_2.js', 
        game_area: 'js/objects/game_area.js', 
        game_menu: 'js/objects/game_menu.js', 
   }},
        function ($c) {
            $c.objects.game_area.show();
            $c.objects.game_menu.show($c.frame_count);

            // var pat = $c.canvas.createPattern($c.images.lamp, 'repeat');
            //       $c.canvas.fillStyle = pat;
            //     $c.canvas.fill();
            /* $c.line([30,40],[[40,100],[50,50],[112, 112],[111,111]],{color:'#005999', width: '6',  lineJoin: 'round',lineCap: 'round'})
             .line([100,100], {color:'#FF5999'})
             .line([100, 30], {color:'green'})
             .line([40, 50], {color: 'orange'});*/
            //p($c.images
            //$c.image($c.images.naruto_sprite, [70, 119, 28, 39, 30, 150, 28, 39]); 
            if (input != undefined) {
                if (input.isDown('UP')) {
                    $c.objects.player.action = 'walk';
                    if (timeout) {
                        clearTimeout(timeout);
                    }
                    timeout = setTimeout(function () {
                        $c.objects.player.state = 0;
                        $c.objects.player.progress = 1;
                        $c.objects.player.action = 'stand';
                    }, 100);
                    if($c.objects.game_area.available_zone.y1 < ($c.objects.player.pos[1] - $c.objects.player.speed)){
                        $c.objects.player.pos[1] -= $c.objects.player.speed;                        
                    }
                }

                if (input.isDown('RIGHT')) {
                    $c.objects.player.direction = 0;
                    $c.objects.player.action = 'walk';
                    if (timeout) {
                        clearTimeout(timeout);
                    }
                    timeout = setTimeout(function () {
                        $c.objects.player.state = 0;
                        $c.objects.player.progress = 1;
                        $c.objects.player.action = 'stand';
                    }, 100);
                    if($c.objects.game_area.available_zone.x2 > ($c.objects.player.pos[0] + $c.objects.player.speed)){
                        $c.objects.player.pos[0] += $c.objects.player.speed;                        
                    }

                }
                if (input.isDown('LEFT')) {
                    $c.objects.player.direction = 1;
                    $c.objects.player.action = 'walk';
                    if (timeout) {
                        clearTimeout(timeout);
                    }
                    timeout = setTimeout(function () {
                        $c.objects.player.state = 0;
                        $c.objects.player.progress = 1;
                        $c.objects.player.action = 'stand';
                    }, 100);
                    
                    if($c.objects.game_area.available_zone.x1 < ($c.objects.player.pos[0] - $c.objects.player.speed)){
                        $c.objects.player.pos[0] -= $c.objects.player.speed;                        
                    }
                }
                if (input.isDown('DOWN')) {
                    $c.objects.player.action = 'walk';
                    if (timeout) {
                        clearTimeout(timeout);
                    }
                    timeout = setTimeout(function () {
                        $c.objects.player.state = 0;
                        $c.objects.player.progress = 1;
                        $c.objects.player.action = 'stand';
                    }, 100);
                    if($c.objects.game_area.available_zone.y2 > ($c.objects.player.pos[1] + $c.objects.player.speed)){
                        $c.objects.player.pos[1] += $c.objects.player.speed;                        
                    }
                }
//                if (input.isDown('SPACE')) {
//                    var jump;
//                    if(jump === undefined){
//                        $c.objects.player.pos[1] -= $c.objects.player.speed * 4;                        
//                        var jump = setTimeout(function(){
//                            clearTimeout(jump);
//                            $c.objects.player.pos[1] += $c.objects.player.speed * 3;
//                        },400);
//                    } 
//                }
            }
            $c.objects.player.show();
            $c.objects.player_2.show();
        }, {
});