$(function(){
    var imgWidth = 25;
    var imgHeight = 20;
    var rows = 4;
    var columns = 5;
    var imgSrc = "images/StarryNight.jpg";
    
    $("#difficulty").change(function(){
        var dim = $(this).val().split(" ");
        columns = parseInt(dim[0]);
        rows = parseInt(dim[1]);
    });
    $("#final").click(init);
    
    function randomize(puzzle){
        for (var i = puzzle.length-1; i > 0; i--){
            var idx = Math.floor(Math.random()*i);
            var temp = puzzle[idx];
            puzzle[idx] = puzzle[i];
            puzzle[i] = temp;
        }
    }
    
    function init(){
        $("h1").html("Solve the Puzzle!");
        var total = rows*columns;
        var count = 0;
        $("#final").hide();
        $("#difficulty").hide();
        var puzzle = [];
        for(var i = 0; i < rows; i++){
           for(var j = 0; j < columns; j++){
               puzzle.push("<div class='"+(i*columns+j)+" imgContainer'>"+
                           "<img src="+imgSrc+
                           " style='margin-left: -"+(j*imgWidth/columns)+"rem;"+
                           "margin-top: -"+(i*imgHeight/rows)+"rem;'></img></div>");
               $("#drop-zone").append("<div class='"+(i*columns+j)+
                                    " imgContainer'></div>");
           }
       }
       randomize(puzzle);
       puzzle.forEach(function(piece){
          $("#pieces").append(piece); 
       });
       $(".imgContainer").css({
            "width": imgWidth/columns+"rem",
            "height": imgHeight/rows+"rem"     
       });
       $("#pieces > .imgContainer").draggable();
       $("#drop-zone > .imgContainer").droppable({
           drop: function(event, ui){
               var destNum = $(this).attr("class").split(" ")[0];
               var pieceNum = ui.draggable.attr("class").split(" ")[0];
               if (destNum === pieceNum){
                   $(this).append(ui.draggable.find("img"))
                   .css("border-style", "none");
                   ui.draggable.addClass("invisible");
                   count ++;
                   if (count === total){
                       $("h1").html("Great Job! Click to Replay");
                       $(".picture").empty();
                       $("#final").show();
                       $("#difficulty").show();
                   }
               }else{
                   ui.draggable.css({
                       "border": ".1rem solid red"
                   });
               }
           }
       });
    }
});