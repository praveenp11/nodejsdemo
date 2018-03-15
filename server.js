const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();

var db = require('./db/mongoose');

var Customer = require('./models/customer');

const PORT = 3000;

app.use(bodyParser.json());

/*
var praveen = new Customer({
    firstname: 'Praveen',
    lastname: 'Kumar',
    email: 'praveen@votigo.com',
    address: 'Motinagar, Hyderabad TG'
});

praveen.save()
.then(result => console.log('Data inserted successfully'))
.catch(err => console.log('Exception in insert'+ err));*/

app.get('/customers', (req, res) => {
    Customer.find({})
    .then(result => {
        console.log('Customers list');
        res.send(result)
    })
    .catch(err => {
        console.log('Customer listing page exception '+err);
        res.status(200).send('OK');
    });

});

app.get('/customer/:customerId', (req, res) => {
    Customer.find({Id : req.params.customerId })
    .then(result => {
        console.log('Customer information');
        if(result){
            res.send(result);
        }else{
            res.send('Customer not found');
        }

    }).
    catch(err => {
        console.log('Exception findone' + err);
        res.status(200).send('OK');
    });
});

app.post('/customer/create', (req, res) => {
    console.log('body parser');
    console.log(req.body);
    bcrypt.hash(req.body.password, 10, (err, hash_pw) => {
        var customer = new Customer(req.body);
        customer.password = hash_pw;
        customer.save()
        .then(result => {
            res.send('Data saved successfully');
        })
        .catch(err => {
            console.log('Exception in customer creation ', err);
            res.status(400).send(err);
        });
    });
});


app.patch('/customer/:id', (req, res) => {
    console.log('reached to path');
    req.body.update_timestamp = Date.now();
    Customer.findOneAndUpdate({Id : req.params.id}, req.body)
    .then(result => {
        console.log('Record got updated');
        res.send('Success');
    }).catch(err => {
        console.log('Exception in update ', err);
        res.send('OK');
    });

});

app.listen(PORT);