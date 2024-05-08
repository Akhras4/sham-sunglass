const mongoose = require('mongoose');
const sunglassSchema = new mongoose.Schema({
category:{type: String,},
price:{type: String,},
image:{type: Array,},
lens:{type: String,},
color:{type: String,},
size:{type: Array,},
brand:{type: String,},
title:{type: String,},
description:{type: String,},
salePrice: {type: String,default: null },
isOnSale: {type: Boolean,default: false },
})
const sunglass = mongoose.model('sunglass', sunglassSchema);
module.exports =  sunglass