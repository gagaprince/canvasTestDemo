/**
 * 这是一个动画的util
 * 控制平移
 * 旋转
 * 放缩
 *
 * */

function AnimateUtil(){
    if(!(this instanceof AnimateUtil)){
        return new AnimateUtil();
    }else{
        this.init();
    }
}

AnimateUtil.prototype={
    fps:0,//frame per s
    fpt:1000000,//我两帧之间间隔的毫秒数

    _tasks:null,

    init:function(){
        this.fps = 60;
        this.fpt = 1/this.fps;

        this._tasks=[];

        this._beginTask();
    },

    //平移动画
    //匀速运动
    move:function(beginP,endP,nowP,t,call){
        var timeCount = new Date().getTime();
        var timeLength = t*1000;

        var beginX = beginP.getX();
        var beginY = beginP.getY();

        var endX = endP.getX();
        var endY = endP.getY();

        var _this = this;

        this._addTask(function(){
            var timeNow = new Date().getTime();
            var timeStep = timeNow - timeCount;

            if(timeStep > timeLength){
                nowP.set(endP.getX(),endP.getY());
                _this._removeTask(arguments.callee);
            }else{
                var nowX = beginX + (endX-beginX)/timeLength*timeStep;
                var nowY = beginY + (endY - beginY)/timeLength*timeStep;
                nowP.set(nowX,nowY);
            }
            if(call){
                call(nowP);
            }
        });
    },

    _addTask:function(task){
        this._tasks.push(task);
    },

    _removeTask:function(taskTarget){
        var tasks = this._tasks;
        var task = tasks[0];
        for(var i=0;task;task=tasks[++i]){
            if(task == taskTarget){
                tasks.splice(i,1);
                break;
            }
        }
    },


    _beginTask:function(){
        var _this = this;
        setInterval(function () {
            var tasks = _this._tasks;
            var task = tasks[0];
            for(var i=0;task;task=tasks[++i]){
                task();
            }
        },this.fpt);
    }
}

function Point(x,y){
    if(!(this instanceof Point)){
        return  new Point(x,y);
    }else{
        this.init(x,y);
    }
}
Point.prototype={
    _x:-100000,
    _y:-100000,
    init:function(x,y){
        this._x = x;
        this._y = y;
    },
    set:function(x,y){
        this._x = x;
        this._y = y;
    },
    getX:function(){
        return this._x;
    },
    getY:function(){
        return this._y;
    }
}
