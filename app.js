const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose =require('mongoose')

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5efc6b53fe4db71bad0d4657')
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
// mongoose.connect('mongodb+srv://NodeTest:rTgl4AD7IF0L3X6m@mongotest-ay262.mongodb.net/shop?retryWrites=true&w=majority')
// .then(res=>{
//   app.listen(3000);
// })
// .catch(err=>{
//   console.log(err);
// })
mongoConnect(() => {
  app.listen(3000);
});
