import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-fourier',
  templateUrl: './fourier.component.html',
  styleUrls: ['./fourier.component.css']
})
export class FourierComponent implements OnInit {

  @ViewChild('myCanvas', {static: true}) canvas:ElementRef<HTMLCanvasElement>
  ctx: CanvasRenderingContext2D;
  width = 900
  height = 500
  radius = 40
  tx = this.radius + 100
  ty = this.height/2
  a = 0
  ys = []
  N = 1
  av = .1

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')
    this.canvas.nativeElement.width = this.width
    this.canvas.nativeElement.height = this.height  
    this.ctx.translate(this.tx, this.ty)
    this.loop()  
  }

  loop(){
      this.background()

      let x = 0
      let y = 0
      for(let i = 0; i < this.N; i++){
          let px = x
          let py = y
          
          let n = i * 2 + 1
          let r = this.radius * (4 / (n * Math.PI))
          x+=r * Math.cos(n * this.a)
          y+=r * Math.sin(n * this.a)

          this.ctx.strokeStyle = 'black'
          this.circle(px, py, r)
          this.ctx.strokeStyle = 'black'


          this.ctx.beginPath()
          this.ctx.moveTo(px, py)
          this.ctx.lineTo(x, y)
          this.ctx.strokeStyle = 'black'
          this.ctx.stroke()
          this.ctx.strokeStyle = 'black'
          this.ctx.closePath()

      }
      this.ys.unshift(y)
      this.ctx.strokeStyle = '#587e96'
      this.ctx.beginPath()
      this.ctx.moveTo(x, y)
      this.ctx.lineTo(200, y)
      this.ctx.stroke()
      this.ctx.closePath()
      this.ctx.strokeStyle = 'black'

      let prx = 200
      let pry = y
      for (let i = 1; i < this.ys.length ; i++){
          let xi = (i) + 200
          this.ctx.lineWidth = 3

          this.ctx.beginPath()
          this.ctx.moveTo(prx, pry)
          this.ctx.lineTo(xi, this.ys[i])
          this.ctx.strokeStyle = "#587e96"
          this.ctx.stroke()
          this.ctx.strokeStyle = "black"
          this.ctx.closePath()
          prx = xi
          pry = this.ys[i]
      }
      if(this.ys.length > this.width) this.ys.pop()

      this.a += this.av
      requestAnimationFrame(this.loop.bind(this))
  }

  circle(x, y, r){
    this.ctx.beginPath()
    this.ctx.arc(x, y, r, 0, Math.PI * 2)
    this.ctx.stroke()
    this.ctx.closePath()
  }
  background(c?){
      const temp = this.ctx.fillStyle
      if(c) {
        this.ctx.fillStyle = c
      }else{
        this.ctx.fillStyle = "#1d1f21"
      }

      this.ctx.fillRect(0-this.tx,0-this.ty,this.width, this.height)
      this.ctx.fillStyle = temp
  }

}
