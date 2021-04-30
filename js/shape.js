let shape = [];
function getShape(cords = [],type = 1){
	let res = {coord : cords, type : type}
	shape.push(res)
}
getShape([
	[0,0],	//		
	[-1,0],	//		OOOOOOOOOOOOOOOO
	[1,0],	//		OOOOOOOOOOOOOOOO
	[2,0]	//		
	],1)
getShape([
	[0,0],	//		OOOOOOOOOOOO
	[-1,0],	//		OOOOOOOOOOOO
	[-2,0],	//				OOOO
	[0,1]	//				OOOO
	],2)
getShape([
	[0,0],	//		OOOOOOOOOOOO
	[1,0],	//		OOOOOOOOOOOO
	[2,0],	//		OOOO
	[0,1]	//		OOOO
	],3)
getShape([
	[0,0],	//		OOOOOOOO
	[1,0],	//		OOOOOOOO
	[0,-1],	//		OOOOOOOO
	[1,-1]	//		OOOOOOOO
	],4)
getShape([
	[0,0],	//			OOOOOOOO
	[-1,0],	//			OOOOOOOO
	[0,-1],	//		OOOOOOOO
	[1,-1]	//		OOOOOOOO
	],5)
getShape([
	[0,0],	//		OOOOOOOOOOOO
	[-1,0],	//		OOOOOOOOOOOO
	[1,0],	//			OOOO
	[0,1]	//			OOOO
	],6)
getShape([
	[0,0],	//		OOOOOOOO
	[1,0],	//		OOOOOOOO
	[0,-1],	//			OOOOOOOO
	[-1,-1]	//			OOOOOOOO
	],7)