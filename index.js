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