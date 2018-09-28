let canvasWidth = $("#canvas").width();
let canvasHeight = $("#canvas").height();
let colors = ["black","gray","white","red","orange","yellow","green","blue","purple"];
let colorHeight = Math.floor(canvasHeight/colors.length);
let pixelDimension = 8;
let pixelColumns = Math.floor(canvasWidth/pixelDimension);
let pixelRows = Math.floor(canvasHeight/pixelDimension);
let activeColor = "black";
let frame = 0;
let reel = [""];

//render pallette
let palletteHTML = `<div class="color" style="background-color:black;height:${colorHeight-2+canvasHeight%colors.length}px;top:0}"></div>`;
for (i = 1; i < colors.length; i++) {
    palletteHTML += `<div class="color" style="background-color:${colors[i]};height:${colorHeight-2}px;top:${canvasHeight*i}"></div>`;
}
$("#pallette").html(palletteHTML);

//render canvas
let canvasHTML = "";
for (i = 0; i < pixelColumns*pixelRows; i++){
    canvasHTML += `<div class="pixel"></div>`;
}
$("#canvas").html(canvasHTML);

//select color
$(".color").on("click",function(){
    activeColor = this.style.backgroundColor;
    $("#active").css("background-color",activeColor);
    if (activeColor === "white") {$("#active").css("background-color","transparent")};
    if (activeColor === "white" || activeColor === "yellow" || activeColor === "orange") {
        $("#active").css("color","black");
    } else {
        $("#active").css("color","white");
    }
});

//paint canvas
let paint = function(){
    $(".pixel").on("mousedown",function(){
        $("#canvas").on("contextmenu", event => event.preventDefault());
        let mousePressed = true;
        this.style.backgroundColor = activeColor;
        $(document).on("mouseup",function(){
            mousePressed = false;
        });
        $(".pixel").on("mouseover",function(){
            if (mousePressed) {
                this.style.backgroundColor = activeColor;
            }
            $(document).on("mouseup",function(){
                mousePressed = false;
            });
        });
    });
}

//fill canvas
$("#fill").on("click",function(){
    $(".pixel").css("background-color",activeColor);
});

//reset frame
$("#reset").on("click",function(){
    if (frame === 0) {
        $("#canvas").html(canvasHTML);
    } else {
        $("#canvas").html(reel[frame-1]);
    }
    paint();
});

//next frame
$("#next").on("click",function(){
    reel[frame] = $("#canvas").html();
    frame++;
});

//play all
$("#play").on("click",function(){
    if (frame != 0) {
        for (i = 0; i < reel.length; i++) {
            (function(i) {setTimeout(function() {$("#canvas").html(reel[i]);},500*i);})(i);
        }
    }
    setTimeout(paint,500*reel.length);
});

paint();