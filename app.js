var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer')
var app = express();
var atob = require('atob');
var fetch = require('node-fetch');
const pass = "T3BwYWJib2Jib0Ay";



app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function (error, req, res, next) {
    res.status(res.errorCode);
    res.json({
        message: error.message
    });
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/public/index.html')));

app.get('/sample', (req, res) => res.sendFile(path.join(__dirname + '/public/samplePage.html')));

app.get('/videos', (req, res) => {
    const url = "https://www.googleapis.com/v3/search";
    fetch(`${url}&key=${process.env.GOOGLE_API_KEY}`).then(response => response.json()).then(json => {
        res.json(json);
    });
});

app.get('/contactMe', (req, res) => res.sendFile(path.join( __dirname + '/public/contactForm.html')));

app.get('/thankYou', (req, res) => res.sendFile(path.join(__dirname + '/public/thankYou.html')));

app.get('/threejs', (req, res) => res.sendFile(path.join (__dirname + '/public/samplePage.html')));

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
        });

    setTimeout( function(){res.redirect('/')}, 2500);


});


app.listen(8080, () => console.log('Your site listening on port 8080!'));