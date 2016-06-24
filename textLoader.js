var DataLoader = require("dataloader");
var cache = new Map();

function myExpensiveFunction(id) {
  var names = ['Tigger', 'Mittens', 'Sparky', 'Gatsby', 'Whiskers', 'Lancelot', 'Boomer', 'Chopper', 'Gunner', 'Trooper']

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('finish')
      return resolve({
        id: names[Math.floor(Math.random() * names.length)]
      })
    }, 1500)
  });
}


var cats = new DataLoader(ids => Promise.all(ids.map(myExpensiveFunction)), {cache});


var time1 = Date.now();
cats.load(1).then(result => {
    console.log('result1: ' + result.id + ' time: [' + (Date.now() - time1).toString() + ']');
    var time2 = Date.now();
    cats.load(1).then(result => {
        console.log('result2: ' + result.id + ' time: [' + (Date.now() - time2).toString() + ']')
    })
})


