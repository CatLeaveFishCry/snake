function SquareFactory() {

};


SquareFactory.init = function (instance, color, action, className) {
    instance.dom.style.width = instance.w + 'px';
    instance.dom.style.height = instance.h + 'px';
    instance.dom.style.position = 'absolute';
    instance.dom.style.left = instance.posX * squareW + 'px';
    instance.dom.style.top = instance.posY * squareW + 'px';
    if (className) {
        instance.dom.classList.add(className);
    } else {
        instance.dom.style.backgroundColor = color;
    }

    instance.type = action;
};
SquareFactory.prototype.Wall = function (x, y) {
    let wall = new Wall(x, y, squareW, squareW);
    SquareFactory.init(wall, colorConfig.wall, snakeStatusConfig.die, classConfig.wall);
    return wall;
};
SquareFactory.prototype.Floor = function (x, y) {
    let floor = new Floor(x, y, squareW, squareW);
    SquareFactory.init(floor, colorConfig.floor, snakeStatusConfig.move, classConfig.floor)
    return floor;
};
SquareFactory.prototype.SnakeHead = function (x, y) {
    let snakeHead = new SnakeHead(x, y, squareW, squareW);
    SquareFactory.init(snakeHead, colorConfig.head, snakeStatusConfig.die, classConfig.head);
    snakeHead.upDate(x, y);
    return snakeHead;
};
SquareFactory.prototype.SnakeBody = function (x, y) {
    let snakeBody = new SnakeBody(x, y, squareW, squareW);
    SquareFactory.init(snakeBody, colorConfig.body, snakeStatusConfig.die, classConfig.body)
    return snakeBody;
};
SquareFactory.prototype.Food = function (x, y) {
    let food = new Food(x, y, squareW, squareW);
    SquareFactory.init(food, colorConfig.food, snakeStatusConfig.eat, classConfig.food);
    food.upDate(x, y);
    return food;
};

SquareFactory.create = function (type, x, y) {
    if (!SquareFactory.prototype[type]) {
        throw 'no this type';
    }
    return SquareFactory.prototype[type](x, y);
}