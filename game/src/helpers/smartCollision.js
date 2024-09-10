
class Collision
{
    constructor(ent, col, dir, id)
		{
		this.ent = ent;
		this.col = col;
		this.dir = dir;
		this.id = id;
    }

    calcCollision() {
		switch (this.dir) {
		case "top":
			this.ent.y = this.col.y + this.col.h;
			break;
		case "bot":
			this.ent.y = this.col.y - this.ent.h;
			break;
		case "left":
			this.ent.x = this.col.x + this.col.w - this.ent.xOffset;
			break;
		case "right":
			this.ent.x = this.col.x - this.ent.w + this.ent.xOffset;
			break;	    
		}
    }
	
}


function collide(r1,r2){
    var dx= (r1.x + r1.w / 2) - (r2.x + r2.w / 2);
    var dy= (r1.y + r1.h / 2)-(r2.y + r2.h /2);
    var width = (r1.w+r2.w)/2;
    var height = (r1.h+r2.h)/2;
    var crossWidth = width*dy;
    var crossHeight = height*dx;
    var collision = null;
   
    if(Math.abs(dx)<=width && Math.abs(dy)<=height){
        if(crossWidth>crossHeight){
            collision=(crossWidth>(-crossHeight))?'bot':'left';
        }else{
            collision=(crossWidth>-(crossHeight))?'right':'top';
        }
    }
    return(collision);
}


function smartCollision(ent, coldbs)
{
    let collisions = new Array();
    
    let x0 = ent.x + ent.xOffset;
    let y0 = ent.y;
    let w0 = ent.w - (1/2 * ent.xOffset);
    let h0 = ent.h;

    let p = new Rect(x0, y0, w0, h0);

    for (let i = 0; i < coldbs.length; i++) {
	let coldb = coldbs[i][0];
	if (coldb != undefined) { // just sanatize coldbs before please
	    let x1 = coldb.x + coldb.xOffset;
	    let y1 = coldb.y;
	    let w1 = coldb.w - 2 * coldb.xOffset;
	    let h1 = coldb.h;

	    let r = new Rect(x1, y1, w1, h1);
	    let dir = collide(r, p);
	    
	    if (dir != null) {
		collisions.push(new Collision(ent, coldb, dir));
	    }
	}
    }

    for (let i = 0; i < collisions.length; i++) {
	if (collisions[i].col.name != "Wall") {
	    collisions[i].calcCollision()
	}
    }
    
    for (let i = 0; i < collisions.length; i++) {
	if (collisions[i].col.name == "Wall") {
	    collisions[i].calcCollision()
	}
    }

    return collisions;    
}

