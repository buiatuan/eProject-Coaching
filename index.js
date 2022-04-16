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

// Blog
app.get('/blog', function (req, res) {
    res.render("blog");
});
// Terms
app.get('/terms', function (req, res) {
    res.render("term");
});

// Sign in
app.get('/sign-in', function (req, res) {
    res.render("sign_in");
});

// Register
app.get('/register', function (req, res) {
    res.render("register");
});

// Coaching course
app.get('/coaching-course', function (req, res) {
    res.render("coaching_course");
});

// Online class
app.get('/online-class', function (req, res) {
    res.render("online_classes");
});

// product details
app.get('/product-details', function (req, res) {
    res.render("product_details");
});

// online classes pay fee
app.get('/online-class-payfee', function (req, res) {
    res.render("online_classes_payfee");
});

// blog detail
app.get('/blog-detail', function (req, res) {
    res.render("blog_detail");
});