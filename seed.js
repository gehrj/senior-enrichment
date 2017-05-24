// const Promise = require('bluebird');
// const { db, student, campus} = require('./db');



// let data = {
//     student: [
//         {name: 'Naruto', email: 'n@ninja.com', campusId:1},
//         {name: 'Sauske', email: 's@ninja.com', campusId:1},
//         {name: 'Sakura', email: 'x@ninja.com', campusId:1},
//         {name: 'Haku', email: 'h@ninja.com', campusId:2},
//         {name: 'Gara', email: 'g@ninja.com', campusId:3}
//     ],
//     campus: [
//         {name: 'Leaf Village', mascot: 'Leaf' , city:'Tree' , state: 'CO' , phone:'123-456-7890' },
//         {name: 'Hidden Mist', mascot: 'Water' , city:'Unknown' , state: 'MN' , phone:'123-456-7890' },
//         {name: 'Sand Village', mascot: 'Sand' , city:'Desert' , state: 'AZ' , phone:'123-456-7890' },
//         {name: 'Cloud Village', mascot: 'Cloud' , city:'Sky' , state: 'Toronto' , phone:'123-456-7890' },
//     ]
// }



  .then(function () {
  console.log("Dropped old data, now inserting data");
  return Promise.map(Object.keys(data), function (name) {
    return Promise.map(data[name], function (item) {
      return db.model(name)
      .create(item);
    });
  });
})