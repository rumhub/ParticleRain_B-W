const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');    //ctx de context
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    //ctx.fillStyle = 'white';
    //ctx.fillRect(10, 10, 50, 50);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, Math.PI * 2);
    ctx.stroke();
})

const mouse =
{
    x: undefined, 
    y: undefined,
}

canvas.addEventListener('click', function(event)
{
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i=0; i<5; i++)
    {
        particlesArray.push(new Particle());
    }
});

canvas.addEventListener('mousemove', function(event)
{
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i=0; i<10; i++)
    {
        particlesArray.push(new Particle());
    }
})
/*
function drawCircle()
{
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
    ctx.fill();
}
*/


class Particle
{
    constructor()
    {
        this.x = mouse.x;
        this.y = mouse.y;
        //this.x = Math.random() * canvas.width; //random entre 0 y canvas width
        //this.y = Math.random() * canvas.height;
        this.size = Math.random() * 8 + 1; //random entre 1 y 6
        this.speedX = Math.random() * 3 - 1.5; //randm entre 1.5 y -1.5
        this.speedY = Math.random() * 3 - 1.5; //randm entre 1.5 y -1.5
        this.color = 'hsl(' + hue + ',100%, 50%';
    }

    update()
    {
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.2)
        {
            this.size -= 0.1;
        }
    }
    draw()
    {   //esto es el código de DrawCircle de arriba
        //ctx.fillStyle = 'white';
        ctx.fillStyle = this.color; //hsl es otra cosa como rgb, hsl(color, opacidad, luminosidad)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticles()
{
    for(let i=0; i<particlesArray.length; i++)
    {
        particlesArray[i].update(); //llamamos a la función update que hemos creado arriba en la clase Particles
        particlesArray[i].draw();

        for(let j = i; j < particlesArray.length; j++)
        {
            //usamos pitágoras para calcular la distancia entre 2 puntos en 2D
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if(distance < 100)
            {
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = particlesArray[i].size/10;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }

        if(particlesArray[i].size <= 0.2)   //borramos las particles que tengan un size <= 0.2
        {
            particlesArray.splice(i, 1); //1 porque sólo queremos borrar 1 elemento
            i--; //tenemos que hacer i-- o nos saltamos el siguiente elemento
        }
    }
}

function animate()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillStyle = 'rgba(0, 0, 0, 0.02';
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue+=0.6;
    requestAnimationFrame(animate); //llamamos otra vez a la función animate
}
animate();
