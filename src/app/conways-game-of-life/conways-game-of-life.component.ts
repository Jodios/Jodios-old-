import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'conways-game-of-life',
  templateUrl: './conways-game-of-life.component.html',
  styleUrls: ['./conways-game-of-life.component.css']
})
export class ConwaysGameOfLifeComponent implements OnInit {
  rows: number;
  cols: number;
  table: number[];
  alive:boolean;
  width:number = 1000;
  height:number = 1000;
  resolution:number = 25;
  animation;
  stopped:boolean;
  status = "stopped"

  constructor() { }

  ngOnInit() {
    this.table = this.createTable();
  }

  redraw(){
    this.table = this.createTable();
  }
  createTable(){
    this.rows = (this.height/this.resolution);
    this.cols = (this.width/this.resolution);
    let arr = new Array(this.cols);
    for (let i = 0; i < arr.length; i++){
      arr[i] = new Array(this.rows);
    }
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++){
        arr[i][j]=0;
      }
    }
    return arr;
  }

  toggle(i, j){
    this.table[i][j] = this.table[i][j] === 0 ? 1 : 0;
  }

  reset(){
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++){
        this.table[i][j]=Math.round(Math.random());
      }
    }
  }
  clear(){
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++){
        this.table[i][j]=0;
      }
    }
  }
  start(){    
    // this.interval = window.setInterval(x => {
    //   let y = this.startLife();
    // },200)   
    this.stopped = false;
    this.status = "running";
    this.startLife();
  }
  stop(){
    this.stopped = true;
    this.status = "stopped";
    cancelAnimationFrame(this.animation);
  }
  startLife(){
    let x: boolean = false;
    let nextGen = this.createTable();
    for (let i = 0; i < this.rows; i++){
      for (let j = 0; j < this.cols; j++){
        let state = this.table[i][j];
        let neighbours = this.cn(i,j);
        if (state == 0 && neighbours == 3){
          nextGen[i][j] = 1;
        }else if(state == 1 && (neighbours < 2 || neighbours > 3)){
          nextGen[i][j] = 0;
        }else{
          nextGen[i][j] = state;
        }

      }
    }
    this.table = nextGen;
    if(!this.stopped){
      this.animation = requestAnimationFrame(this.startLife.bind(this))
    }
    

  }

  cn(x, y){
    var n: number = 0;
    // console.log("IN CN: " ,this.table[0][2])
    var points = []
    for (let i = -1; i < 2; i++){
      for (let j = -1; j < 2; j++){
        
        let col = ((x + i)+this.cols) % this.cols;
        let row = ((y + j)+this.rows) % this.rows;
        let obj = {
          x: col,
          y: row,
          value: this.table[col][row]
        }
        points.push(obj);
        n += this.table[col][row]

      }
    }
    // console.log("IN CN: " ,this.table[0][2])
    n -= this.table[x][y];
    return n;
  }
}
