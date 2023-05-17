const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле keyword должно быть заполнено'],
  },
  ip: {
    type: String,
    required: [true, 'Поле keyword должно быть заполнено'],
    unique: [true, 'такой ip уже есть в базе данных'],
  },
  type: {
    type: String,
    required: [true, 'Поле keyword должно быть заполнено'],
  },
  vendor: {
    type: String,
    required: [true, 'Поле keyword должно быть заполнено'],
  },
  snmpKey: {
    type: String,
    required: [true, 'Поле keyword должно быть заполнено'],
  },
  port: {
    type: Number,
  },
  clientId: {
    type: Number,
  },
  parameters: {
    type: Object,
  },
  alarms: {
    type: Object,
  },
});

module.exports = mongoose.model('node', nodeSchema);
