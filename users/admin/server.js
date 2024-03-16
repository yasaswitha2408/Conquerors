const ex = require('express');
const app = ex();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(ex.static('html/'));
app.use(ex.static('script/'));
app.use(ex.static('style/'));
const url = "mongodb+srv://aquametrics4all:aquametrics4all@cluster0.87s2ryy.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'test',
})
    .then(() => {
        console.log('Connected to MongoDB successfully');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bodduamarnath2023@gmail.com',
        pass: 'zkolppmibcfnuzbs'
    }
});
const register = new mongoose.Schema({
    token: String,
    register: Number,
    expiry: Date,
    email: String,
    name: String,
    form: Number
});
function calculateMD5(input) {
    const md5Hash = crypto.createHash('md5');
    md5Hash.update(input);
    return md5Hash.digest('hex');
}
register.index({ expiry: 1 }, { expireAfterSeconds: 24 * 60 * 60 });
const registermodel = mongoose.model('tokens', register);
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/html/index1.html');
});
app.get('/register/:email/:name', async function (req, res) {
    const email = req.params.email;
    const name = req.params.name;
    const otpExpiry = new Date();
    var token = calculateMD5(email);
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 24 * 60 * 60);
    const newOTP = new registermodel({
        email: email,
        token: token,
        expiry: otpExpiry,
        register: 0,
        name: name,
        form:0
    });
    const data = {
        recipientName: name,
        link: 'aquametrics4all.onrender.com/token/' + token,
    };
    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Aqua Metrics!</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #8ac4dde4;
                /* Set a background color if needed */
            }
    
            div {
                max-width: 600px;
                padding: 20px;
                background-color: rgb(163, 250, 245);
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
        </style>
    </head>
    
    <body></body>
    <div>
        <p><strong>Hi <em><%= data.recipientName %></em>,</strong></p>
    
        <p>&nbsp;&nbsp;&nbsp;&nbsp;We hope this message finds you well. Thank you for registering with Aqua Metrics</p>
    
        <p>&nbsp;&nbsp;&nbsp;&nbsp;As we embark on a journey to promote sustainable practices, we want to bring attention to
            the importance of water conservation and awareness of water footprints.</p>
    
        <p>&nbsp;&nbsp;&nbsp;&nbsp;We truly appreciate your commitment to making a positive impact on the environment.</p>
    
        <p>&nbsp;&nbsp;&nbsp;&nbsp;Thank you once again for joining us. You can now log in to your account using the
            following link: <a href="http://<%= data.link %>" target="_blank">Login</a>.</p>
    
        <p>&nbsp;&nbsp;&nbsp;&nbsp;<strong>Note:</strong><em>The above link expires in 24 hours.</em></p>
    
        <p><strong>Best regards,</strong><br>
            &nbsp;&nbsp;Team Aqua Metrics<br></p>
    
        <br>
        <p>If you have any questions or need assistance, feel free to contact us at <a
                href="mailto:aquametrics4all@gmail.com">aquametrics4all@gmail.com</a>.</p>
    
    
    </div>
    
    </body>
    
    </html>
    `;
    const mailOptions = {
        from: 'bodduamarnath2023@gmail.com',
        to: email,
        subject: 'Email for registration',
        html: await ejs.render(htmlTemplate, { data })
    };
    try {
        const response = await transporter.sendMail(mailOptions);
        await newOTP.save();
        res.json({ success: true });
    } catch (error) {
        console.error('Error sending email or saving OTP:', error);
        res.status(500).json({ success: false, message: 'Failed to generate OTP.' });
    }
});
const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('server is running successfully');
});