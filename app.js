const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const User = require('./models/user');
const Product = require('./models/product');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
    User.findByPk(1)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
          
        });
});


app.use('/admin', adminRoutes);
app.use(shopRoutes);


Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize.sync()
    .then(() => {
        return User.findByPk(1);
    })
    .then((user) => {
        if (!user) {
            return User.create({ id:1,name: 'isha', email: 'isha111@gmail.com' });
        }
        return user;
    })
    .then((user) => {
        console.log('Connected to database and user found or created:', user);
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => {
        console.error('Error initializing server:', err);
    });
