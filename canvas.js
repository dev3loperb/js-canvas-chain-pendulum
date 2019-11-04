let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let barWidth = 30;

function drawTopBar(width) {
    let oldColor = ctx.fillStyle;
    ctx.fillStyle = "maroon";
    ctx.fillRect(0, 0, canvas.width, width);
    ctx.fillStyle = oldColor;
}

class ChainLink {
    constructor(x, y, length) {
        this.x = x;
        this.y = y;
        this.length = length;
    }
}

class Chain {
    constructor(firstLinkX, firstLinkY, linksNumber, linkLength) {
        this.x = firstLinkY;
        this.y = firstLinkY;
        this.linkLength = linkLength;

        this.links = [];
        for (var i = 0; i < linksNumber ; i++) {
            let link = new ChainLink(firstLinkX, i * linkLength + firstLinkY, linkLength);
            this.links.push(link);
        }
    }

    move() {
        for (let i = 0; i < this.links.length - 1; i++) {
            let currentLink = this.links[i];
            let nextLink = this.links[i + 1];
    
            let dx = Math.sin(Date.now() / 300) * (this.linkLength - 1);
            nextLink.x = currentLink.x + dx;
            let dy = Math.sqrt(Math.abs(dx * dx - nextLink.length * nextLink.length));
            nextLink.y = currentLink.y + dy;
        }
    }

    draw(canvasCtx) {
        canvasCtx.moveTo(this.x, this.y);
        canvasCtx.beginPath();
        this.links.forEach(chainLink => {
            canvasCtx.lineTo(chainLink.x, chainLink.y);
        });
        canvasCtx.stroke();

        canvasCtx.beginPath();
        let lastChainLink = this.links.slice(-1)[0];
        canvasCtx.arc(lastChainLink.x, lastChainLink.y, lastChainLink.length, 0, 2 * Math.PI, true);
        canvasCtx.fill();
        canvasCtx.stroke();
    }
}

let chain = new Chain(canvas.width / 2, barWidth, linksNumber = 40, linkLength = 10);

function main() {
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    chain.move();

    drawTopBar(barWidth);
    chain.draw(ctx);
}

let mainInterval = setInterval(main, 10);
