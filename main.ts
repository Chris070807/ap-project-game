controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentDirection != Direction.Down) {
        currentDirection = Direction.Up
    }
})
function checkCollisions () {
    if (snakeHead.x < 0 || snakeHead.x >= 160 || snakeHead.y < 0 || snakeHead.y >= 120) {
        game.over(false)
    }
    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeHead.overlapsWith(snakeBody[i])) {
            game.over(false)
        }
    }
if (snakeHead.overlapsWith(food)) {
        growSnake(1)
        spawnFood()
    }
}
function spawnFood () {
    if (food) {
        food.destroy()
    }
    food = sprites.create(img`
        . . . . . . . 6 . . . . . . . . 
        . . . . . . 8 6 6 . . . 6 8 . . 
        . . . e e e 8 8 6 6 . 6 7 8 . . 
        . . e 2 2 2 2 e 8 6 6 7 6 . . . 
        . e 2 2 4 4 2 7 7 7 7 7 8 6 . . 
        . e 2 4 4 2 6 7 7 7 6 7 6 8 8 . 
        e 2 4 5 2 2 6 7 7 6 2 7 7 6 . . 
        e 2 4 4 2 2 6 7 6 2 2 6 7 7 6 . 
        e 2 4 2 2 2 6 6 2 2 2 e 7 7 6 . 
        e 2 4 2 2 4 2 2 2 4 2 2 e 7 6 . 
        e 2 4 2 2 2 2 2 2 2 2 2 e c 6 . 
        e 2 2 2 2 2 2 2 4 e 2 e e c . . 
        e e 2 e 2 2 4 2 2 e e e c . . . 
        e e e e 2 e 2 2 e e e c . . . . 
        e e e 2 e e c e c c c . . . . . 
        . c c c c c c c . . . . . . . . 
        `, SpriteKind.Food)
    food.setPosition(Math.randomRange(0, 160), Math.randomRange(0, 120))
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentDirection != Direction.Right) {
        currentDirection = Direction.Left
    }
})
function growSnake (segmentsToAdd: number) {
    for (let index = 0; index < segmentsToAdd; index++) {
        newSegment = sprites.create(snakeHead.image, SpriteKind.Player)
        newSegment.setPosition(snakeBody[snakeBody.length - 1].x, snakeBody[snakeBody.length - 1].y)
        snakeBody.push(newSegment)
        if (gameSpeed > 100) {
            gameSpeed += 0 - 25
        } else if (gameSpeed > 50) {
            // Ensure that game speed doesn't go below 50
            gameSpeed = 50
        }
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentDirection != Direction.Left) {
        currentDirection = Direction.Right
    }
})
function moveSnake () {
    if (currentDirection == Direction.Up) {
        newHead = sprites.create(snakeHead.image, SpriteKind.Player)
        newHead.setPosition(snakeHead.x, snakeHead.y - 8)
    } else if (currentDirection == Direction.Down) {
        newHead = sprites.create(snakeHead.image, SpriteKind.Player)
        newHead.setPosition(snakeHead.x, snakeHead.y + 8)
    } else if (currentDirection == Direction.Left) {
        newHead = sprites.create(snakeHead.image, SpriteKind.Player)
        newHead.setPosition(snakeHead.x - 8, snakeHead.y)
    } else if (currentDirection == Direction.Right) {
        newHead = sprites.create(snakeHead.image, SpriteKind.Player)
        newHead.setPosition(snakeHead.x + 8, snakeHead.y)
    }
    if (newHead) {
        snakeBody.unshift(newHead)
        snakeHead = newHead
        if (snakeBody.length > 1) {
            tail = snakeBody.pop()
            tail.destroy()
        }
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentDirection != Direction.Up) {
        currentDirection = Direction.Down
    }
})
let timeSinceLastMove = 0
let tail: Sprite = null
let newHead: Sprite = null
let newSegment: Sprite = null
let food: Sprite = null
let gameSpeed = 0
let snakeHead: Sprite = null
let snakeBody: Sprite[] = []
enum Direction {
    Up,
    Down,
    Left,
    Right
}
snakeHead = sprites.create(img`
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . 2 2 2 . . . 
    . . . 2 2 2 2 2 . . 
    . . . 2 2 2 2 2 . . 
    . . 2 2 2 2 2 2 . . 
    . . 2 2 2 2 2 . . . 
    . . 2 2 2 . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    `, SpriteKind.Player)
snakeBody.push(snakeHead)
let currentDirection = Direction.Right
gameSpeed = 500
scene.setBackgroundColor(7)
spawnFood()
game.onUpdate(function () {
    timeSinceLastMove += game.eventContext().deltaTimeMillis
    if (timeSinceLastMove >= gameSpeed) {
        moveSnake()
        checkCollisions()
        timeSinceLastMove = 0
    }
})
