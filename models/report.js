const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    of: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Report = mongoose.model('Report',reportSchema);

module.exports = Report;
