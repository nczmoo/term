class NPC{
	boxes = [];
	numOfBoxes = 1000;
	names = [];
	constructor(){
		for (let i = 0; i < this.numOfBoxes; i++){
			this.boxes.push(new Box());
			this.names.push(this.boxes[this.boxes.length - 1].name);
		}
		
	}
	
	search(hostname){
		return this.names.indexOf(hostname);
	}
}