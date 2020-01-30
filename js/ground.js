let ground = new Ground(posX, posY, td * squareW, tr * squareW);

ground.table = [];

ground.reset = function () {
    for (let y = 0; y < ground.table.length; y++) {
        for (let x = 0; x < ground.table[y].length; x++) {
            ground.table[y][x].dom.className = '';
        };
    };
    ground.table = [];
};

ground.remove = function (square) {
    this.dom.removeChild(square.dom);
    this.table[square.posY][square.posX] = null;
};
ground.append = function (square) {
    if (this.table[square.posY][square.posX]) {
        /* 原本有格子，得移除 */
        this.remove(this.table[square.posY][square.posX]);
    }
    this.table[square.posY][square.posX] = square;
    this.dom.appendChild(square.dom);
};


ground.init = function () {
    this.dom.style.position = 'absolute';
    this.dom.style.left = this.posX + 'px';
    this.dom.style.top = this.posY + 'px';
    this.dom.style.width = this.w + 'px';
    this.dom.style.height = this.h + 'px';
    if (classConfig.ground) {
        this.dom.classList.add(classConfig.ground);
    } else {
        this.dom.style.backgroundColor = colorConfig.ground;
    }

    /* 添加整个游戏 */
    document.body.appendChild(this.dom);
    /* 添加地板 */
    for (let y = 0; y < tr; y++) {
        this.table[y] = new Array(tr);
        for (let x = 0; x < td; x++) {
            let square;
            if (y === 0 || y === tr - 1 || x === 0 || x === td - 1) {
                square = SquareFactory.create('Wall', x, y);
            } else {
                square = SquareFactory.create('Floor', x, y);
            }
            this.append(square);
        }
    }
    /* 添加🐍 */
    snake.all.forEach((body) => {
        this.append(body);
    })
}
