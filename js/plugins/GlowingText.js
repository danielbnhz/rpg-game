/*:
* @target MZ
* @plugindesc Glowing text and floating particles
* @author Danielbnhz
* @help GlowingText.js
*
* This is a custom plugin meant to add a fun neon glow to the text
*
 */

(()=> {

    const title = "A World To End";
    const _Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        _Scene_Title_create.call(this);
        const cardWidth = 700;
        const cardHeight = 210;
        const cardX = (Graphics.boxWidth - cardWidth) / 2 + 15;
        const cardY = 118;

        const glowStyle = {
            fontFamily: "Roboto",
            fontSize: 52,
            fontWeight: "bold",
            stroke: 0x00CFFF,
            strokeThickness: 10,
            fill: 0x00cfff,
        }
        const regularStyle = {
            fontFamily:"Roboto",
            fontSize:52,
            fill: 0X3399FF,
            stroke: 0x000000,
            strokeThickness:4 ,
            dropShadow: true,
            dropShadowColor: 0x00CFFF,
            dropShadowBlur: 10,
            dropShadowDistance:0,
            dropShadowAngle: 0
        };
        this._titleCard = new PIXI.Graphics();

        this._titleCard.beginFill(0x020716, 0.76);
        this._titleCard.drawRoundedRect(
            cardX,
            cardY,
            cardWidth,
            cardHeight,
            18


        );
        this._titleCard.endFill();

        this._titleCard.lineStyle(2, 0x00cFFF, 0.55);
        this._titleCard.drawRoundedRect(
            cardX,
            cardY,
            cardWidth,
            cardHeight,
            18
        );

        this.addChild(this._titleCard);

        this._titleGlow = new PIXI.Text(title, glowStyle)

        const glowX = (Graphics.boxWidth - this._titleGlow.width) / 2 + 15;

        const titleY = 142;

        this._titleGlow.x = glowX;
        this._titleGlow.y = titleY - 4;
        this._titleGlow.alpha = .55

        const blurFilter = new PIXI.filters.BlurFilter();
        blurFilter.blur = 8;
        blurFilter.quality = 4;
        this._titleGlow.filters = [blurFilter];

        this._glowText = new PIXI.Text(title, regularStyle);

        const titleX = (Graphics.boxWidth - this._titleGlow.boxWidth) / 2 + 15;

        this._glowText.x = titleX + 15;
        this._glowText.y = titleY - 20;

        this.addChild(this._titleGlow);
        this.addChild(this._glowText);

        this.regularText = new PIXI.Text(title, regularStyle);

        this.regularText.x = (Graphics.boxWidth - this.regularText.width)/2 + 15;
        this.regularText.y = 140;

        this.addChild(this.regularText);

        this._titleBaseX = titleX;
        this._titleGlowBaseX = glowX;

    };

    const _Scene_Title_update = Scene_Title.prototype.update;
    Scene_Title.prototype.update = function() {
        _Scene_Title_update.call(this);

        if (this.regularText && this._titleCard && this._titleGlow) {
            const t = performance.now() / 1000;
            const pulse = 0.88 + Math.sin(t * 2.2) * .10;

            this._glowText.alpha = .5 + pulse * .18;
            this._glowText.alpha = .94 + pulse * 0.09;
            this._titleCard.alpha = 0.95 + pulse * .02;


        }
    }

})();