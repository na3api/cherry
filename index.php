<!DOCTYPE html>
<html lang="en">
<head>
	<!-- META TAGS -->
	<!-- ========================================================= -->
	<meta charset="UTF-8">
	<meta name="viewport" content="width=820">
	<meta name="format-detection" content="telephone=no">	

	<!-- TITLE -->
	<!-- ========================================================= -->	
	<title>Game of Life</title>

	<!-- FAVICON -->
	<!-- ========================================================= -->
	<link rel="shortcut icon" href="">

	<!-- CSS -->
	<!-- ========================================================= -->	
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/validation.css" rel="stylesheet">
    <link href="css/bootstrap-responsive.min.css" rel="stylesheet">
	<!-- JQUERY FROM CDN -->
	<!-- ========================================================= -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <link href="http://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">
    
    <script src="js/bootstrap.min.js"></script>

</head>

<body>
    <div class="body">
         <h1>Game of Life</h1>
         <div class="buttons_block">
             <button id="stop" class="btn btn-primary"><span class="glyphicon glyphicon-pause" aria-hidden="true"></span></button>      
             <button id="next" class="btn btn-primary" disabled="disabled"><span class="glyphicon glyphicon-step-forward" aria-hidden="true"></span></button> 
             <button id="change_genertion" class="btn btn-success" >Change generation</button>
         </div>
         <canvas id="life" ></canvas>
         
    </div>       
</body>
<div class="modal fade" tabindex="-1" role="dialog" id="options" >
  <div class="modal-dialog">
    <div class="modal-content">
    <form id="start_condition" method="post"> 
      <div class="modal-header">
       
        <h4 class="modal-title">Game of Life</h4>
      </div>
      <div class="modal-body">
        First generation
        <p >
            <canvas id="canvas" width="830" height="200"> </canvas>
        </p>
        <p id="figures"></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" disabled="disabled" id="close">Close</button>
        <button type="submit" class="btn btn-primary" id="start">Start game</button>
      </div>
      </form>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<script src="js/script.js"></script>
</html>