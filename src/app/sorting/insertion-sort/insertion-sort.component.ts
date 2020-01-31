import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TimingService } from 'src/app/services/timing-service.service';

@Component({
  selector: 'app-insertion-sort',
  templateUrl: './insertion-sort.component.html',
  styleUrls: ['./insertion-sort.component.css']
})
export class InsertionSortComponent implements OnInit {
  @ViewChild('canvas',{static:true}) canvas: ElementRef<HTMLCanvasElement>;
  context:CanvasRenderingContext2D;
  heightValues:number[] = [];
  colours:string[] = [];
  n = 15;
  width;
  height;

  constructor(private timer : TimingService) { 
  } 

  ngOnInit() {
    this.width = this.canvas.nativeElement.width = 1000;
    this.height = this.canvas.nativeElement.height = 500;
    this.initLines();
    this.context = this.canvas.nativeElement.getContext('2d');
    this.context.transform(1, 0, 0, -1, 0, this.canvas.nativeElement.height)
    this.drawLines();
  }
  async sort(){
    for (let i = 1; i < this.heightValues.length; i++){
        let val = this.heightValues[i]
        for(let j = i-1; j >= 0; j--){
            if(this.heightValues[j] > val){
                this.swap(j, j+1)
                this.colours[i] = 'green'
                this.colours[j+1] = 'purple'
                this.clear()
                this.drawLines()
                this.colours[i] = "rgba(220, 160, 255, 0.8)"
                this.colours[j+1] = "rgba(220, 160, 255, 0.8)"
                await this.timer.sleep(100)
            }else{
                j = 0
            }
        }
    }

  }

  initLines(){
    for (let i = 0; i < this.n; i++){
      this.heightValues.push(Math.random()*this.height);
      this.colours[i] = "rgba(220, 160, 255, 0.8)";    
    }
  }

  randomize(){
    this.heightValues = []
    if(this.n > 100){this.n = 100;}
    this.initLines();
    this.clear();
    this.drawLines();
  }

  clear(){
    this.context.clearRect(0,0,this.width,this.height);
  }

  drawLines(){
    let margin = 2;
    let w = this.width-10;
    let h = this.height;
    let lw = (w / this.n) - margin; 
    let temp = this.n;
    
    for (let i = 0; i < this.heightValues.length; i++){
      let x = (lw * i) + (margin * i);
      this.context.fillStyle = this.colours[i]
      this.context.strokeRect(x, 0, lw, this.heightValues[i]);
      this.context.fillRect(x, 0, lw, this.heightValues[i]);
    }
    
  }
  
  swap(a, b){
    let temp = this.heightValues[a];
    this.heightValues[a] = this.heightValues[b];
    this.heightValues[b] = temp;
  }

}
