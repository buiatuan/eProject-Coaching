const express = require('express');
const app = express();
const port = process.env.PORT | 2909;

app.listen(port, () => {
    console.log("Server is running.!");
});
// cấp quyền
app.set("view engine","ejs");
app.use(express.static("public"));

// Tạo cấu hình và kết nối mysql
const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'Eproject_coaching',
    multipleStatements: true
})

// Test sql
app.get('/test-database', (req, res) =>{
    const sql_txt = " select * from Blog ";
    conn.query(sql_txt,(err, result) =>{
        if(err) res.send(err.message);
        else res.render("test_database",{
            blog: result,
        });
    });
});


// tạo trang chủ
app.get('/', function (req, res) {
    const sql_txt = "select * from courses; select * from blog";
    conn.query(sql_txt, (err, result) =>{
        if (err) res.send(err.message);
        else res.render("home",{
            course: result[0],
            blog: result[1],
        });
    })
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
    const sql_txt = "select * from blog";
    conn.query(sql_txt, (err, result) =>{
        if (err) res.send(err.message);
        else res.render("blog",{
            blog: result,
        });
    })
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
    const sql_txt = "select * from courses where Category like 'Workshops'";
    conn.query(sql_txt, (err, result) =>{
        if (err) res.send(err.message);
        else res.render("coaching_course",{
            course: result,
        });
    })
});

// Online class
app.get('/online-class', function (req, res) {
    const sql_txt = "select * from courses where Category like 'Online Class'";
    conn.query(sql_txt, (err, result) =>{
        if (err) res.send(err.message);
        else res.render("online_classes",{
            course: result,
        });
    })
});

// product details
app.get('/product-details', function (req, res) {
    const spid = req.query.id || 0;
    const sql_txt1 = "select * from courses where ID = " +spid;
    conn.query(sql_txt1, (err, result1) =>{
        if (err) res.send(err.message);
        else if(result1.length > 0){
            const sql_txt2 = `select * from intructor where ID = ${result1[0].IntructorID}`;
            conn.query(sql_txt2, function (err2, result2) {
                if(err2) res.send(err2.message);
                else res.render("product_details",{
                    course: result1[0],
                    intructor: result2[0],
                });
            })
        }
        else res.send("404 Not found");
    })
});

// online classes pay fee
app.get('/online-class-payfee', function (req, res) {
    res.render("online_classes_payfee");
});

// blog detail
app.get('/blog-detail', function (req, res) {
    const spid = req.query.id || 0;
    const sql_txt = "select * from blog where ID = " +spid;
    conn.query(sql_txt, (err, result) =>{
        if (err) res.send(err.message);
        else if(result.length > 0)
            res.render("blog_detail",{
                blog: result[0],
            });
        else res.send("404 Not found");
    })
});
