import { Vector } from './Vector';

export class Hilbert {
	order: number;
	n: number;
	constructor(order: number) {
		this.order = order;
		this.n = Math.pow(2, order);
	}

	transform(vec: Vector): number {
		let d = 0;
		for (let s = this.n / 2; s > 0; s /= 2) {
			const rx: number = (vec.x & s) > 0 ? 1 : 0;
			const ry: number = (vec.y & s) > 0 ? 1 : 0;
			d += s * s * ((3 * rx) ^ ry);
			this.rotate(this.n, vec, rx, ry);
		}
		return d;
	}

	inverse(d: number): Vector {
		let t = d;
		const vec: Vector = new Vector(0, 0);
		for (let s = 1; s < this.n; s *= 2) {
			const rx = 1 & (t / 2);
			const ry = 1 & (t ^ rx);
			this.rotate(s, vec, rx, ry);
			vec.x += s * rx;
			vec.y += s * ry;
			t /= 4;
		}
		return vec;
	}

	rotate(n: number, vec: Vector, rx: number, ry: number): void {
		if (ry == 0) {
			if (rx == 1) {
				vec.x = n - 1 - vec.x;
				vec.y = n - 1 - vec.y;
			}
			vec.swap();
		}
	}
}
