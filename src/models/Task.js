var mongoose = require('mongoose');
var _ = require('underscore');
var moment = require('moment');

var TaskModel;

var setName = function(name) {
    return _.escape(name).trim();
};

var TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        set: setName
    },

    importance: {
        type: Number,
        min: 1,
        max: 3,
        required: true
    },

    date: {
        type: Date,
        required: true,
        trim: true,
    },

    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Account'
    },

    createdData: {
        type: Date,
        default: Date.now
    }
});

TaskSchema.methods.toAPI = function() {

    return {
        name: this.name,
        importance: this.importance,
        //    date: moment(this.date).format("MMM DD YY"),
        date: this.date,
        _id: this._id
    };
};

TaskSchema.statics.findByOwner = function(ownerId, callback) {
    var search = {
        owner: mongoose.Types.ObjectId(ownerId)
    };

    return TaskModel.find(search).sort('date').select("name importance date").exec(callback);
};



TaskModel = mongoose.model('Task', TaskSchema);

module.exports.TaskModel = TaskModel;
module.exports.TaskSchema = TaskSchema;