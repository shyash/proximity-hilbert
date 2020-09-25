export class Vector {
	x: number;
	y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	swap() {
		this.x = this.x ^ this.y;
		this.y = this.x ^ this.y;
		this.x = this.x ^ this.y;
	}
}
