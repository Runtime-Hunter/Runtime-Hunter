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
const spriteWidth = 1000;
const spriteHeight = 556;
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
const staggerFrames = 3;
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
knightAttack.src = "https://i.imgur.com/JMTTzz6.png";

const knightWalk = new Image();
knightWalk.src = "https://i.imgur.com/JH51EQI.png";

const orcWalk = new Image();
orcWalk.src = "https://i.imgur.com/04qvCWA.png";

const backgroundImage = new Image();
backgroundImage.src = "https://i.imgur.com/X1nOBPs.png";

let lastTime = 0;
let whereabout = 0;
let walkCounter = 0

const draw = (ctx, now) => {
  if (!ctx) return;
  // if (now - lastTime >= 6) 
  else {
    if(now - lastTime < 4000)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(orcWalk, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth / 2, spriteHeight / 2);
      ctx.drawImage(knightWalk, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -350 + whereabout, 0, spriteWidth / 2, spriteHeight / 2);
      whereabout++;
      if (gameFrame % staggerFrames === 0) {
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      }
    }
    if(now - lastTime > 4000 && now - lastTime < 14400)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(knightAttack, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -250 + whereabout, 0, spriteWidth / 2, spriteHeight / 2);

      if (gameFrame % staggerFrames === 0) {
        if (frameX < 9) frameX++;
  
        // else if (now - lastTime < 5500) {
        //   frameX = 0;
        //   ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        // }
        else {
          frameX = 0;
        }
      }
    }
    if(now - lastTime > 14400)
    {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(knightWalk, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, -250 + whereabout, 0, spriteWidth / 2, spriteHeight / 2);
      if (gameFrame % staggerFrames === 0) {
        if (frameX < 9) frameX++;
  
        else frameX = 0;
      }
    }
    // //whereabout += 5
    // console.log(now - lastTime, walkCounter);

    walkCounter++;
    gameFrame++;
  }
};

export default function Canvas2() {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);

  const animatePlayerLoop = useCallback(
    (now) => {
      if (!ctx) return;
      draw(ctx, now);
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
