
function sid(id){
	return document.getElementById(id);
}

function two_or_four(){
	return Math.random()>0.5?2:4;
}

function random_position(){
	return Math.floor(Math.random()*4);
}

function search_add(x, y, direction){
	switch(direction){
		case "up":
			for(var i=x+1;i<4;i++){
				if(data[i][y]!=0){
					return {x:i, y:y};
				}
			}
			return false;
			break;
		case "down":
			for(var i=x-1;i>=0;i--){
				if(data[i][y]!=0){
					return {x:i, y:y};
				}
			}
			return false;
			break;
		case "left":
			for(var j=y+1;j<4;j++){
				if(data[x][j]!=0){
					return {x:x, y:j};
				}
			}
			return false;
			break;
		case "right":
			for(var j=y-1;j>=0;j--){
				if(data[x][j]!=0){
					return {x:x, y:j};
				}
			}
			return false;
			break;
	};
}

var data=[];
//data[0]=[2,4,2,2];
//data[1]=[4,2,4,2];
//data[2]=[2,4,2,0];
//data[3]=[4,2,4,4];

var model={
	init_data: function(){
		for(var i=0;i<4;i++){
			data[i]=data[i]||[];
			for(var j=0;j<4;j++){
				data[i][j]=0;
			}
		}
	},
	init_two_data: function(){
		var i=1;
		while(i<=2){
			var x=random_position();
			var y=random_position();
			if(data[x][y]==0){
				data[x][y]=two_or_four();
				i++;
			}
		}
	},
	move_up: function(){
		for(var i=0;i<4;i++){
			var goback=false;
			for(var j=0;j<4;j++){
				if(data[i][j]==0){
					var next=search_add(i, j, "up");
					if(next!=false){
						data[i][j]=data[next.x][next.y];
						data[next.x][next.y]=0;
						goback=true;
					}
				}
				else if(data[i][j]!=0 ){
					var next=search_add(i, j, "up");
					if(next!=false  && data[i][j]==data[next.x][next.y]){
						data[i][j]=data[i][j]+data[next.x][next.y];
						data[next.x][next.y]=0;
					}
				}
			}
			if(goback==true){
				i--;
			}
		}
	},
	move_down: function(){
		for(var i=3;i>=0;i--){
			var goback=false;
			for(var j=0;j<4;j++){
				if(data[i][j]==0){
					var next=search_add(i, j, "down");
					if(next!=false){
						data[i][j]=data[next.x][next.y];
						data[next.x][next.y]=0;
						goback=true;
					}
				}
				else if(data[i][j]!=0 ){
					var next=search_add(i, j, "down");
					if(next!=false  && data[i][j]==data[next.x][next.y]){
						data[i][j]=data[i][j]+data[next.x][next.y];
						data[next.x][next.y]=0;
					}
				}
			}
			if(goback==true){
				i++;
			}
		}
	},
	move_left: function(){
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				var goback=false;
				if(data[i][j]==0){
					var next=search_add(i, j, "left");
					if(next!=false){
						data[i][j]=data[next.x][next.y];
						data[next.x][next.y]=0;
						goback=true;
					}
				}
				else if(data[i][j]!=0 ){
					var next=search_add(i, j, "left");
					if(next!=false  && data[i][j]==data[next.x][next.y]){
						data[i][j]=data[i][j]+data[next.x][next.y];
						data[next.x][next.y]=0;
					}
				}
			if(goback==true){
				j--;
			}
			}
		}
	},
	move_right: function(){
		for(var i=0;i<4;i++){
			for(var j=3;j>=0;j--){
				var goback=false;
				if(data[i][j]==0){
					var next=search_add(i, j, "right");
					if(next!=false){
						data[i][j]=data[next.x][next.y];
						data[next.x][next.y]=0;
						goback=true;
					}
				}
				else if(data[i][j]!=0 ){
					var next=search_add(i, j, "right");
					if(next!=false  && data[i][j]==data[next.x][next.y]){
						data[i][j]=data[i][j]+data[next.x][next.y];
						data[next.x][next.y]=0;
					}
				}
			if(goback==true){
				j++;
			}
			}
		}
	},
	create_num: function(){
		var check_full=true;
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(data[i][j]==0){
					check_full=false;
				}
			}
		}
		if(check_full==true){
			alert("Cannot move!");
		}
		else if(check_full==false){
			var x=random_position();
			var y=random_position();
			while(data[x][y]!=0){
				x=random_position();
				y=random_position();
			}
			data[x][y]=two_or_four();
		}
	}
};

var controller={
	init: function(){
		model.init_data();
		model.init_two_data();
	},
	up: function(){
		if(view.check_win()=="keep_go"){
			model.move_up();
			model.create_num();
			view.renderHTML();
		}
	},
	down: function(){
		if(view.check_win()=="keep_go"){
			model.move_down();
			model.create_num();
			view.renderHTML();
		}
	},
	left: function(){
		if(view.check_win()=="keep_go"){
			model.move_left();
			model.create_num();
			view.renderHTML();
		}
	},
	right: function(){
		if(view.check_win()=="keep_go"){
			model.move_right();
			model.create_num();
			view.renderHTML();
		}
	},
	restart: function(){
		this.init();
		view.renderHTML();
	}
};

var view={
	renderHTML: function(){
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				sid("n"+i.toString()+j.toString()).innerText=data[i][j];
			}
		}
		this.check_win();
	},
	check_win: function(){
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(sid("n"+i.toString()+j.toString()).innerText==2048){
					setTimeout("alert('Win!')",10);
					return "win";
				}
			}
		}
		return "keep_go";
	}
};
