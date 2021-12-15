namespace SpriteKind {
    export const bossattack1 = SpriteKind.create()
    export const boss = SpriteKind.create()
    export const bossattack2 = SpriteKind.create()
}
function Bossmad () {
    bossprojectile = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 . . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . 2 2 2 . . . . . . 
        . . . 2 . . 2 2 2 2 . . . . . . 
        . . . . . 2 2 4 2 2 . . . . . . 
        . . . . 2 2 5 4 2 2 2 . . . . . 
        . . . . 2 2 5 4 4 5 2 . . . . . 
        . . . . 2 4 4 4 4 2 4 2 . . . . 
        . . . . 2 4 4 4 5 2 4 2 . . . . 
        . . . 2 4 5 5 5 4 5 4 . . 2 . . 
        . . . 4 4 5 5 5 4 5 2 2 . . . . 
        . . . . 5 5 5 5 4 4 2 2 . . . . 
        . . . . 2 5 5 5 5 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Projectile)
    bossprojectile.x = randint(0, scene.screenWidth() - 50)
    if (Math.percentChance(100)) {
        bossprojectile.top = scene.screenHeight()
        bossprojectile.ay = 200
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    weapon = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . 6 9 9 1 . . . . . . . . 
        . . . . 6 6 9 9 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, theplayer, 150, 0)
    weapon.x += 12
})
function Boss () {
    theboss = sprites.create(img`
        222222222222222222222222
        222222222222222222222222
        222222222222222222222222
        222222222222222222222222
        222222222222222222222222
        222222222222222222222222
        222222222222222222222222
        222222222222222222222222
        222222222222222222222222
        222222222222222222222222
        222222222222222222222222
        222222222222222222222222
        222222222222222222222222
        222222222222222222222222
        222222222222222222222222
        222222222222222222222222
        222222222222222222222222
        222222222222222222222222
        222222222222222222222222
        222222222222222222222222
        222222222222222222222222
        222222222222222222222222
        222222222222222222222222
        222222222222222222222222
        `, SpriteKind.boss)
    theboss.setPosition(150, 50)
    theboss.vy = -20
    theboss.setBounceOnWall(true)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.boss, function (sprite, otherSprite) {
    Bosshp += -1
    if (Bosshp <= 5) {
        bosshurt = true
    }
    sprite.destroy()
})
let bossjectile2: Sprite = null
let theboss: Sprite = null
let weapon: Sprite = null
let bossprojectile: Sprite = null
let bosshurt = false
let Bosshp = 0
let theplayer: Sprite = null
theplayer = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . f f f f f f f f . . . . 
    . . . . f . . f f . . f . . . . 
    . . . . f . . f f . . f . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . f . . f . . . . . . 
    . . . . . f f . . f f . . . . . 
    . . . . f f . . . . f f . . . . 
    . . . . f . . . . . . f . . . . 
    `, SpriteKind.Player)
controller.moveSprite(theplayer, 100, 100)
info.setLife(3)
scene.setBackgroundColor(7)
Bosshp = 10
bosshurt = false
Boss()
game.onUpdateInterval(1000, function () {
    if (bosshurt) {
        Bossmad()
    }
    if (Bosshp < 1) {
        game.over(true)
    }
})
game.onUpdateInterval(800, function () {
    bossjectile2 = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . 2 2 2 . . . . . . . . . 
        . . 2 2 2 4 2 2 2 2 . . . . . . 
        . . 2 2 5 4 4 5 4 2 2 . . . . . 
        . . 5 5 5 5 5 5 4 4 4 2 2 . . . 
        . . 5 5 5 5 5 5 5 4 5 4 2 2 . . 
        . . 5 2 5 5 5 5 4 4 4 2 4 2 2 . 
        . . 2 2 2 4 5 4 4 2 2 2 2 . . . 
        . . . 2 2 2 2 2 2 2 . . . . . . 
        . . . . . 2 2 2 . . . . . . 2 . 
        . . . . . . . . . . . . . . . . 
        . . . . . 2 . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, theboss, -100, 0)
    bossjectile2.x += -20
})
