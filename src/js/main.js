$(document).ready(function(){
    var drawUtil = DrawUtil();


    //画一个矩形
    drawUtil.fillRectByColor(50,50,200,200,"#ff0000");

    //画一条线
    //drawUtil.drawLine(50,300,300,400,"#654321");

    //画个圆
    //drawUtil.drawCircle(200,300,50);

    //画个美女
    var meinvImgSrc = "src/res/test.jpg";
    drawUtil.drawImage(meinvImgSrc,0,0,200,200,50,50,180,180);

    //写个美女
    drawUtil.drawText(50,300,"美女");

});