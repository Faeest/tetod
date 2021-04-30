let panjang
,	tinggi
,	ratioBoard
,	tile
,	freedom
,	nextShape
,	downRecursive
,	loopDownEvent, loopXEvent, loopBGEvent
,	controlled		=
	{
		rawCoord 	: 	[],
		coord 		: 	[],
		type 		: 	0,
		rotate 		: 	1,
		shape 		: 	0
	}
,	level 			=	0
,	score 			=	0
,	buttonKey		=	0
,	maxInline 		=	2
,	maxLevel		=	9
,	downTiming 		=	1000 * (8 * (level+1) / 100)
,	onPause			=	false
,	isStarted		=	false
,	descE 			= 	[8,false]
,	background_awal	=	1, background_awal2 = 0
,	optionWidth		= 100
,	lineBroked		= 0
,	screenBefore	= true
function setup(){
	panjang 	=	12;
	tinggi 		=	24;
	ratioBoard 	=	15 * 1.5;
	tile 		=	Array(panjang * tinggi).fill(0);
	freedom 	=	Array(panjang * tinggi).fill(0);
	createCanvas(panjang * ratioBoard + optionWidth,tinggi * ratioBoard)
	loopDownEvent = setInterval(function () {
		downEvent()
	}, 50)
	loopXEvent = setInterval(function () {
		XEvent()
	}, 75)
	loopBGEvent = setInterval(function () {
		background_awal += background_awal == shape.length-1?2:1
		background_awal %= shape.length
	}, 750)
	setInterval(function () {
		background_awal2 += 1
		background_awal2 %= 7
		background_awal2 += background_awal2 == 0?1:0
	}, 500)
	initOption()
}
function draw(){
	isOver()
	background(sceneBefore?255:250)
	if(isStarted){
		tile.fill(0)
		getGrid()
		render()
	} else if(screenBefore){
		sceneBefore()
	} else {
		getButton()
	}
	!screenBefore?renderOption():''
}
function isOver(){
	let mojok = checkMojok()
	if(mojok.bottomBlock != undefined && mojok.topWall <= 0 && mojok.bottomBlock <= 0){
		alert("Game Over")
		isStarted = false
		controlled		=
		{
			rawCoord 	: 	[],
			coord 		: 	[],
			type 		: 	0,
			rotate 		: 	1,
			shape 		: 	0
		}
		nextShape = undefined
		score = 0
		lineBroked = 0
		updateIcon()
		freedom.fill(0)
		tile.fill(0)
	}
}
function getGrid(){
	push()
	stroke(120)
	strokeWeight(.5)
	for(let i = 0; i < panjang; i++){
		line(i * ratioBoard, 0 , i * ratioBoard , tinggi * ratioBoard)
	}
	for(let j = 0; j < tinggi; j++){
		line(0, j * ratioBoard,panjang * ratioBoard, j * ratioBoard)
	}
	pop()
}
function render(){
	for(let i = 0;i< controlled.coord.length;i++){
		tile[controlled.coord[i]] = controlled.type
	}
	for(let i = 0 ; i < tile.length;i++){
		let xPos = i % panjang
		, yPos = floor(i/panjang)
		let isTile = tile[i]!=0
		if(tile[i]!=0 || freedom[i]!=0){
			push()
			fill(getColor(isTile?tile[i]:freedom[i]))
			strokeWeight(0)
			rect(xPos*ratioBoard,yPos*ratioBoard,ratioBoard,ratioBoard,0)
			pop()
		}
	}
}
const colorKind = 7
function getColor(type){
	let res = '#000'
	switch(type){
		case 1 : res = "#00b4d8"; break;//	<-- cyan
		case 2 : res = "#0466c8"; break;//	<-- blue
		case 3 : res = "#e76f51"; break;//	<-- orange
		case 4 : res = "#e9c46a"; break;//	<-- yellow
		case 5 : res = "#2bc016"; break;//	<-- lime
		case 6 : res = "#9d4edd"; break;//	<-- purple
		case 7 : res = "#e63946"; break;//	<-- red
	}
	return res
}
function fillIt(index = 0,origin = [0,0]){
	controlled = {rawCoord:[],coord:[],type:0,rotate:1,shape:0}
	controlled.shape = index
	let theShape = shape[index]
	for(let i = 0; i < theShape.coord.length;i++){
		let theCoord = theShape.coord
		,theOrigin = origin[0] + origin[1] * panjang
		controlled.coord.push(theOrigin + theCoord[i][0] + theCoord[i][1]*panjang)
		controlled.rawCoord.push(theCoord[i])
		controlled.type = theShape.type
	}
	updateIcon()
}
function goX(type = 0){
	if(isLooping()){
		let mojok2 	= [false,false]
		,	mojok 	= checkMojok()
		freedom.forEach((val,idx) => {
			if(val !=0){
				controlled.coord.forEach((val2,idx2) => {
					if(val2+type==idx){mojok2[type>0?1:0]=true}
					if(val2-type==idx){mojok2[type<0?1:0]=true}
				})
			}
		})
		if(!mojok2[type>0?1:0] && (mojok.leftWall > 0 || type > 0) && (mojok.rightWall > 0 || type < 0)){
			controlled.coord.forEach((val,idx) => {
				controlled.coord[idx] += type
			})
			playSFX('click_4')
		}
	}
}
function updateIcon(change = false){
		let icon = document.querySelector('.link-icon')
		icon.dataset.play = change?!JSON.parse(icon.dataset.play):icon.dataset.play
		icon.setAttribute("href",`./assets/icon/${JSON.parse(icon.dataset.play)?`play-${controlled.type}.png`:`pause-${controlled.type}.png`}`)
}
function keyPressed(){
	if(keyCode == 27 && isStarted){
		updateIcon(true)
		if(onPause){loop();getDown();SFX.bg_music_1.play()} else {noLoop();SFX.bg_music_1.pause()}
		onPause = !onPause
	}
	if(isLooping() || !onPause){
		if((keyCode == 87 || keyCode == 38) && !screenBefore){
			isStarted?rotateControl():buttonKeyControl("up")
		}	//w ↑
		if(keyCode == 13 && screenBefore){
			playSFX('click_2')
			setTimeout(function () {
				SFX["bg_music_1"].play()
			}, random(0,2000))
			setTimeout(function () {
				screenBefore = false
			}, 200)
		} else if(keyCode == 13 && !isStarted){
			buttonKeyControl('enter')
		}
	}
}
function downEvent(){
	if(!isLooping() || onPause || screenBefore){return ''}
	if(keyIsDown(83) || keyIsDown(40)){
		isStarted?getDown(true):buttonKeyControl('down')
	}	//s ↓
}
function XEvent(){
	if(!isLooping() || onPause || screenBefore){return ''}
	if(!((keyIsDown(65) || keyIsDown(37) ) && (keyIsDown(68) || keyIsDown(39) ))){
		if(keyIsDown(65) || keyIsDown(37)){
			isStarted?goX(-1):buttonKeyControl("left")
		}	//a ◄
		if(keyIsDown(68) || keyIsDown(39)){
			isStarted?goX(1):buttonKeyControl("right")
		}	//d ►
	}
}
function angka(){
	textSize(ratioBoard*0.5)
	for(let i=0;i<tile.length;i++){
		text(i.toString(),(i%panjang)*ratioBoard,floor(i/panjang)*ratioBoard+ratioBoard*0.75)
	}
}
function checkLength(shape, simulateRotate = 0){
	let coord = shape.coord
	, rotate = simulateRotate != 0? simulateRotate : controlled.rotate
	, shapeLength = [0,0,0,0] // > v < ^
	for(let i =0;i<coord.length;i++){
		if(coord[i][0] > shapeLength[(0 + (rotate-1))%shapeLength.length]){shapeLength[(0 + (rotate-1))%shapeLength.length] = coord[i][0]}
		if(coord[i][0] < shapeLength[(2 + (rotate-1))%shapeLength.length]){shapeLength[(2 + (rotate-1))%shapeLength.length] = coord[i][0]}
		if(coord[i][1] > shapeLength[(1 + (rotate-1))%shapeLength.length]){shapeLength[(1 + (rotate-1))%shapeLength.length] = coord[i][1]}
		if(coord[i][1] < shapeLength[(3 + (rotate-1))%shapeLength.length]){shapeLength[(3 + (rotate-1))%shapeLength.length] = coord[i][1]}
	}
	shapeLength.forEach((item,index) => {
	  item < 0? shapeLength[index]*=-1:item
	})
	return shapeLength
}
function checkMojok(onRotate = false,onWalk = 0){
	let res = {	rightWall	:0			,leftWall	:0			,bottomWall	:0			,topWall	:0			,
				rightBlock	:undefined	,leftBlock	:undefined	,bottomBlock:undefined	,topBlock	:undefined	}
	,	checked = checkLength(shape[controlled.shape],controlled.rotate)
	for(let i=0;i<controlled.coord.length;i++){
		let coord = controlled.coord.map((val) => val+onWalk)
		,	raw = controlled.rawCoord
		if(raw[i][0] == 0 && raw[i][1] == 0){
			res.leftWall = ((coord[i] - checked[2]) % panjang) - (floor(coord[i]/panjang) != floor((coord[i]-checked[2])/panjang)?panjang:0)
			res.rightWall = (panjang - 1 - ((coord[i] + checked[0]) % panjang)) - (floor(coord[i]/panjang) != floor((coord[i]+checked[0])/panjang)?panjang:0)
			res.bottomWall = ceil((tile.length - panjang - (coord[i] + checked[1]*panjang))/panjang)
			res.topWall = floor((coord[i] - checked[3]*panjang)/panjang)
			freedom.forEach((val,idx) => {
				if(val != 0){
					let xCon1 = floor(idx/panjang) > floor((coord[i] - checked[3]*panjang)/panjang)-1
					,	xCon2 = floor(idx/panjang) < floor((coord[i] + checked[1]*panjang)/panjang)+1
					,	xCon3 = onRotate && floor(idx/panjang) == floor(coord[i]/panjang)
					if(xCon1 && xCon2){
						let onSameY = xCon3?floor((coord[i]+(checked[0]+1))/panjang) - floor(idx/panjang):0
						let onSameY2 = xCon3?floor(idx/panjang) - floor((coord[i]-(checked[2]+1))/panjang):0
						let rightCondition	= (idx%panjang) - (((coord[i]+(checked[0]+1))%panjang)+onSameY*panjang)
						,	leftCondition	= (((coord[i]-(checked[2]+1))%panjang)-onSameY2*panjang) - (idx%panjang)
						if(coord[i]%panjang < idx%panjang && (rightCondition < res.rightBlock || res.rightBlock == undefined)){
							res.rightBlock = rightCondition
						}
						if(coord[i]%panjang > idx%panjang && (leftCondition < res.leftBlock || res.leftBlock == undefined)){
							res.leftBlock = leftCondition
						}
					}
					if(idx % panjang == coord[i] % panjang){
						let bottomCondition	= floor(idx/panjang) - (floor((coord[i]+(checked[1]*panjang))/panjang)+1)
						,	topCondition	= (floor((coord[i]-(checked[3]*panjang))/panjang)-1) - floor(idx/panjang)
						if(coord[i] < idx && (bottomCondition < res.bottomBlock || res.bottomBlock == undefined)){
							res.bottomBlock = bottomCondition
						}
						if(coord[i] > idx && (topCondition < res.topBlock || res.topBlock == undefined)){
							res.topBlock = topCondition
						}
					}
				}
			})
		}
	}
	return res
}
function rotateControl(){
	let rotateBefore = controlled.rotate
	controlled.rotate += controlled.rotate == 4? -3 : 1
	let	mojok = checkMojok(true)
	,	raw = controlled.rawCoord
	,	coord = controlled.coord
	if  (
			(mojok.rightBlock != undefined ||
			 mojok.leftBlock != undefined ||
			  mojok.topBlock != undefined ||
			   mojok.bottomBlock != undefined) &&
			(
				(
					(mojok.leftWall + mojok.rightBlock < 0 || mojok.rightWall + mojok.leftBlock < 0) ||
					((mojok.leftBlock + mojok.rightBlock < 0) || mojok.rightBlock + mojok.leftBlock < 0)
				) || 
				(
					(mojok.bottomWall + mojok.topBlock < 0 || mojok.topWall + mojok.bottomBlock < 0) || 
					(mojok.bottomBlock - mojok.topBlock < 0 || mojok.topBlock - mojok.bottomBlock < 0)
				 )
			)
		)
	{
		controlled.rotate = rotateBefore
	} else {
		playSFX('rotate_1')
		controlled.coord.forEach((val,idx) => {
		if(mojok.rightWall < 0 && (mojok.rightBlock >= 0 || mojok.rightBlock == undefined)){coord[idx] += mojok.rightWall}
		if(mojok.rightBlock < 0){coord[idx] += mojok.rightBlock} // 		<
		if(mojok.leftWall < 0 && (mojok.leftBlock >= 0 || mojok.leftBlock == undefined)){coord[idx] -= mojok.leftWall}
		if(mojok.leftBlock < 0){coord[idx] -= mojok.leftBlock} // 				>
		if(mojok.bottomWall < 0  && (mojok.bottomBlock >= 0 || mojok.bottomBlock == undefined)){coord[idx] += mojok.bottomWall * panjang}
		if(mojok.bottomBlock < 0){coord[idx] += mojok.bottomBlock * panjang} // 	^
		if(mojok.topWall < 0  && (mojok.topBlock >= 0 || mojok.topBlock == undefined)){coord[idx] -= mojok.topWall * panjang}
		if(mojok.topBlock < 0){coord[idx] -= mojok.topBlock * panjang}  // 				v
		let minus = 0
		,	plus = 0
		,	xPos = raw[idx][0]
		,	yPos = raw[idx][1]
		if(controlled.rotate == 2){
			minus += xPos + yPos * panjang
			plus += -yPos + xPos  * panjang
		} else if(controlled.rotate == 3){
			minus += -yPos + xPos * panjang
			plus += -xPos + -yPos * panjang
		} else if(controlled.rotate == 4){
			minus += -xPos + -yPos * panjang
			plus += yPos + -xPos * panjang
		} else if(controlled.rotate == 1){
			minus += yPos + -xPos * panjang
			plus += xPos + yPos * panjang
		}
		controlled.coord[idx] -= minus
		controlled.coord[idx] += plus
		})
	}
}
function getDown(input = false){
	let onGround = false
	if(isStarted){
		controlled.coord.forEach((val,idx) => {
		  	if(val >= tile.length-panjang){
				onGround = true
			}
			if(val < panjang){
				onTop = true
			}
			freedom.forEach((valF,idxF) => {
				onGround = !onGround?(valF != 0 && val + panjang == idxF?true:false):true
			})
		})
		if(onGround){
			controlled.coord.forEach((item) => {freedom[item] = controlled.type})
			getNewC(true)
			updateIcon()
		} else{playSFX('click_3')}
		controlled.coord.forEach((val,idx) => {controlled.coord[idx] += panjang})
		breakBlock()
		if(!input){
			downRecursive = setTimeout(function () {
				return !onPause?getDown():''
			}, downTiming < 100? 100:downTiming)
		}
	}
}
function breakBlock(debug=false){
	let yCoord = Array(tinggi).fill(0)
	,	copyReverse = [...freedom].reverse()
	for(let i = 0;i < tinggi; i++){
		let straight = 0
		,	connect	 = true
		copyReverse.forEach((val,idx) => {
			if(floor(idx/panjang) == i && connect && val > 0){
				straight += 1
			}
		})
		if(straight == panjang){
			yCoord[tinggi-1-i] = 1
		}
	}
	let chain = yCoord.reduce((acc,val)=>val+acc)
	if(chain > 0){
		lineBroked += chain
		let index = []
		yCoord.forEach((val,idx) => {if(val != 0){index.push(idx)}})
		index.forEach((val) => {
			freedom.forEach((val2,idx) => {
				if(floor(idx/panjang) == val){
					freedom[idx] = 0
				}
			})
			for(let i = (val * panjang)-1;i > 0;i--){
				freedom[i + panjang] = freedom[i]
				freedom[i] = 0
			}
		})
		score += (level + 1) * (chain == 1? 40 : chain == 2? 100 : chain == 3? 300 : chain >= 4? 1200 : 0)
		let ranNum = round(random(1,2))
		SFX[`boom_${ranNum}`].volume = chain < 5? chain * 0.2 : 1
		playSFX(`boom_${ranNum}`)
	}
}
function start(){
	isStarted = true
	getNewC(false)
	getDown()
}
function getNewC(onVal = true){
	let condNum = !onVal?floor(random(0,shape.length)) : nextShape
	fillIt(condNum,[round((panjang/2) + random(-1,1)),-1])
	nextShape = floor(random(0,shape.length))
}