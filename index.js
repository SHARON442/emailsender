const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extended: true}));

//define to the server that the static files are stored inside the public.

app.use(express.static('public'));

// defining route for  home page
app.get('/', (req, res) => {
        res.sendFile(__dirname+'/public/send-email.html');
});

//configure nodemailer
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth:{
                    user: 'sharonpa442@gmail.com',
                    pass:'tervjztsaceiktyt'
      }
});

//create the route for the form
app.post('/send-email',(req,res)=>{
                    const {to ,subject,message} =req.body;
                    const mailOptions ={
                                        to,
                                        subject,
                                        message
                    };
transporter.sendMail(mailOptions,(error,infor)=>{
                     if(error){
                    console.error(error);
                    res.status(500).send('error in sending mail')      
                    }else{
                    console.log("Email sent:' + infor.response");
                     res.send('email send successfully')
                    }
                                  
                    });
});

//start app
app.listen(port, () => {
                    console.log(`Server is running on port ${port}`);
                  });
