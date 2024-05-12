const {MongoClient} = require('mongodb')

let uri = 'mongodb+srv://ojiekeyboardist:<ojie123>@cluster0.0w9jxju.mongodb.net/?retryWrites=true&w=majority'
module.exports = {
    connectToDb: (cb) =>{
        MongoClient.connect(uri)
        .then((client) =>{
            dbconnection = client.db()
            return cb()
        })
        .catch(err =>{
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => dbconnection

}
