const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./routes/route');
const cors = require('cors')

require('dotenv/config');

const db = require('./config/db');
const Food = require('./models/Food');
const Account = require('./models/Account');
const Type = require('./models/Type');



//Connect to db
db.connect();

// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:19000');
  
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);
  
//     // Pass to next layer of middleware
//     next();
// });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());


const api = process.env.API_URL;

app.get(`${api}/get-all-food`, async(req, res) => {
    const productList = await Food.find();
    if(productList) {
        res.status(200).json({
            errCode: 0,
            data: productList
        });
    }else {
        res.status(400).json({
            errCode: 0,
            errMessage: 'Error'
        })
    }
    
})

app.get(`${api}/get-detail-food`, async(req, res) => {
    const product = await Food.findOne({
        id: req.query.id
    });
    if(product) {
        res.status(200).json({
            errCode: 0,
            data: product
        });
    }else {
        res.status(400).json({
            errCode: -1,
            errMessage: 'Error'
        })
    }
})

app.get(`${api}/get-user`, async(req, res) => {
    const user = await Account.findOne({
        email: req.query.email,
        password: req.query.password
    });
    if(user) {
        res.status(200).json({
            errCode: 0,
            data: user
        })
    }else {
        res.status(400).json({
            errCode: -1,
            errMessage: 'Error'
        })
    }
})

app.get(`${api}/get-user-by-id`, async(req, res) => {
    const user = await Account.findOne({
        id: req.query.id,
    });
    if(user) {
        res.status(200).json({
            errCode: 0,
            data: user
        })
    }else {
        res.status(400).json({
            errCode: -1,
            errMessage: 'Error'
        })
    }
})

app.get(`${api}/get-all-type`, async(req, res) => {
    const typeList = await Type.find();
    if(typeList) {
        res.status(200).json({
            errCode: 0,
            data: typeList
        })
    }else {
        res.status(400).json({
            errCode: -1,
            errMessage: 'Error'
        })
    }
})

//Add food
app.post(`${api}/add-new-food`, async(req, res) => {
    const food = new Food(req.body);
    food.save()
        .then(() => 
            res.status(200).json({
                errCode: 0,
                errMessage: 'Success'
            })
        )
        .catch(err => res.status(400).json({
            errCode: -1,
            errMessage: err
        }))
})


app.put(`${api}/update-food`, async(req, res) => {
    await Food.updateOne({ id: req.body.id }, req.body)
        .then(() => 
            res.status(200).json({
                errCode: 0,
                errMessage: 'Update food successfully'
            })
        )
        .catch(err => res.status(400).json({
            errCode: -1,
            errMessage: err
        }))
})

app.put(`${api}/delete-food`, async(req, res) => {
    await Food.updateOne({ id: req.body.id }, {statusFood: req.body.statusFood})
        .then(() => 
            res.status(200).json({
                errCode: 0,
                errMessage: 'Delete food successfully'
            })
        )
        .catch(err => res.status(400).json({
            errCode: -1,
            errMessage: err
        }))
})

app.post(`${api}/add-new-category`, async(req, res) => {
    const type = new Type(req.body);
    type.save()
        .then(() => 
            res.status(200).json({
                errCode: 0,
                errMessage: 'Success'
            })
        )
        .catch(err => res.status(400).json({
            errCode: -1,
            errMessage: err
        }))
})

app.put(`${api}/update-category`, async(req, res) => {
    await Type.updateOne({ id: req.body.id }, req.body)
        .then(() => 
            res.status(200).json({
                errCode: 0,
                errMessage: 'Update category successfully'
            })
        )
        .catch(err => res.status(400).json({
            errCode: -1,
            errMessage: err
        }))
})

app.put(`${api}/delete-category`, async(req, res) => {
    await Type.updateOne({ id: req.body.id }, {status: req.body.status})
        .then(() => 
            res.status(200).json({
                errCode: 0,
                errMessage: 'Delete category successfully'
            })
        )
        .catch(err => res.status(400).json({
            errCode: -1,
            errMessage: err
        }))
})

app.get(`${api}/get-detail-category`, async(req, res) => {
    const type = await Type.findOne({
        id: req.query.id
    });
    if(type) {
        res.status(200).json({
            errCode: 0,
            data: type
        });
    }else {
        res.status(400).json({
            errCode: -1,
            errMessage: 'Error'
        })
    }
})


app.use(cors());

app.listen(3000, () => {
    console.log('server is running on http://localhost:3000');
})