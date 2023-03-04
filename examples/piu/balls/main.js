/*
 * Copyright (c) 2016-2020 Moddable Tech, Inc.
 *
 *   This file is part of the Moddable SDK.
 * 
 *   This work is licensed under the
 *       Creative Commons Attribution 4.0 International License.
 *   To view a copy of this license, visit
 *       <http://creativecommons.org/licenses/by/4.0>
 *   or send a letter to Creative Commons, PO Box 1866,
 *   Mountain View, CA 94042, USA.
 *
 */

import {} from "piu/MC";

const backgroundSkin = new Skin({ fill:"black" });
// const backgroundSkin = new Skin({ fill:"silver" });
// const backgroundSkin = new Skin({ fill:"white" });
const ballTexture = new Texture("balls.png");
const ballSkin = new Skin({ texture:ballTexture, x:0, y:0, width:30, height:30, variants:30 });

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class BallBehavior extends Behavior {
	onCreate(ball, delta) {
		this.dx = delta;
		this.dy = delta;
	}
	onDisplaying(ball) {
		this.x = ball.x;
		this.y = ball.y;
		this.width = ball.container.width - ball.width;
		this.height = ball.container.height - ball.height;
		ball.start();
	}
	onTimeChanged(ball) {
		let x = this.x + this.dx;
		let y = this.y + this.dy;
		if ((x < 0) || (x > this.width)) {
			// change delta direction and randomize value
			this.dx = -(Math.sign(this.dx) * randomNumber(2, 6));
			
		}
		if ((y < 0) || (y > this.height)) {
			this.dy = -(Math.sign(this.dy) * randomNumber(2, 6));
			if (y > this.height) {
				// change the drawing order or z position
				application.remove(ball);
				application.add(ball);
			}
		}

		this.x = this.x + this.dx;
		this.y = this.y + this.dy;
		ball.moveBy(this.dx, this.dy);
	}
};

let BallApplication = Application.template($ => ({
	skin:backgroundSkin,
	contents: [
		Content(6, { left:0, top:0, deltaX:6, deltaY:6, skin:ballSkin, variant:0, Behavior: BallBehavior } ),
		Content(5, { right:0, top:0, deltaX:5, deltaY:5, skin:ballSkin, variant:1, Behavior: BallBehavior } ),
		Content(4, { right:0, bottom:0, deltaX:4, deltaY:4, skin:ballSkin, variant:2, Behavior: BallBehavior } ),
		Content(3, { left:0, bottom:0, deltaX:3, deltaY:3, skin:ballSkin, variant:3, Behavior: BallBehavior } ),
	]
}));

export default new BallApplication(null, { displayListLength:4096, touchCount:0 });

