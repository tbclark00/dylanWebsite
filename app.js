var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer')
var app = express();
var atob = require('atob');
const pass = "T3BwYWJib2Jib0Ay";



app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/public/index.html')));

app.get('/sample', (req, res) => res.sendFile(path.join(__dirname + '/public/samplePage.html')));


app.get('/contactMe', (req, res) => res.sendFile(path.join( __dirname + '/public/contactForm.html')));

app.get('/thankYou', (req, res) => res.sendFile(path.join(__dirname + '/public/thankYou.html')));

app.post('/send', (req, res) => {
    const email= `
    <h2>Contact Details</h2><br>
       <ul>
        <li>Name: ${req.body.name_field}</li>
        <li>Company: ${req.body.company_field}</li>
        <li>Email: ${req.body.email_field}</li>
        <li>Phone: ${req.body.phone_field}</li>
       </ul><br>
       <h2>Message:</h2>
       <p>${req.body.message_field}</p>
        `;
    let decodedPass = atob(pass);
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'tbclarkengineering@gmail.com',
            pass: decodedPass
        },
        tls:{
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: '"Nodemailer" <contact@dylbclark.com>',
        to: 'tbclarkengineering@gmail.com',
        subject: 'Node Contact Request',
        html: email
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        return res.redirect('/thankYou');
        });


});


app.listen(8080, () => console.log('Your site listening on port 8080!'));