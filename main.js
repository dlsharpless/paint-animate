let canvasWidth = $("#canvas").width();
let canvasHeight = $("#canvas").height();
 let colors = ["black","gray","white","burlywood","saddlebrown","red","orange","yellow","green","blue","purple"];
// let crayonHex = ["#232323","#199EBD","#1CAC78","#1DACD6","#1F75FE","#5D76CB","#7366BD","#80DAEB","#926EAE","#95918C","#B0B7C6","#B5674D","#BC5D58","#C0448F","#C5E384","#CDA4DE","#DBD7D2","#EDEDED","#EE204D","#F0E891","#F75394","#FAA76C","#FC2847","#FCE883","#FDBCB4","#FDD9B5","#FDDB6D","#FF5349","#FF7538","#FFAACC","#FFB653","#FFCFAB"];
//let crayonName = ["Black","Blue Green","Green","Cerulean","Blue","Indigo","Blue Violet","Sky Blue","Violet (Purple)","Gray","Cadet Blue","Brown","Chestnut","Red Violet","Yellow Green","Wisteria","Timberwolf","White","Red","Green Yellow","Violet Red","Tan","Scarlet","Yellow","Melon","Apricot","Dandelion","Red Orange","Orange","Carnation Pink","Yellow Orange","Peach"];
let colorHeight = Math.floor(canvasHeight/colors.length);
let pixelDimension = 8;
let pixelColumns = Math.floor(canvasWidth/pixelDimension);
let pixelRows = Math.floor(canvasHeight/pixelDimension);
let activeColor = "black";
let frame = 0;
let reel = [""];

//render palette
let paletteHTML = `<div class="color" style="background-color:${colors[0]};height:${colorHeight-2+canvasHeight%colors.length}px;top:0}"></div>`;
for (i = 1; i < colors.length; i++) {
    paletteHTML += `<div class="color" style="background-color:${colors[i]};height:${colorHeight-2}px;top:${canvasHeight*i}"></div>`;
}
$("#palette").html(paletteHTML);

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
    reel[frame] = $("#canvas").html();
    if (frame != 0) {
        for (i = 0; i < reel.length; i++) {
            (function(i) {setTimeout(function() {$("#canvas").html(reel[i]);},500*i);})(i);
        }
    }
    setTimeout(paint,500*reel.length);
});

paint();