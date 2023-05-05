module.exports = {


    convertleObject: function (mongoose) {
        if (!mongoose) {
            return mongoose;
        } else if (Array.isArray(mongoose)) {
            return mongoose.map(m => m.toObject());
        } else {
            return mongoose.toObject();
        }
    },

}