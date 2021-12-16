namespace SpriteKind {
    export const bossattack1 = SpriteKind.create()
    export const boss = SpriteKind.create()
    export const bossattack2 = SpriteKind.create()
}
function Bossmad () {
    bossprojectile = sprites.create(assets.image`fireball top`, SpriteKind.Projectile)
    bossprojectile.x = randint(0, scene.screenWidth() - 50)
    bossprojectile.top = 0
    bossprojectile.ay = 50
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    weapon = sprites.createProjectileFromSprite(assets.image`bullet`, theplayer, 150, 0)
    weapon.x += 12
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (theplayer.vy == 0) {
        theplayer.vy = -175
    }
})
function Boss () {
    theboss = sprites.create(assets.image`boss`, SpriteKind.boss)
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
    if (Bosshp == 20) {
        bosshurt = true
    }
    sprite.destroy()
})
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    sprite.destroy(effects.fire, 200)
})
let bossjectile2: Sprite = null
let theboss: Sprite = null
let weapon: Sprite = null
let bossprojectile: Sprite = null
let bosshurt = false
let Bosshp = 0
let theplayer: Sprite = null
theplayer = sprites.create(assets.image`stacy`, SpriteKind.Player)
info.setLife(5)
Bosshp = 40
bosshurt = false
controller.moveSprite(theplayer, 100, 0)
theplayer.ay = 400
tiles.setTilemap(tilemap`level1`)
scene.setBackgroundImage(assets.image`background`)
Boss()
game.onUpdateInterval(1000, function () {
    if (bosshurt) {
        Bossmad()
    }
    if (Bosshp < 1) {
        game.over(false)
    }
})
game.onUpdateInterval(1000, function () {
    if (bosshurt) {
        Bossmad()
    }
    if (Bosshp < 1) {
        game.over(true)
    }
})
game.onUpdateInterval(800, function () {
    bossjectile2 = sprites.createProjectileFromSprite(assets.image`fireball left`, theboss, -81, 0)
    bossjectile2.x += -10
})
