let snake = new Snake();

snake.head = null;
snake.all = [];//只方便初始化,不更新
snake.tail = null;

snake.curDirection = 'right';



// snake.overFlag = false;

snake.directionNum = {
    left: {
        x: -1,
        y: 0
    },
    right: {
        x: 1,
        y: 0
    },
    top: {
        x: 0,
        y: -1
    },
    bottom: {
        x: 0,
        y: 1
    }
}


snake.reset = function () {
    this.curDirection = 'right'
};

snake.init = function () {
    for (let i = 0; i < snakeLength; i++) {
        if (i === snakeLength - 1) {
            snake.all.push(SquareFactory.create('SnakeHead', snakeLength, 1));
        } else {
            snake.all.push(SquareFactory.create('SnakeBody', i + 1, 1));
        }
        if (i === 0) {
            this.setPrev(snake.all[i], null);
        } else if (i === snakeLength - 1) {
            this.setNext(snake.all[i], null);
            this.setChain(snake.all[i - 1], snake.all[i]);
        } else {
            this.setChain(snake.all[i - 1], snake.all[i])
        }
    };
    snake.head = snake.all[snakeLength - 1];
    snake.tail = snake.all[0];
};

snake.getNewHead = function () {
    return SquareFactory.create('SnakeHead', this.head.posX + this.directionNum[this.curDirection].x, this.head.posY + this.directionNum[this.curDirection].y);
};
snake.getNewBody = function () {
    return SquareFactory.create('SnakeBody', this.head.posX, this.head.posY);
};
snake.getLastBody = function () {
    return this.head.prev;
};
snake.setPrev = function (target, val) {
    target.prev = val;
};
snake.setNext = function (target, val) {
    target.next = val;
};
snake.setChain = function (a, b) {
    a.next = b;
    b.prev = a;
};
snake.getNextCollide = function () {
    let nextSquare = ground.table[this.head.posY + this.directionNum[this.curDirection].y][this.head.posX + this.directionNum[this.curDirection].x];
    this[nextSquare.type]();
};

snake.move = function (eatFlag) {
    /* 身体 */
    let newBody = this.getNewBody();
    let lastBody = this.getLastBody();
    this.setChain(lastBody, newBody);
    ground.append(newBody);

    /* 头 */
    let newHead = this.getNewHead();
    this.setChain(newBody, newHead);
    this.setNext(newHead, null);
    this.head = newHead;
    ground.append(newHead);


    /* 尾巴 */
    if (!eatFlag) {
        ground.append(SquareFactory.create('Floor', this.tail.posX, this.tail.posY));
        this.tail = this.tail.next;
        this.setPrev(this.tail, null);
    }

};

snake.eat = function () {
    game.score++;
    this.move(true);
    game.createFood();
};
snake.die = function () {
    // alert('die');
    game.over();
};


