/**
 * 这是一个使用canvasApi编写的画图工具
 *
 *
 * */

function DrawUtil(){
    if(!(this instanceof DrawUtil)){
        return new DrawUtil();
    }else{
        this.init();
    }
}
DrawUtil.prototype={
    canvas:null,
    ctx:null,
    width:0,
    height:0,

    init:function(){
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    },
    //绘制一个矩形
    //起始点坐标
    //宽高
    //颜色
    fillRectByColor:function(beginX,beginY,width,height,color){
        var ctx = this.ctx;
        ctx.save();
        ctx.fillStyle=color || "#000";
        ctx.fillRect(beginX,beginY,width,height);
        ctx.restore();
    },
    //画一条线
    drawLine:function(beginX,beginY,endX,endY,color){
        var ctx = this.ctx;
        ctx.save();
        ctx.strokeStyle = color || "#00ff00";

        ctx.beginPath();
        ctx.moveTo(beginX,beginY);
        ctx.lineTo(endX,endY);

        ctx.stroke();

        ctx.restore();
    },
    //画圆
    drawCircle: function (beginX,beginY,r,color) {
        var ctx  = this.ctx;

        ctx.save();

        ctx.strokeStyle=color || "#00ff00";
        //ctx.fillStyle = color || "#ff0000";

        ctx.beginPath();
        ctx.arc(beginX,beginY,r,0,2*Math.PI);

        ctx.stroke();

        ctx.restore();


    },

    drawText:function(beginX,beginY,text,font){
        var ctx = this.ctx;
        ctx.save();

        ctx.font = font || "40px Arial";
        ctx.fillStyle = "#ff0000";
        ctx.fillText(text,beginX,beginY);


        ctx.restore();
    },

    //画一张图片
    //imgsrc 图片源
    //sx sy 图片原上的起始坐标
    //swidth sheight 图片原上的宽高
    //x y canvas 目标坐标
    //width height 目标位置的宽高
    drawImage:function(imgsrc,sx,sy,swidth,sheight,x,y,width,height){
        var ctx = this.ctx;
        ctx.save();

        if(typeof imgsrc == "string"){
            this.loadImg(imgsrc,function(img){

                ctx.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);



            }, function (img) {
                alert("load img error!");
            });
        }else{
            ctx.drawImage(imgsrc,sx,sy,swidth,sheight,x,y,width,height);
        }



        ctx.restore();


    },
    //以一定的角度绘制美女
    //锚点就是用来解决基准点的问题
    drawImageByRotate:function(imgsrc,sx,sy,swidth,sheight,x,y,width,height,rotate){
        var ctx = this.ctx;
        ctx.save();

        ctx.translate(x+width/2,y+height/2);//顺序很重要
        ctx.rotate(rotate);
        this.drawImage(imgsrc,sx,sy,swidth,sheight,-width/2,-height/2,width,height);

        ctx.restore();
    },
    //以一定的放缩比绘制美女
    //注意锚点
    drawImageByScale:function(imgsrc,sx,sy,swidth,sheight,x,y,width,height,scale){
        var ctx = this.ctx;
        ctx.save();

        ctx.translate(x+width/2,y+height/2);
        ctx.scale(scale,scale);
        this.drawImage(imgsrc,sx,sy,swidth,sheight,-width/2,-height/2,width,height);

        ctx.restore();
    },


    loadImg:function(imgSrc,onLoad,onError){
        var img = new Image();
        img.src = imgSrc;

        img.addEventListener("load", function (e) {
            if(typeof onLoad == "function"){
                onLoad(img);
            }
        },false);

        img.addEventListener("error", function (e) {
           if(typeof onError == "function"){
               onError(img);
           }
        });

    },
    //清除当前画布上的所有图案
    clear:function(){
        this.fillRectByColor(0,0,this.width,this.height,"#ffffff");
    }





}

//var drawUtil =  DrawUtil();