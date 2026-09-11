/*
* @target MZ
* @plugindesc Test rectangle particle on title screen
* @author danielbnhz
* @help
* Creates looping cyan and orange rectangle particles
* on the screen :)
 */


(()=>{
    "use strict";

    const PARTICLE_COUNT = 18;
    const CYAN = 0x00dfff;
    const ORANGE  = 0xff7a18;

    const _Scene_Title_create = Scene_Title.prototype.create;

    Scene_Title.prototype.create = function() {
        _Scene_Title_create.call(this);

        this._endParticles = [];
        this._endParticlesLayer = new PIXI.Container();
        this._endParticlesLayer.name = "EndParticlesLayer";

        const windowsLayerIndex = this.children.indexOf(this._windowLayer);

        if (windowsLayerIndex >= 0) {
            this.addChildAt(this._endParticlesLayer, windowsLayerIndex);
        } else {
            this.addChild(this._endParticlesLayer);
        }



        this.createEndParticles();
    };

    Scene_Title.prototype.createEndParticles = function() {
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const particle = this.createEndParticle(i)
            this._endParticles.push(particle);
        }
    };

    Scene_Title.prototype.createEndParticle = function (index) {
        const graphic = new PIXI.Graphics();

        const color = index % 2 === 0 ? CYAN : ORANGE;
        const size = 4 + Math.random() * 8;

        graphic.beginFill(color, 0.85);
        graphic.drawRect(-size/2, -size/2, size, size);
        graphic.endFill();

        this._endParticlesLayer.addChild(graphic);

        const particle = {
            graphic: graphic,
            velocityX: 0,
            velocityY: 0,
            rotationSpeed:0,
            phase: 0,
            baseAlpha: 0
        };

        this.resetEndParticles(particle,true);

        return particle;
    };

    Scene_Title.prototype.resetEndParticles = function(particle, randomStart) {
        const graphic = particle.graphic;

        if (randomStart){
            graphic.x = Math.random() * Graphics.boxWidth;
            graphic.y = Math.random() * Graphics.boxHeight;
        }else {
            graphic.x = -15;
            graphic.y = Math.random() * Graphics.boxHeight;
        }

        particle.velocityX = 0.15 + Math.random() * .55;
        particle.velocityY = -0.25 + Math.random() * .40;
        particle.rotationSpeed = -0.15 + Math.random() * .05;

        particle.phase = Math.random() * Math.PI * 2;
        particle.baseAlpha = .22 + Math.random() * .45;

        graphic.rotation = Math.random() * Math.PI * 2;



    };
    const _Scene_Title_update = Scene_Title.prototype.update;

    Scene_Title.prototype.update = function() {
        _Scene_Title_update.call(this);

        if (!this._endParticles){
            return;
        }

        const t = performance.now / 1000;

        for (const particle of this._endParticles){
            const graphic = particle.graphic;

            graphic.x += particle.velocityX;
            graphic.y += particle.velocityY;
            graphic.rotation += particle.rotationSpeed;

            graphic.alpha = particle.baseAlpha + Math.sin(t * 1.8 + particle.phase) * .15

            if (
                graphic.x > Graphics.boxWidth + 20 ||
                graphic.y < -20 ||
                graphic.y > Graphics.boxHeight + 20
            ){
                this.resetEndParticles(particle,false);
            }
        }
    };


})();