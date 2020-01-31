import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  spam:boolean;
  time = 10;

  constructor(private firebaseFunction : AngularFireFunctions, private emailService: EmailService) { }

  ngOnInit() {
  }

  submit(email,name,message, form:HTMLFormElement){
    // 
    if(localStorage.getItem('lastSent')){
      let lastSent = localStorage.getItem('lastSent')
      let timeEllapsed = (new Date().getTime() - new Date(parseInt(lastSent)).getTime()) / 60000  ;
      if (timeEllapsed < this.time){
        this.spam = true;
      }else{
        this.spam = false;
        localStorage.setItem('lastSent', new Date().getTime().toString());
        this.emailService.sendEmail(email.value,name.value,message.value);
      }
    }else{
      localStorage.setItem('lastSent', new Date().getTime().toString());
      this.emailService.sendEmail(email.value,name.value,message.value);
    }
    
    form.reset();
  }


}
