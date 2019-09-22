import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  projects = [];
  interests = ["Robotics", "Electrical Engineering", "Web Development", "Video Games", "Photography", "Hiking"]

  constructor() { }

  ngOnInit() {
    this.initProjects();
  }

  initProjects(){

    this.projects = [
      {
        imgurl:'../assets/TOGI.png',
        title:'TOGI',
        link:'https://github.com/SirSamhain/TOGI',
        description:"TOGI was a discussion board where anonymous users could discuss certain topics of interest. The website was hosted using AWS and Glassfish server. Post content was stored in a database using AWS MySQL database. Unfortunately, TOGI had to be taken down due to the costs; however, source code is available if you click the image.",
      },
      {
        // imgurl:'https://raw.githubusercontent.com/SirSamhain/SEP/master/TempName/app/back.png',
        imgurl:'../assets/Achieve.png',
        title:'Achieve',
        link:'https://github.com/SirSamhain/SEP',
        description:"Achieve is an Android Application that allows users to set weight, activity, and sobriety goals. Every time a goal would be set, a timer starts and gives the user the option to restart the timer if they had a cheat day. Workouts can also be logged using the workout logger, which will keep track of how long the workout lasted and what type of activity it was. The user's data is stored using Firebase realtime database and email sign-up and login has been implemented. "
      }
    ]

  }

}
