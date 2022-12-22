/* eslint-disable no-dupe-else-if */
import { useCallback, useEffect, useRef, useState } from "react";

// const canvas = document.getElementById('canvas1');
// console.log(canvas);
// const ctx = canvas.getContext('2d');
// console.log("aa");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

// const playerImage = new Image();
// playerImage.src = "shadow_dog.png";
// console.log(playerImage);
const spriteWidth = 1800;
const spriteHeight = 1000;
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
let staggerFrames = 4;
let dieAbout = 0;
let testCase = 0;
let index = 0;
// let x = 0;

// export function animate(){
//     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//     ctx.fillRect(x, 50, 100, 100);
//     x++;
//     ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
//     if (gameFrame % staggerFrames === 0)
//     {
//         if(frameX < 6) frameX++;
//         else frameX = 0;
//     }

//     gameFrame++;
//     requestAnimationFrame(animate);
// };

const knightAttack = new Image();
knightAttack.src = "https://i.imgur.com/og6wXDp.png";

const knightWalk = new Image();
knightWalk.src = "https://i.imgur.com/JH51EQI.png";

const knightIdle = new Image();
knightIdle.src = "https://i.imgur.com/brFv9Zu.png";

const knightDie = new Image();
knightDie.src = "https://i.imgur.com/tCcE1Vs.png";

const orcWalk = new Image();
orcWalk.src = "https://i.imgur.com/04qvCWA.png";

const orc1Attack = new Image();
orc1Attack.src = "https://i.imgur.com/ES2UGCF.png";
const orc1AttackWidth = 1680;
const orc1AttackHeight = 1000;



const knight2Attack = new Image();
knight2Attack.src = "https://i.imgur.com/CGr46sx.png";

const knight2Idle = new Image();
knight2Idle.src = "https://i.imgur.com/T9T4dNI.png";

const knight2Walk = new Image();
knight2Walk.src = "https://i.imgur.com/XtfE8yx.png";

const knight2Hurt = new Image();
knight2Hurt.src = "https://i.imgur.com/iR54vXJ.png";

const knight2Jump = new Image();
knight2Jump.src = "https://i.imgur.com/0AXzehY.png";


const troll1AttackWidth = 1600;
const troll1AttackHeight = 1000;

const troll1Attack = new Image();
troll1Attack.src = "https://i.imgur.com/pFwrt0T.png";

const troll1Walk = new Image();
troll1Walk.src = "https://i.imgur.com/5fWDc3Q.png";

const troll1Idle = new Image();
troll1Idle.src = "https://i.imgur.com/YSq6TFZ.png";

const troll1Hurt = new Image();
troll1Hurt.src = "https://i.imgur.com/SzZCxZh.png";

const troll1Die = new Image();
troll1Die.src = "https://i.imgur.com/Z0lKNqW.png";




const backgroundImage = new Image();
backgroundImage.src = "https://cdn.vectorstock.com/i/1000x1000/66/80/cartoon-game-background-vector-7926680.webp";


const troll3Hurt = new Image();
troll3Hurt.src = "https://i.imgur.com/hPmsp8P.png";

let lastTime = 0;
let whereabout = 0;
let walkCounter = 0

const draw = (ctx, now, x) => {
  if (!ctx) return;
  // if (now - lastTime >= 6) 
  else {

    if(now - lastTime < 4000)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(orcWalk, frameX * orc1AttackWidth, frameY * orc1AttackHeight, orc1AttackWidth, orc1AttackHeight, 100, -100, orc1AttackWidth / 2, orc1AttackHeight / 2);
      ctx.drawImage(knightWalk, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -200, 0, spriteWidth / 2, spriteHeight / 2);
      whereabout++;
      if (gameFrame % staggerFrames === 0) {
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      }
      gameFrame = 0;
    } 
    else if(gameFrame < 160)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(orc1Attack, frameX * orc1AttackWidth, frameY * orc1AttackHeight, orc1AttackWidth, orc1AttackHeight, 100, -100, orc1AttackWidth / 2, orc1AttackHeight / 2);
      ctx.drawImage(knightAttack, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -200, 0, spriteWidth / 2, spriteHeight / 2);
      whereabout++;
      if (gameFrame % staggerFrames === 0) {
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      }
    }
    // if(now - lastTime > 4000 && now - lastTime < 9400)
    // {
    //   ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //   ctx.drawImage(knightAttack, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -250 + whereabout, 0, spriteWidth / 2, spriteHeight / 2);

    //   if (gameFrame % staggerFrames === 0) {
    //     if (frameX < 9) frameX++;
  
    //     // else if (now - lastTime < 5500) {
    //     //   frameX = 0;
    //     //   ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //     // }
    //     else {
    //       frameX = 0;
    //     }
    //   }
    // }
    // if(now - lastTime > 9400)
    // {
    //   ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //   ctx.drawImage(knightWalk, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -250 + whereabout, 0, spriteWidth / 2, spriteHeight / 2);
    //   if (gameFrame % staggerFrames === 0) {
    //     if (frameX < 9) frameX++;
  
    //     else frameX = 0;
    //   }
    // }
    //whereabout += 5

    walkCounter++;
    gameFrame++;
  }
};

const knightAttacks = (ctx, now , x) => {
  if (!ctx) return;
  else {
    if(gameFrame < 280)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Walk, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Walk, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout, 65, troll1AttackWidth / 2, troll1AttackHeight / 2);
      whereabout++;
      if(gameFrame < 260)
      {
        whereabout++;
      }
      if (gameFrame % staggerFrames === 0) {
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      }
    }
    else if(gameFrame < 360)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Idle, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Idle, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout, 65, troll1AttackWidth / 2, troll1AttackHeight / 2);
      if (gameFrame % staggerFrames === 0) {
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      }
    }
    else if(gameFrame <= 400)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Attack, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Hurt, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout, 65, troll1AttackWidth / 2, troll1AttackHeight / 2);
      
      if (gameFrame % staggerFrames === 0) {
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      } 
    } 
    else if(gameFrame <= 480)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Idle, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Idle, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout, 65, troll1AttackWidth / 2, troll1AttackHeight / 2);
      
      if (gameFrame % staggerFrames === 0) {
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      }
    }
    else if(gameFrame <= 520)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Hurt, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Attack, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout, 65, troll1AttackWidth / 2, troll1AttackHeight / 2);
      
      if (gameFrame % staggerFrames === 0) {
        
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      } 
    }
    else if(gameFrame < 600)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Idle, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Idle, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout, 65, troll1AttackWidth / 2, troll1AttackHeight / 2);
      if (gameFrame % staggerFrames === 0) {
        
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      }
    }
    else if(gameFrame <= 640)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Attack, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Hurt, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout, 65, troll1AttackWidth / 2, troll1AttackHeight / 2);
      
      if (gameFrame % staggerFrames === 0) {
        
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      } 
    } 
    else if(gameFrame <= 720)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Idle, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Idle, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout, 65, troll1AttackWidth / 2, troll1AttackHeight / 2);
      
      if (gameFrame % staggerFrames === 0) {
        
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      }
    }
    else if(gameFrame <= 760)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Hurt, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Attack, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout, 65, troll1AttackWidth / 2, troll1AttackHeight / 2);
      
      if (gameFrame % staggerFrames === 0) {
        
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      } 
    } 
    else if(gameFrame < 840)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Idle, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Idle, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout, 65, troll1AttackWidth / 2, troll1AttackHeight / 2);
      if (gameFrame % staggerFrames === 0) {
        
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      }
    }
    else if(gameFrame <= 880)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Attack, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Hurt, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout, 65, troll1AttackWidth / 2, troll1AttackHeight / 2);
      
      if (gameFrame % staggerFrames === 0) {
        
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      } 
    } 
    else if(gameFrame <= 960)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Idle, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Idle, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout, 65, troll1AttackWidth / 2, troll1AttackHeight / 2);
      
      if (gameFrame % staggerFrames === 0) {
        
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      }
    }
    else if(gameFrame <= 1000)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Hurt, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Attack, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout, 65, troll1AttackWidth / 2, troll1AttackHeight / 2);
      
      if (gameFrame % staggerFrames === 0) {
        
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      } 
    }
    else if(gameFrame < 1080)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Idle, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Idle, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout, 65, troll1AttackWidth / 2, troll1AttackHeight / 2);
      if (gameFrame % staggerFrames === 0) {
        
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      }
    }
    else if(gameFrame <= 1200)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Attack, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Hurt, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout, 65, troll1AttackWidth / 2, troll1AttackHeight / 2);
      
      if (gameFrame % staggerFrames === 0) {
        
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      } 
    } 
    else if(gameFrame < 1235)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Idle, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Die, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout + dieAbout, 105, troll1AttackWidth / 2, troll1AttackHeight / 2);
      
      if (gameFrame % staggerFrames === 0) {
        dieAbout += 12;
        
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      } 
    }
    // else if(gameFrame <= 6000)
    // {
    //   ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //   ctx.drawImage(knight2Idle, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 0, spriteWidth / 2, spriteHeight / 2);
    //   ctx.drawImage(troll1Idle, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout, -100, troll1AttackWidth / 2, troll1AttackHeight / 2);
      
    //   if (gameFrame % staggerFrames === 0) {
    //     console.log(gameFrame, "idle3");
    //     if (frameX < 9) frameX++;
  
    //     else frameX = 0;
    //   }
    // }
    gameFrame++;
  }
};

const winsAfterX = (ctx, now , x) => {
  if (!ctx) return;
  else {
    if(gameFrame < 280)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Walk, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Walk, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout, 65, troll1AttackWidth / 2, troll1AttackHeight / 2);
      whereabout++;
      if(gameFrame < 260)
      {
        whereabout++;
      }
      if (gameFrame % staggerFrames === 0) {
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      }
    }
    else if(gameFrame < 360 + testCase * 240)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Idle, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Idle, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout, 65, troll1AttackWidth / 2, troll1AttackHeight / 2);
      if (gameFrame % staggerFrames === 0) {
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      }
    }
    else if(gameFrame < 400 + testCase * 240)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Attack, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Hurt, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout, 65, troll1AttackWidth / 2, troll1AttackHeight / 2);
      
      
      if (gameFrame % staggerFrames === 0) {
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      } 
    } 
    else if(gameFrame < 480 + testCase * 240)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Idle, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Idle, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout, 65, troll1AttackWidth / 2, troll1AttackHeight / 2);
      
      if (gameFrame % staggerFrames === 0) {
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      }
    }
    else if(gameFrame < 520 + testCase * 240)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Hurt, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Attack, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout, 65, troll1AttackWidth / 2, troll1AttackHeight / 2);
      
      if (gameFrame % staggerFrames === 0) {
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      }

      if(testCase < x && gameFrame % (516 + testCase * 240) == 0)
      {
        testCase += 1; 
      }
    }
    if(gameFrame >= 520 + x * 240 && gameFrame < 640 + x * 240)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Attack, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Hurt, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout, 65, troll1AttackWidth / 2, troll1AttackHeight / 2);
      
      if (gameFrame % staggerFrames === 0) {
        console.log(gameFrame, "attack1 loop", (600 + x * 240));
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      } 
    } 
    if(gameFrame >= 640 + x * 240 && gameFrame < 675 + x * 240)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Attack, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Die, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout + dieAbout, 105, troll1AttackWidth / 2, troll1AttackHeight / 2);
      console.log(gameFrame, "die loop", (600 + x * 240));

      if (gameFrame % staggerFrames === 0) {
        dieAbout += 12;
        console.log(gameFrame, "attack2");
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      } 
    }
    if(gameFrame >= 675 + x * 240)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Jump, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Die, 9 * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout + dieAbout, 105, troll1AttackWidth / 2, troll1AttackHeight / 2);
      console.log(gameFrame, "win win win", (600 + x * 240));

      if (gameFrame % staggerFrames === 0) {
        console.log(gameFrame, "attack2");
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      } 
    }

    gameFrame++;
  }
};

const arrayInput = (ctx, now, x) => {
  if (!ctx) return;
  else {
    if(gameFrame < 280)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Walk, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Walk, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout, 65, troll1AttackWidth / 2, troll1AttackHeight / 2);
      whereabout++;
      if(gameFrame < 260)
      {
        whereabout++;
      }
      if (gameFrame % staggerFrames === 0) {
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      }
    }
    else if(gameFrame < 360 + testCase * 120)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Idle, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Idle, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout, 65, troll1AttackWidth / 2, troll1AttackHeight / 2);
      if (gameFrame % staggerFrames === 0) {
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      }
    }
    else if(gameFrame < 400 + testCase * 120 && x[index] == 1)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Attack, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Hurt, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout, 65, troll1AttackWidth / 2, troll1AttackHeight / 2);
      
      
      if (gameFrame % staggerFrames === 0) {
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      }
      
      if(testCase < x.length && (gameFrame % (399 + testCase * 120)) == 0)
      {
        index += 1;
        testCase += 1; 
      }
    } 
    else if(gameFrame < 400 + testCase * 120 && x[index] == -1)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Hurt, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Attack, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout, 65, troll1AttackWidth / 2, troll1AttackHeight / 2);
      
      if (gameFrame % staggerFrames === 0) {
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      } 
      if(testCase < x.length && gameFrame % (399 + testCase * 120) == 0)
      {
        index += 1;
        testCase += 1; 
      }
    } 
    if(gameFrame >= 400 + x.length * 120 && gameFrame < 520 + (x.length) * 120)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Attack, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Hurt, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout, 65, troll1AttackWidth / 2, troll1AttackHeight / 2);
      
      
      if (gameFrame % staggerFrames === 0) {
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      } 
    } 
    if(gameFrame >= 520 + (x.length) * 120 && gameFrame < 560 + (x.length) * 120)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Attack, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Die, frameX * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout + dieAbout, 105, troll1AttackWidth / 2, troll1AttackHeight / 2);
      

      if (gameFrame % staggerFrames === 0) {
        dieAbout += 12;
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      } 
    }
    if(gameFrame >= 560 + (x.length) * 120)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(backgroundImage, 0, 0, 1000, 550, 0 , 0, 800, 600);
      ctx.drawImage(knight2Jump, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -700 + whereabout, 155, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(troll1Die, 9 * troll1AttackWidth, frameY * troll1AttackHeight, troll1AttackWidth, troll1AttackHeight, 700 - whereabout + dieAbout, 105, troll1AttackWidth / 2, troll1AttackHeight / 2);
      

      if (gameFrame % staggerFrames === 0) {
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      } 
    }

    gameFrame++;
  }
}

// eslint-disable-next-line react/prop-types
export default function Canvas2({ gameArray }) {  
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [x, setX] = useState(gameArray);
  console.log(x);

  const animatePlayerLoop = useCallback(
    (now) => {
      if (!ctx) return;
      if(x[x.length - 1] === -1)
      {
        draw(ctx, now, x);
      }
      else
      {
        arrayInput(ctx, now, x);
      }
      window.requestAnimationFrame(animatePlayerLoop);
    },
    [ctx]
  );

  useEffect(() => {
    setCtx(canvasRef.current.getContext("2d"));
    window.requestAnimationFrame(animatePlayerLoop);
  }, [canvasRef, animatePlayerLoop]);

  return (
    <canvas
      ref={canvasRef}
      className="game"
      width="800"
      height="600"
    />
  );
}
