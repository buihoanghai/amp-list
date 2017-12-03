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
            "name": "tIẾT KIỆM",
            "urlImage": "http://s1.haivn.com/data/400_314ae746-0e70-443f-bf50-d6488e0203be.jpg",
        },
    {
        "id": 2,
        "index":2,
        "name": "Anh tỉnh vl",
        "urlImage": "http://s1.haivn.com/data/400_2b38f2bf-d8c0-4843-a08e-c4936f41a3d2.jpg",
    },
    {
        "id": 3,
        "index":3,
        "name": "Bạn tốt",
        "urlImage": "http://s1.haivn.com/data/400_4ff6a707-acdd-4b2a-8355-a78c2951f939.jpg",
    },
    {
        "id": 4,
        "index":4,
        "name": "Cam thay hoang mang that su",
        "urlImage": "http://s1.haivn.com/data/400_c57739c4-0dbd-463c-8ac3-a933dc2d386e.jpg",
    },
    {
        "id": 5,
        "index":5,
        "name": "Cách xin lỗi đúng chuẩn 2017",
        "urlImage": "http://s1.haivn.com/data/400_a77d03eb-ab2f-43f4-80b7-fab706914447.jpg",
    },

]

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
