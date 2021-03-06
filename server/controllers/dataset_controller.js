var datasetController = {};
var fs = require ('fs');

var Dataset = require('../models/dataset');

datasetController.getDatasets = function (req, res) {
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

datasetController.updateDataset = function(req, res) {
  Dataset.findOne({_id: req.body._id}, function(err, building) {
    if (err) {
      console.log('found err');
      res.send(500, err);
    }
    else if (!building) {
      res.send(404, 'building not found');
    }
    else {
      building.posts = req.body.posts;
      building.save(function(err, building){
        if (err) {
          console.log("save error");
          res.send(500, err);
        }
        else{
          res.send(200, building);
        }
      });
    }
  });
}

datasetController.fillData = function (req, res) {
  var path = __dirname + '/../../doc/getAll.json';
  var result = [];

  fs.readFile (path, function(err, datasets) {
    datasets = JSON.parse(datasets);
    if (err) {
      res.send (500, err);
    }
    else {
      if (!datasets) {
        res.send (404, 'dataset empty');
      }
      else {
        read(datasets, function(){
          res.send (datasets);          
        });
      }
    }
  });
};


module.exports = datasetController;

var read = function (data, cb) {
  Dataset.find( {}, function(err, datasets){
    if (datasets.length <= 0) {
      for (var i = 0; i < data.length; i++) {
        if (data[i][0] != "") {
          console.log(data[i]);
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
  var building = new Dataset({
    building_name: data.building_name,
    address: data.address,
    Latitute: data.Latitute,
    Longtitue: data.Longtitue
  });
  building.save(function(err, building){
    if (err) {
      console.log (err);
    }
  })
};
