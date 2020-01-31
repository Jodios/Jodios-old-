import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-double-pendulum',
  templateUrl: './double-pendulum.component.html',
  styleUrls: ['./double-pendulum.component.css']
})
export class DoublePendulumComponent implements OnInit {
  @ViewChild('myCanvas', {static:true}) canvas:ElementRef<HTMLCanvasElement>;
  @ViewChild('tracer', {static:true}) tracer:ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  tracerctx: CanvasRenderingContext2D;
  v = 15;
  x = 0;
  w:number;
  h:number;

  x1:number;
  x2:number;
  y1:number;
  y2:number;
  r1:number = 100;
  r2:number = 100;
  a1:number = Math.random() * 5;
  a2:number = Math.random() * 5;
  a1v:number = 0;
  a2v:number = 0;
  a1a:number = 0;
  a2a:number = 0;
  m1:number = 10;
  m2:number = 10;
  m3:number = 10;
  g:number = 1;
  cx:number;
  cy:number;
  previousPoint = null;
  points = []

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')
    this.tracerctx = this.tracer.nativeElement.getContext('2d')
    this.setWindow();
    this.start();
  }
  
  draw(){
    this.clearBackground();
    this.x1 = this.r1 * Math.sin(this.a1);
    this.y1 = this.r1 * Math.cos(this.a1);

    this.x2 = this.x1 + this.r2 * Math.sin(this.a2);
    this.y2 = this.y1 + this.r2 * Math.cos(this.a2);

    let n1 = -this.g * (2 * this.m1 + this.m2) * Math.sin(this.a1);
    let n2 = -this.m2 * this.g * Math.sin(this.a1 - (2*this.a2)) 
    let n3 =  -2 * Math.sin(this.a1-this.a2) * this.m2;
    let n4 = this.a2v * this.a2v * this.r2 + this.a1v * this.a1v * this.r1 * Math.cos(this.a1 - this.a2) 
    let denom = this.r1* (2*this.m1 +this.m2 - this.m2 * Math.cos(this.a1*2 - 2*this.a2)) 
    this.a1a =  (n1 + n2 + n3 * n4 ) / denom
    
    n1 = 2 * Math.sin(this.a1 - this.a2)
    n2 = this.a1v * this.a1v * this.r1 * (this.m1 + this.m2)
    n3 = this.g * ( this.m1 + this.m2 ) * Math.cos(this.a1)
    n4 = this.a2v * this.a2v * this.r2 * this.m2 * Math.cos(this.a1 - this.a2)
    denom = this.r2*( 2*this.m1 +this.m2 - this.m2 * Math.cos(this.a1*2 - 2*this.a2)) 
    this.a2a = (n1 * ( n2 + n3 + n4 )) / denom



    this.line(0,0,this.x1, this.y1);
    this.ellipse(this.x1, this.y1, this.m1, this.m1);

    this.line(this.x1,this.y1,this.x2, this.y2);
    this.ellipse(this.x2, this.y2, this.m2, this.m2);
    

    let r = ((Math.random() * 255)).toString()
    let g = ((Math.random() * 255)).toString()
    let b = ((Math.random() * 255)).toString()
    let c = "rgba(" + r + "," + g + "," + b + ",.5)"

    if(this.previousPoint){
      this.lineTrace(this.previousPoint.x, this.previousPoint.y, this.x2, this.y2, c);
    }
    this.previousPoint = {x:this.x2, y:this.y2}



    this.a1v += this.a1a;
    this.a2v += this.a2a;
    this.a1 += this.a1v;
    this.a2 += this.a2v;
  }

  setWindow(){
    this.h = this.canvas.nativeElement.height = this.tracer.nativeElement.height = this.w = this.canvas.nativeElement.width = this.tracer.nativeElement.width = (this.r1 + this.r2 + this.m2)*2 + 10;
    this.cx = this.w / 2;
    this.cy = this.h/2 - 25;
    this.ctx.translate(this.cx,this.cy);
    this.tracerctx.translate(this.cx,this.cy);
  }

  reset(){
    this.setWindow();
    this.a1 = Math.random() * 5;
    this.a2= Math.random() * 5;
    this.a1v = 0;
    this.a2v = 0;
    this.a1a = 0;
    this.a2a = 0;
    this.previousPoint = null;
    this.clearPath();
  }

  start(){
    this.draw();
    requestAnimationFrame(this.start.bind(this))
  }

  point(){
    this.ctx.beginPath();
    if(this.points.length < 2) return;
    for(let i = 0; i < this.points.length-1; i++){
      let c = "rgba(" + this.points[i].r+","+this.points[i].g+","+this.points[i].b + ",.5)"
      this.ctx.strokeStyle = c;
      this.ctx.lineWidth = 2;
      this.line(this.points[i].x,this.points[i].y,this.points[i+1].x,this.points[i+1].y)
    }
    this.ctx.strokeStyle = "black"
    this.ctx.closePath();
  }

  ellipse(x, y, r1, r2){
    this.ctx.beginPath();
    this.ctx.ellipse(x,y,r1,r2,0,0,2 * Math.PI)
    this.ctx.stroke();
    this.ctx.closePath();
  }

  line(x,y,x1,y2){
    this.ctx.beginPath();
    this.ctx.lineWidth = 1.2;
    this.ctx.moveTo(x,y);
    this.ctx.lineTo(x1,y2);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  lineTrace(x,y,x1,y2, c){
    this.tracerctx.lineWidth = Math.random() * 2;
    this.tracerctx.strokeStyle = c;
    this.tracerctx.beginPath();
    this.tracerctx.moveTo(x,y);
    this.tracerctx.lineTo(x1,y2);
    this.tracerctx.stroke();
    this.tracerctx.closePath();
  }

  clearBackground(){
    this.ctx.clearRect(-this.w/2,-this.cy,this.w, this.h);
  }

  clearPath(){
    this.tracerctx.clearRect(-this.w/2,-this.cy,this.w, this.h);
  }

}
