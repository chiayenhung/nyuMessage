var datasetController = {};
var fs = require ('fs');
var excel = require ('excel');

var Dataset = require('../models/dataset');

datasetController.getAll = function (req, res) {
  Dataset.find({}, function(err, datasets) {
    if (err) {
      res.send (500, err);
    }
    else if(!datasets) {
      res.send (404, 'dataset empty');      
    }
    else {
      res.send (datasets);
    }

  })
};

datasetController.fillData = function (req, res) {
  var path = __dirname + '/../../doc/NYU_building.xlsx';
  var result = [];
  excel(path, function(err, dataset){
    if (err) {
      res.send (500, err);
    }
    else {
      if (!dataset) {
        res.send (404, 'dataset empty');
      }
      else {
        read(dataset, function(){
          res.send (dataset);          
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
