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
    const sql_txt = "select * from courses; select * from blog;";
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
    var page = parseInt(req.query.page) || 1;
    var perPage = 4;
    var start = (page - 1) * perPage;
    var end = page * perPage;
    const sql_txt = "select * from courses";
    conn.query(sql_txt, (err, result) =>{
        if (err) res.send(err.message);
        else res.render("coaching_course",{
            course: result.slice(start, end),
        });
    })
});

// Online class
app.get('/online-class', function (req, res) {
    const category = req.query.category || "";

    var page = parseInt(req.query.page) || 1;
    var perPage = 4;
    var start = (page - 1) * perPage;
    var end = page * perPage;
    const sql_txt1 = "select * from courses where Category like '%"+category+"%'";
    conn.query(sql_txt1, (err1, result1) =>{
        if (err1) res.send(err1.message);
        else{
            var name = req.query.name || "";
            const sql_txt2 = "select * from courses where Name like '%"+name+"%'";
            conn.query(sql_txt2, (err2, result2) =>{
                if (err2) res.send(err2.message);
                else res.render('online_classes',{
                    course: result1.slice(start, end),
                    search: result2,
                })
            })
        }
    })
});
const moment = require("moment")
// product details
app.get('/product-details', function (req, res) {
    const courseID = req.query.id || 1;
    const sql_txt1 = "select * from courses where ID = " +courseID;
    conn.query(sql_txt1, (err, result1) =>{
        if (err) res.send(err.message);
        else if(result1.length > 0){
            const c = result1[0];
            c.Updated = moment(c.Updated).format("D/M/yyyy");
            const sql_txt2 = `select * from intructor where ID = ${result1[0].InstructorID}`;
            conn.query(sql_txt2, function (err2, result2) {
                if(err2) res.send(err2.message);
                else if(result2.length > 0){
                    const  sql_txt3 = `select * from courses where Category like '${result1[0].Category}'`;
                    conn.query(sql_txt3, function (err3, result3){
                        if(err3) res.send(err3.message);
                        else res.render("product_details",{
                            course: c,
                            instructor: result2[0],
                            courses: result3
                        });
                    })
                }
            })
        }
        else res.send("404 Not found");
    })
});

// online classes pay fee
app.get('/online-class-payfee', function (req, res) {
    const courseID = req.query.id || 1;
    const sql_txt = "select * from courses where ID = " +courseID;
    conn.query(sql_txt, (err, result)=>{
        if(err) res.send(err.message);
        else if (result.length > 0) res.render('online_classes_payfee',{
            course: result[0],
        })
    })
});

// Blog
app.get('/blog', function (req, res) {
    const category = req.query.category || "";

    var page = parseInt(req.query.page) || 1;
    var perPage = 4;
    var start = (page - 1) * perPage;
    var end = page * perPage;
    const sql_txt = "select * from blog where Category like '%"+category+"%'";
    conn.query(sql_txt, function (err, result) {
        if(err) res.send(err.message);
        else res.render("blog",{
            category: result.slice(start, end),
        });
    })
});

// blog detail
app.get('/blog-detail', function (req, res) {
    const blogID = req.query.id || 1;
    const sql_txt = "select * from blog where ID = " +blogID;
    conn.query(sql_txt, (err, result) =>{
        if (err) res.send(err.message);
        else if(result.length > 0)
            res.render("blog_detail",{
                blog: result[0],
            });
        else res.send("404 Not found");
    })
});
