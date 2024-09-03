use('e-store')

// db.users.find({})
// db.users.findOne({name:"Mwero"})
// db.users.deleteMany({})

db.products.deleteMany({name:{$exists:true}})