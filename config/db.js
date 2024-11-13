const mongoose = require('mongoose')
mongoose.set('strictQuery',true)

const local = "mongodb://localhost:27017/quanliasm"

const connect = async () => {
    try {
        await mongoose.connect(local,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
      console.log('connect thành công');
    } catch (error) {
        console.log(error);
        console.log('connect fail');
    }
}
module.exports = {connect}