const mongoose= require('mongoose');
const { Schema } = mongoose;

const RewardSchema = new Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    points:{
        type: Number,
    },
	status:{
		type: String,
		default:"Beginner"
	}
});

module.exports=mongoose.model('rewards', RewardSchema);