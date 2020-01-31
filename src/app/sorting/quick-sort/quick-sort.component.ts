import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InjectSetupWrapper } from '@angular/core/testing';
import { TimingService } from 'src/app/services/timing-service.service';

@Component({
  selector: 'app-quick-sort',
  templateUrl: './quick-sort.component.html',
  styleUrls: ['./quick-sort.component.css']
})
export class QuickSortComponent implements OnInit {

  @ViewChild('canvas', {static:true}) canvas: ElementRef<HTMLCanvasElement>;
  context:CanvasRenderingContext2D;
  heightValues:number[] = [];
  states = [];
  animation = null;
  stopped:boolean;
  n = 100;
  i = 0;
  j = 0;
  x = [0,0,0,0,0,0]
  width
  height
  
  constructor(private timer: TimingService){}

  async ngOnInit() {
    this.width = this.canvas.nativeElement.width = 1000;
    this.height = this.canvas.nativeElement.height = 500;
    this.initLines();
    this.context = this.canvas.nativeElement.getContext('2d');
    this.context.transform(1, 0, 0, -1, 0, this.height)
    this.draw();
    this.drawLines();
  }

  draw(){
    this.clear();
    this.drawLines();
    if(!this.stopped){
      this.animation = requestAnimationFrame(this.draw.bind(this))
    }  
  }

  async partition(low, high){

    for (let i = low; i < high; i++){
      this.states[i] = 1;
    }
    let pi = low;
    let pv = this.heightValues[high];
    this.states[pi] = 0;
    for (let i = low; i < high; i++){
      if(this.heightValues[i] < pv){
        await this.swap(i, pi);
        this.states[pi] = -1;
        pi++;
        this.states[pi] = 0;
      }
    }
    await this.swap(pi, high)
    for (let i = low; i < high; i++){
      if (i != pi){
        this.states[i] = -1;
      }
      this.states[i] = -1;
    }
    return pi
  }

  async quickSort(low, high){
    if (low >= high) {
      return
    };
    let i = await this.partition(low, high)
    this.states[i] = -1;
    await Promise.all([
      this.quickSort(low, i-1),
      this.quickSort(i+1, high)
    ]);
  }


  initLines(){
    for (let i = 0; i < this.n; i++){
      this.heightValues.push(Math.random()*this.height);
      this.states[i] = -1
    }
  }

  randomize(){
    this.heightValues = []
    this.states = []
    if(this.n > 1000){this.n = 1000;}
    this.initLines();
    this.clear();
    this.drawLines();
  }

  clear(){
    this.context.clearRect(0,0,this.canvas.nativeElement.width,this.canvas.nativeElement.height);
  }

  drawLines(){
    let margin = 2
    let w = this.width;
    let h = this.height;
    let lw = (w / this.n) - margin; 
    let temp = this.n;
    for (let i = 0; i < this.heightValues.length; i++){
      let x = (lw * i) + (margin*i);
      if (this.states[i] == 0){
        this.context.fillStyle = "rgba(176, 40, 255, 1)";
      }else if(this.states[i] == 1){
        this.context.fillStyle = "rgba(74, 27, 102, 1)";
      }else{
        this.context.fillStyle = "rgba(220, 160, 255, 1)";
      }
      this.context.strokeRect(x, 0, lw, this.heightValues[i]);
      this.context.fillRect(x, 0, lw, this.heightValues[i]);
    }
    
  }
  
  async swap(a, b){
    await this.timer.sleep(30);
    let temp = this.heightValues[a];
    this.heightValues[a] = this.heightValues[b];
    this.heightValues[b] = temp;
  }

  async start(){
    this.stopped = false;
    await this.quickSort(0,this.heightValues.length-1);
  }
  
  stop() {
    if (this.animation) {
      this.j = 0;
      this.i = 0;
      this.stopped = true;
      window.cancelAnimationFrame(this.animation);
      this.animation = null;
    }
    console.log("stopped")
  }
 







}