const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose =require('mongoose')

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5eff46d8d18bdbbe04af7283')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
  
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);
mongoose.connect('mongodb+srv://NodeTest:rTgl4AD7IF0L3X6m@mongotest-ay262.mongodb.net/shop?retryWrites=true&w=majority')
.then(res=>{
  User.findOne().then(user=>{
    if(!user){
      const user = new User({
        name:'Mohamed',
        email:'mohamed@gmail.com',
        cart:{
          items:[]
        }
    
      });
      user.save();
    }
  })

  app.listen(3000);
})
.catch(err=>{
  console.log(err);
})
