//SHOW ALL DB
//show dbs

//SHOW CURRENT DB
//db

//SWITCH DB
//use empl

//SHOW COLLECTION
//show collections

//INSERT
//db.employee.insertOne({name: "iluh iliana ishita yasa", age: 5, occupation: "frontend developer"})
//db.employee.insertMany([{name: "kadek kanaya kharisma yasa", age: 4, occupation: "ui/ux developer"},{name: "komang kavindra keshava yasa", age: 4, occupation: "backend developer"}])

//FIND
db.employee.find()
//db.employee.findOne({_id: ObjectId("67f8ca616c864a9ac0afeca5")})
db.employee.find({age : 30}) // find by age
db.employee.find({name: /Made/}) // find like
db.employee.distinct("age");
db.employee.findAndModify({
    query: {_id : ObjectId("67f8ca616c864a9ac0afeca5")},
    update: {$set : {salary : 25000000}},
    new : true
})
db.employee.find().sort({age : 1}) // sort asc
db.employee.find().sort({age : -1}) // sort desc
db.employee.find().limit(3) // limit
db.employee.find().skip(3) // limit

//DELETE
//db.employee.deleteOne({_id: ObjectId("67f8d7c5d1862b6dcc17c7c2")})

//COUNT
db.employee.countDocuments()
db.employee.countDocuments({age : 5}) //count with condition
db.employee.estimatedDocumentCount()

//COMPARISON
db.employee.find({"age" : {$gt: 4}})
db.employee.find({"age" : {$gte: 4}})
db.employee.find({"age" : {$lt: 5}})

//Group by Gender and Count
db.employee.aggregate([
  {
    $group: {
      _id: "$gender",
      totalPeople: { $sum: 1 }
    }
  }
])

//Average Salary by Occupation
db.employee.aggregate([
  {
    $group: {
      _id: "$occupation",
      avgSalary: { $avg: "$salary" }
    }
  }
])

//Filter People with Salary > 20M and Sort Descending by Salary
db.employee.aggregate([
    {$match: {salary: {$gt: 15000000}}},
    { $sort: { salary: -1 }}
])

//Total Salary by Gender
db.employee.aggregate([
  {
    $group: {
      _id: "$gender",
      totalSalary: { $sum: "$salary" }
    }
  }
])

//Project Only Name and Age
db.employee.aggregate([
  {
    $project: {
      _id: 0, //remove id from output with 0
      name: 1,
      age: -1
    }
  }
])

//Bucket Age Ranges
db.employee.aggregate([
  {
    $bucket: {
      groupBy: "$age",
      boundaries: [0, 10, 20, 30, 40],
      default: "Other",
      output: {
        count: { $sum: 1 },
        names: { $push: "$name" }
      }
    }
  }
])

