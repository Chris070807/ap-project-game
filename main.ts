controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentDirection != Direction.Down) {
        currentDirection = Direction.Up
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentDirection != Direction.Right) {
        currentDirection = Direction.Left
    }
})
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
let gameSpeed = 500
scene.setBackgroundColor(7)
game.onUpdate(function () {
    timeSinceLastMove += game.eventContext().deltaTimeMillis
    if (timeSinceLastMove >= gameSpeed) {
        moveSnake()
        timeSinceLastMove = 0
    }
})
