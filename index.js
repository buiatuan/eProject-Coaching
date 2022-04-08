const express = require('express');
const app = express();
const port = process.env.PORT | 2909;

app.listen(port, () => {
    console.log("Server is running.!");
});
// cấp quyền
app.set("view engine","ejs");
app.use(express.static("public"));

// tạo trang chủ
app.get('/', function (req, res) {
    res.render("home");
});

// About us
app.get('/about-us', function (req, res) {
    res.render("about_us");
});

// Contact
app.get('/contact', function (req, res) {
    res.render("contact");
});

// Help support
app.get('/help-support', function (req, res) {
    res.render("help_support");
});

// Privacy policy
app.get('/privacy-policy', function (req, res) {
    res.render("privacy_policy");
});

// Sign in
app.get('/sign-in', function (req, res) {
    res.render("sign_in");
});

// Register
app.get('/register', function (req, res) {
    res.render("register");
});
