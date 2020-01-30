/* 
    1、基本配置
    2、方块基础构造函数
    3、根据方块函数，创建游戏对象
*/

/* 配置颜色 */
let colorConfig = {
    body: 'green',
    head: 'pink',
    food: 'red',
    wall: 'black',
    floor: 'grey',
    ground: 'yellow'
};
/* 自定义类名样式 */
let classConfig = {
    body: 'body',
    head: 'head',
    food: 'food',
    floor: 'floor',
    wall: 'wall',
    ground: 'ground'
}
/* 整个游戏的位置 */
let posX = 0;
let posY = 100;
/* 行列数，单位：格子 */
let tr = 10, td = 30;
/* 小格子宽度 */
let squareW = 50;
/* 蛇运动的间隔时间 */
let moveTime = 500;
/* 蛇长（包括蛇头） */
let snakeLength = 3;
/* 方块基础构造函数 */
function Square(x, y, w, h, dom) {
    this.posX = x;
    this.posY = y;
    this.w = w;
    this.h = h;
    this.dom = dom || document.createElement('div');
}
/* 用于更新单例里的属性 */
Square.prototype.upDate = function (x, y) {
    this.posX = x;
    this.posY = y;
    this.dom.style.left = x * squareW + 'px';
    this.dom.style.top = y * squareW + 'px';

};

let Ground = tool.single(Square);/* 整个游戏场景 */
let Floor = tool.extends(Square);/* 地板 */
let Wall = tool.extends(Square);/* 墙 */
let SnakeHead = tool.single(Square);/* 🐍头 */
let SnakeBody = tool.extends(Square);/* 🐍身 */
let Snake = tool.single();
let Food = tool.single(Square);
let Game = tool.single();

let snakeStatusConfig = {
    eat: 'eat',
    move: 'move',
    die: 'die'
}

