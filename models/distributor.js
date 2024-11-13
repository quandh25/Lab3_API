const mongooes = require('mongoose');
const Scheme = mongooes.Schema;
 
const Distributors = new Scheme({
    name: {type:String},
},{
    timestamps : true
})
module.exports = mongooes.model('distributor', Distributors)