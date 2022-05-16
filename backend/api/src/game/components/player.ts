import { PlayerDTO } from "src/dto/game.dto";
import { UserDto } from "src/dto/user.dto";
import { CoorI, Difficulty, screenSizeX, screenSizeY, Setting } from "./coor";

export class PInit {
	user: UserDto;
	difficulty : Difficulty;
	color: string;
	x : number
	constructor(difficulty: Difficulty , n : number, user: UserDto) {
		this.user = user;
		this.difficulty = difficulty;
		this.color = user.color;
		this.x = ( n == 1) ? 0 : screenSizeX;
	}
}

export class Player implements PlayerDTO {
	
    coor: CoorI;
    user: UserDto;
	width: number;
	goal: number;

    constructor(pInit : PInit) {
		
		this.coor = {setting : new Setting(pInit.difficulty),
		x : pInit.x,
		difficulty : pInit.difficulty,
		y : (screenSizeX / 2) - (this.width/2),
		dx : 0,
		dy : 0,
		color : pInit.color }

		this.coor.speed = this.coor.setting.speed;
		this.user = pInit.user;
		this.width = this.coor.setting.width;
        this.goal = 0;
	}
    reset(): void {
		this.coor.y = (screenSizeY / 2) - (this.width / 2);
	}
    update(time: number) : void {
        if(this.coor.dy > 0) {
			if(this.coor.y > 0)
				this.coor.y -= this.coor.setting.speed * time;
			else
				this.coor.y = 0;
		}
		if(this.coor.dy < 0) {
			if(this.coor.y + this.width < screenSizeY)
				this.coor.y += this.coor.setting.speed * time;
			else
				this.coor.y = screenSizeY - this.width;
		}
	}
}