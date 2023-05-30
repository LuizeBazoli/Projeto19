var PLAY=1;
var END=0;
var gameState= PLAY;

var menina, menina_correndo, menina_caindo;
var ground, invisibleGround, groundImage;

var banana, maça, pera;
var abelha, mosquito;
var bananaImg, maçaImg, peraImg;
var abelhaImg, mosquitoImg;

var gameOver, restart, gameOverImg, restartImg;

var score= 0;

function preload(){
    menina_correndo= loadAnimation("menina1.png","menina2.png");
    menina_caindo= loadAnimation("menina3.png");

    groundImage= loadImage("background.png");

    bananaImg= loadImage("banana.png");
    maçaImg= loadImage("maçã.png");
    peraImg= loadImage("pêra.png");

    abelhaImg= loadImage("abelha.png");
    mosquitoImg= loadImage("mosquito.png");

    gameOverImg= loadImage("gameover.png");
    restartImg= loadImage("restart.png");
}

function setup() {
    createCanvas(800,400);
    ground= createSprite(400,200);
    ground.addImage(groundImage);
    ground.scale=0.5;

    menina= createSprite(50,340,30,50);
    menina.addAnimation("running", menina_correndo);
    menina.addAnimation("collided", menina_caindo);
    menina.scale= 0.08;

    gameOver= createSprite(400,200);
    gameOver.addImage(gameOverImg);

    restart= createSprite(400,280);
    restart.addImage(restartImg);
    restart.scale=0.2;

    invisibleGround= createSprite(400,345,800,10);
    invisibleGround.visible= false;

    bananasGroup= createGroup();
    maçasGroup= createGroup();
    perasGroup= createGroup();
    abelhasGroup= createGroup();
    mosquitosGroup= createGroup();

    score= 0;
}

function draw() {
    background(255);
    text("Pontuação: "+ score,700,50);

    if(gameState=== PLAY){
        gameOver.visible= false;
        restart.visible= false;

        ground.velocityX= -(5+2*score/20);
        if(ground.x>450){
            ground.x= width/2;
        }

        if(keyIsDown("space")&& menina.y >=260){
            menina.velocityY= -14;
        }

        menina.velocityY+= 0.8;

        createBanana();
        createMaça();
        createPera();
        createMosquito();
        createAbelha();

        if(bananasGroup.isTouching(menina)){
            bananasGroup.destroyEach();
            score+= 10;
        }
        else if(maçasGroup.isTouching(menina)){
            maçasGroup.destroyEach();
            score+= 15;
        }
        else if(perasGroup.isTouching(menina)){
            perasGroup.destroyEach();
            score+= 20;
        }
        else{
            if(mosquitosGroup.isTouching(menina) || abelhasGroup.isTouching(menina)){
                gameState=END;
            }
        }
    } 
    else if(gameState=== END){
        gameOver.visible= true;
        restart.visible= true;

        menina.changeAnimation("collided", menina_caindo);

        if(mousePressedOver(restart)){
            reset();
        }

        ground.velocityX=0;
        menina.velocityY=0;

        bananasGroup.setLifetimeEach(-1);
        maçasGroup.setLifetimeEach(-1);
        perasGroup.setLifetimeEach(-1);
        mosquitosGroup.setLifetimeEach(-1);
        abelhasGroup.setLifetimeEach(-1);

        bananasGroup.setVelocityXEach(0);
        maçasGroup.setVelocityXEach(0);
        perasGroup.setVelocityXEach(0);
        mosquitosGroup.setVelocityXEach(0);
        abelhasGroup.setVelocityXEach(0);
    }

    menina.collide(invisibleGround);

    drawSprites();
}

function reset(){
    gameState=PLAY;
    gameOver.visible= false;
    restart.visible= false;
    bananasGroup.destroyEach();
    maçasGroup.destroyEach();
    perasGroup.destroyEach();
    mosquitosGroup.destroyEach();
    abelhasGroup.destroyEach();
    score= 0;
    menina.changeAnimation("running", menina_caindo);
}

function createBanana(){
    if(frameCount% 190 ==0)
    {
        var banana= createSprite(800,310,10,10);
        banana.addImage(bananaImg);
        banana.scale= 0.03;
        banana.velocityX= -5;
        banana.lifetime= 800;
        //criar grupo
        bananasGroup.add(banana);
    }
}

function createMaça(){
   if(frameCount% 212 ==0)
   {
    var maça= createSprite(800,310,10,10);
    maça.addImage(maçaImg);
    maça.scale= 0.08;
    maça.velocityX= -5;
    maça.lifetime= 800;
    //criar grupo
    maçasGroup.add(maça);
} 
}

function createPera(){
    if(frameCount% 397 ==0)
    {
     var pera= createSprite(800,310,10,10);
     pera.addImage(peraImg);
     pera.scale= 0.015;
     pera.velocityX= -5;
     pera.lifetime= 800;
     //criar grupo
     perasGroup.add(pera);
 } 
 }

 function createMosquito(){
    if(frameCount% 555 ==0)
    {
     var mosquito= createSprite(750,310,10,10);
     mosquito.addImage(mosquitoImg);
     mosquito.scale= 0.1;
     mosquito.velocityX= -5;
     mosquito.lifetime= 800;
     //criar grupo
     mosquitosGroup.add(mosquito);
 } 
 }

 function createAbelha(){
    if(frameCount% 290 ==0)
    {
     var abelha= createSprite(800,310,10,10);
     abelha.addImage(abelhaImg);
     abelha.scale= 0.08;
     abelha.velocityX= -5;
     abelha.lifetime= 800;
     //criar grupo
     abelhasGroup.add(abelha);
 } 
 }