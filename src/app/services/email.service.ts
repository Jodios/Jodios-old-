import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as sendgrid from '@sendgrid/mail'
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private db: AngularFireDatabase){}

  sendEmail(email, name, message){
    const data = {
      email:email,
      name:name,
      message:message
    }
    this.db.list('/messages').push(data);
  }

}
