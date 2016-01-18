# Сherry.js
Framework for canvas with orientation for games

#INIT SCRIPT 

    $c.init('#canvas', {width:700, height:400} ,function($c){
        //your code
    });

#DROW LINE

    $c.line([from], [to], {options})
    /**        
    * EXAMPLE
    */
    var options = {   
        color:'#005999', //line color formats: '#FFFFFF', 'rgba(255,255,255,0)', 'rgb(0,0,0)', 'white'
        width: '6',  //line wight in px
        lineJoin: 'round', //line connect VALUES: 'round', 'bevel', 'miter'
        lineCap: 'round' //lineCap property sets or returns the style of the end caps for a line  VALUES: 'round', 'square', 'butt'
    }
    $c.line([20,20], [[20,100],[50,50],[112, 0],[111,111]], options)
                .line([100,100], {color:'#FF5999'})
                .line([100,20], {color:'green'})
                .line([20, 20], {color: 'orange'});

