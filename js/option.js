let	boardWidth
,	boardHeight
,	centerOptionX
,	textS = 19
numeral.register('locale', 'id', {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
    abbreviations: {
        thousand: 'rb',
        million: 'jt',
        billion: 'm',
        trillion: 't'
    },
    ordinal : function (number) {
        return number === 1 ? 'er' : 'ème';
    },
    currency: {
        symbol: 'Rp'
    }
});
numeral.locale("id");
function initOption(){
	boardWidth = panjang * ratioBoard
	boardHeight = tinggi * ratioBoard
	centerOptionX = boardWidth+optionWidth/2
}
function renderOption(){
	push()
	stroke(0)
	strokeWeight(1)
	line(boardWidth,0,boardWidth,boardHeight)
	for(let i = 0; i < 3;i++){
		let yPos = boardHeight/3*i+(19/2)-(textS/2)
		push()
		strokeWeight(.5)
		line(boardWidth,yPos,boardWidth+optionWidth,yPos)
		pop()
	}
	textSize(textS)
	textAlign(CENTER,TOP)
	textFont("monospace")
	textStyle(BOLD)
	strokeWeight(0)
	text(`﹝ sᴄᴏʀᴇ ﹞`,centerOptionX,boardHeight/3*0+(textS))
	text("﹝ ʟɪɴᴇ ﹞",centerOptionX,boardHeight/3*1+(textS))
	text("﹝ ɴᴇxᴛ ﹞",centerOptionX,boardHeight/3*2+(textS))
	scoreRendering()
	lineBrokedRendering()
	nextShapeRendering()
	pop()
}
function getFontSize(text = ''){
	let fixed = false
	,	fixSize = 0
	for(let i = 50;!fixed;i--){
		push()
		textSize(i)
		let scoreWidth = textWidth(text)
		if(scoreWidth <= optionWidth || i == 0){
			fixSize = i <= 0?1:i
			fixed = true
		}
		pop()
	}
	return fixSize
}
function scoreRendering(){
	let scoreChar = numeral(score).format(`0.${score>=1000?`0 `:``}a`)
	let fixSize = getFontSize(scoreChar)
	push()
	textSize(fixSize)
	strokeWeight(fixSize/16.6666)
	stroke(0)
	fill(255)
	textAlign(CENTER,CENTER)
	textFont("impact")
	text(scoreChar,centerOptionX,(boardHeight/3) - 60)
	pop()
}
function lineBrokedRendering(){
	let lineChar = numeral(lineBroked).format(`0,0`)
	let fixSize = getFontSize(lineChar)
	push()
	textSize(fixSize)
	strokeWeight(fixSize/16.6666)
	stroke(0)
	fill(255)
	textAlign(CENTER,CENTER)
	textFont("impact")
	text(lineChar,centerOptionX,(boardHeight/3*2) - 60)
	pop()
}
function nextShapeRendering(debug = false){
	if(nextShape != undefined){
		let shapeLength = checkLength(shape[nextShape],5)
		,	xMinus	= shapeLength[0]-shapeLength[2]+1
		,	yMinus	= shapeLength[1]
		,	newRatioX = (optionWidth / (shapeLength[0] + shapeLength[2] + 1)) - 2
		,	newRatioY = (optionWidth / (shapeLength[1] + shapeLength[3] + 1)) - 2
		newRatioX = newRatioX > ratioBoard? ratioBoard : newRatioX
		newRatioY = newRatioY > ratioBoard? ratioBoard : newRatioY
		let origin = [boardWidth + (optionWidth- xMinus*newRatioX)/2,boardHeight - newRatioY*3 - yMinus*newRatioY]
		if(debug){console.table({ratio:[newRatioX,newRatioY],origin:origin,minus:[xMinus,yMinus]});console.log(shapeLength)}
		push()
		let color = getColor(shape[nextShape].type)
		strokeWeight(1)
		stroke(color)
		fill(color)
		for(let i = 0; i<shape[nextShape].coord.length;i++){
			let coord = shape[nextShape].coord[i]
			rect(origin[0]+coord[0]*newRatioX,origin[1]+coord[1]*newRatioY,newRatioX,newRatioY)
		}
		pop()
	}
}