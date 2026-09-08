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
    const _Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        _Scene_Title_create.call(this);

        const style = {
            fontFamily:"Roboto",
            fontSize:44,
            fill: 0X3399FF,
            stroke: 0x000000,
            strokeThickness:4 ,
        };
        this._glowText = new PIXI.Text("A World To End", style);

        this._glowText.x = (Graphics.boxHeight - this._glowText.width)/2;
        this._glowText.y = 200;

        this.addChild(this._glowText);

    };

    const _Scene_Title_update = Scene_Title.prototype.update;
    Scene_Title.prototype.update = function() {
        _Scene_Title_update.call(this);

        if (this._glowText) {
            const t = performance.now() / 1000;
        }
    }

})();