/*
Copyright 2017 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var express = require('express');
var formidable = require('formidable');
var _ = require('underscore');
var app = express();
var products= [
        {
            "id": 1,
            "index":1,
            "name": "Daniel",
            "urlImage": "",
        },
        {
            "id": 2,
            "index":2,
            "name": "Long"
        },
        {
            "id": 3,
            "index":3,
            "name": "Mac"
        },
        {
            "id": 4,
            "index":4,
            "name": "Thang"
        },
        {
            "id": 5,
            "index":5,
            "name": "BaoAnh"
        },
        {
            "id": 6,
            "index":6,
            "name": "Hai"
        },
    {
        "id": 7,
        "index":7,
        "name": "Daniel",
        "urlImage": "",
    },
    {
        "id": 8,
        "index":8,
        "name": "Long"
    },
    {
        "id": 9,
        "index":9,
        "name": "Mac"
    },
    {
        "id": 10,
        "index":10,
        "name": "Thang"
    },
    {
        "id": 11,
        "index":11,
        "name": "BaoAnh"
    },
    {
        "id": 12,
        "index":12,
        "name": "Hai"
    }
]

var menu =[
    {
        'id': 'electronics',
        'title' : 'Electronics',
        'subMenu': [
            {
                'id': 'gaming',
                'title': 'Gaming',
                'subMenu':[
                    {
                        'id': 'nintendo-switch',
                        'title': 'Nintendo Switch'
                    }
                ]

            }
        ],
    },
    {
        'id': 'fashion',
        'title' : 'Fashion',
        'subMenu': [
            {
                'id': 'jewellery',
                'title': 'Jewellery',
                'subMenu':[
                    {
                        'id': 'cufflinks',
                        'title': 'Cufflinks'
                    }
                ]

            }
        ],
    }

];
app.get('/menu', function(req, res) {
    var tempMenu = _.clone(menu);
    var result = [];
    _.forEach(tempMenu, function(item){
        result.push({
            id: item.id,
            title: item.title,
            subMenu:[],
            displayMenu: false
        });
    });

 //   var response = {items: result, displayMenu: false, selectedMenu: ''};
    var response = {items: result};

    setTimeout(() => res.json(response), 1000); // Simulate network delay.
});
app.get('/nomenu', function(req, res) {
    var response = {items: []};
    setTimeout(() => res.json(response), 1000); // Simulate network delay.
});

app.get('/menu/fashion', function(req, res) {
    var response = {};
    response['items'] = menu[1].subMenu;

    setTimeout(() => res.json(response), 1000); // Simulate network delay.
});
app.get('/menu/electronics', function(req, res) {
    var response = {};
    response['items'] = menu[0].subMenu;

    setTimeout(() => res.json(response), 1000); // Simulate network delay.
});

app.get('/product', function(req, res) {
    var length= products.length;
    var response = {items: [products[0]], total: length};

    setTimeout(() => res.json(response), 1000); // Simulate network delay.
});

app.post('/products', function(req, res) {
    res.setHeader('AMP-Access-Control-Allow-Source-Origin',
        'http://localhost:3000');
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        var index =parseInt(fields.index);
        var query= fields.query;
        var temp = products;
        if(query){
            temp = _.filter(temp, function(item){ return item.name.indexOf(query)>=0 });
        }
        var length= temp.length;
        var temp= temp.slice(0, index);
        var response = {items: temp, total: length};
        setTimeout(() => res.json(response), 1000);
    });
});

app.use('/', express.static('static'));

app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});
