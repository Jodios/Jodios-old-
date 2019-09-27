import * as functions from 'firebase-functions';
import * as sendgrid from '@sendgrid/mail'

const API_KEY = functions.config().sendgrid.key;
sendgrid.setApiKey(API_KEY);

export const sendMessage = functions.database.ref('/messages/{pushId}').onCreate((snapshot, context) => {
    let email = snapshot.val().email;
    const name = snapshot.val().name;
    const message = snapshot.val().message;

    if(!email.includes('@')){email += "@notanemail.com"}
    
    const msg = {
        to: 'joelortiz@protonmail.com',
        from: email,
        subject: name + " -- FROM JODIOS",
        content: [
            {
              type: "text/plain",
              value: message
            }
          ]
        
     };
    return sendgrid.send(msg);
    
})











// const client = sendgrid("47pk7DWiRuij-OF80V-oSQ");

// function parseBody (body){
//     var helper = sendgrid.mail;
//     var fromEmail = new helper.Email(body.from);
//     var toEmail = new helper.Email(body.to);
//     var subject = body.subject;
//     var content = new helper.Content('text/html', body.content);
//     var mail = new helper.Mail(fromEmail, subject, toEmail, content);
//     return mail.toJSON();
// }

// exports.httpEmail = functions.https.onRequest((req, res) => {
//     return Promise.resolve().then(() => {
//         if(req.method !== 'POST'){
//             const error = new Error("Only POST requests are accepted");
//             error.message = "405";
//             throw error;
//         }
//         const request = client.emptyRequest({
//             method: 'POST',
//             path: 'v3/mail/send',
//             body: parseBody(req.body)
//         });
//         return client.API(request);
//     }).then((response) => {
//         if (response.body){
//             res.send(response.body);
//         }else{
//             res.end();
//         }
//     }).catch((err) => {
//         console.error(err);
//         return Promise.reject(err);
//     });
// });


// // // Start writing Firebase Functions
// // // https://firebase.google.com/docs/functions/typescript
// //
// // export const helloWorld = functions.https.onRequest((request, response) => {
// //  response.send("Hello from Firebase!");
// // });
