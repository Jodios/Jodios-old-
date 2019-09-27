import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private firebaseFunction : AngularFireFunctions, private emailService: EmailService) { }

  ngOnInit() {
  }

  submit(email,name,message, form:HTMLFormElement){
    this.emailService.sendEmail(email.value,name.value,message.value);
    form.reset();
  }


}
