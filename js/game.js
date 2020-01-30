let game = new Game();

game.score = 0;
game.timer = null;
game.overFlag = true;
game.init = function () {
    snake.init();
    ground.init();
    this.createFood();/* 创建食物 */

    document.querySelector('#startBtn').onclick = () => {
        this.overFlag = false;
        document.onkeydown = (e) => {
            if (e.key === 'ArrowRight' && snake.curDirection !== 'left') {
                snake.curDirection = 'right';
            } else if (e.key === 'ArrowLeft' && snake.curDirection !== 'right') {
                snake.curDirection = 'left';
            } else if (e.key === 'ArrowUp' && snake.curDirection !== 'bottom') {
                snake.curDirection = 'top';
            } else if (e.key === 'ArrowDown' && snake.curDirection !== 'top') {
                snake.curDirection = 'bottom';
            }

            snake.getNextCollide();
            clearInterval(this.timer)
            this.start();
        };
        this.start()

    };
};

game.createFood = function () {
    let x, y;
    let okFlag = false;
    while (true) {

        x = Math.round(Math.random() * (td - 2 - 1)) + 1;
        y = Math.round(Math.random() * (tr - 2 - 1)) + 1;
        let temp = snake.tail;

        while (!okFlag) {
            if (!temp) {
                okFlag = true;
                break;
            }
            if (temp.posX === x && temp.posY === y) {
                break;
            }
            temp = temp.next;
        }
        if (okFlag) {
            break;
        }
    };
    console.log(x, y)
    ground.append(SquareFactory.create('Food', x, y));
    // return {
    //     x,
    //     y
    // }
};

game.reset = function () {
    this.score = 0;
    if (this.timer) {
        clearInterval(this.timer);
    }
    document.onkeydown = false;
    this.init()


};

game.start = function () {
    this.timer = setInterval(() => {
        if (this.overFlag) {
            clearInterval(this.timer);
        } else {
            snake.getNextCollide();
        }
    }, moveTime);
};
game.over = function () {
    this.overFlag = true;
    alert(`获得${this.score}颗小星星`);
    snake.reset();
    ground.reset();
    this.reset();
};

game.init();