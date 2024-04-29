const { Schema, model } = require('mongoose');
const permissionsSchema = new Schema({
    name: {
      type: String,
      required: true
    }
    
  });

  const Permission = model('Permission', permissionsSchema);
module.exports = Permission;