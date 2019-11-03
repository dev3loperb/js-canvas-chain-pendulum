let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let barWidth = 30;
let chainLinkLength = 10;

function drawTopBar(width) {
    let oldColor = ctx.fillStyle;
    ctx.fillStyle = "#543623";
    ctx.fillRect(0, 0, canvas.width, width);
    ctx.fillStyle = oldColor;
}

function drawChain(chain) {
    ctx.moveTo(canvas.width / 2.0, barWidth);
    chain.forEach(chainLink => {
        ctx.lineTo(chainLink.x, chainLink.y + barWidth);
    });
    ctx.stroke();

    ctx.beginPath();
    let lastChainLink = chain.slice(-1)[0];
    ctx.arc(lastChainLink.x, lastChainLink.y + barWidth, lastChainLink.length, 0, 2 * Math.PI, true);
    ctx.lineWidth = 0;
    ctx.fill();
}

class ChainLink {
    constructor(x, y, length) {
        this.x = x;
        this.y = y;
        this.length = length;
    }
}

let chain = []
for (var i = 0; i < 40 ; i++) {
    chain.push(new ChainLink(canvas.width / 2.0, i * chainLinkLength, chainLinkLength))
}

function drawer() {
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.stroke();

    for (let i = 0; i < chain.length - 1; i++) {
        let currentLink = chain[i];
        let nextLink = chain[i + 1];

        let dx = Math.sin(Date.now() / 300) * (chainLinkLength - 1);
        nextLink.x = currentLink.x + dx;
        let dy = Math.sqrt(Math.abs(dx * dx - nextLink.length * nextLink.length));
        nextLink.y = currentLink.y + dy;
    }
    drawTopBar(barWidth);
    drawChain(chain);
}

drawer();
let mainInterval = setInterval(drawer, 10);
