let tetrisFont = [
	[
		[0,0],	//	000000000000
		[1,0],	//	000000000000
		[2,0],	//		0000
		[1,1],	//		0000
		[1,2],	//		0000
		[1,3],	//		0000
		[1,4]	//		0000
	],			//		0000
	[
		[0,0],	//	000000000000
		[1,0],	//	000000000000
		[2,0],	//	0000
		[0,1],	//	0000
		[0,2],	//	000000000000
		[0,3],	//	000000000000
		[0,4],	//	0000
		[1,2],	//	0000
		[2,2],	//	000000000000
		[1,4],	//	000000000000
		[2,4]	//
	],
	[
		[0,0],	//	000000000000
		[1,0],	//	000000000000
		[2,0],	//		0000
		[1,1],	//		0000
		[1,2],	//		0000
		[1,3],	//		0000
		[1,4]	//		0000
	],			//		0000
	[
		[0,0],	//	000000000000
		[0,1],	//	000000000000
		[0,2],	//	0000	0000
		[1,0],	//	0000	0000
		[0,3],	//	0000	0000
		[2,1],	//	0000	0000
		[1,4],	//	0000	0000
		[0,4],	//	000000000000
		[2,3],	//	000000000000
		[2,2],	//
		[2,0],	//
		[2,4]	//
	],
	[
		[0,0],	//	00000000
		[0,1],	//	00000000
		[0,2],	//	0000	0000
		[1,0],	//	0000	0000
		[0,3],	//	0000	0000
		[2,1],	//	0000	0000
		[1,4],	//	0000	0000
		[0,4],	//	0000	0000
		[2,3],	//	00000000
		[2,2],	//	00000000
	],
]
,	fontMaxLength = 3
,	tetrisFontXPos = [0,4,8,12,16]
function sceneBefore(){
	if(screenBefore){
		let textPadding = 0
		let	newRatio = (width- textPadding)/(fontMaxLength*tetrisFont.length+tetrisFont.length-1)
		push()
		textSize(16).textAlign(CENTER,CENTER)
		text(background_awal%2==1?">                  <":'',width/2,height/5*4)
		fill(getColor(background_awal))
		text("START",width/2,height/5*4)
		pop()
		for(let i = 0; i < tetrisFont.length;i++){
			for(let j = 0; j < tetrisFont[i].length;j++){
				push()
				let color = (background_awal2 + 1 + i)% colorKind
				fill(getColor(color == 0?2:color))
				strokeWeight(1)
				stroke(getColor(color == 0?2:color))
				rect(textPadding/2 + (newRatio*i*4) + tetrisFont[i][j][0]*newRatio,120 + tetrisFont[i][j][1]*newRatio,newRatio,newRatio)
				pop()
			}
		}
	}
}