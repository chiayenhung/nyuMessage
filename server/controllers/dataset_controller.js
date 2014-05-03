var datasetController = {};
var fs = require ('fs');
var excel = require ('excel');

var Dataset = require('../models/dataset');

datasetController.fillData = function(req, res){
  var path = __dirname + '/../../doc/NYU_building.xlsx';
  var result = [];
  excel(path, function(err, data){
    if (err) {
      res.send (500, err);
    }
    else {
      if (!data) {
        res.send (404, 'dataset empty');
      }
      else {
        read(data, function(){
          res.send (data);          
        });
      }
    }
  });
};


module.exports = datasetController;

var read = function (data, cb) {
  Dataset.find( {}, function(err, datasets){
    if (datasets.length <= 0) {
      for (var i = 1; i < data.length; i++) {
        if (data[i][0] != "") {
          insert(data[i]);      
        }
        if (i >= data.length - 1) {
          cb();
        }
      }
    }
    else {
      cb();
    }
  });
}

var insert = function (data) {
  var latLong = data[2].split(',');
  var building = new Dataset({
    building_name: data[0],
    address: data[1],
    Latitute: latLong[0],
    Longtitue: latLong[1]
  });
  building.save(function(err, building){
    if (err) {
      console.log (err);
    }
  })
};
