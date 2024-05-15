const { Schema, model } = require('mongoose');


    const newsSchema = new Schema({
        name: { type: String, required: true },
        profilePicture: { type: String },
        body: { type: String, required: true },
        timestamp: { type: Date, default: Date.now } // Add a timestamp field
    });
    
    // Create a virtual field for formatted date
    newsSchema.virtual('date').get(function() {
        const date = this.timestamp;
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
    
        return `${day}.${month}.${year}`;
    });
    
    // Create a virtual field for formatted time
    newsSchema.virtual('time').get(function() {
        const date = this.timestamp;
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const amOrPm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12 || 12;
    
        return `${hours}:${minutes}${amOrPm}`;
    });
    
    // Ensure virtual fields are included when converting to JSON
    newsSchema.set('toJSON', { virtuals: true });
    
    // Ensure virtual fields are included when converting to Object
    newsSchema.set('toObject', { virtuals: true });

const   News = model('News', newsSchema);

module.exports = News;