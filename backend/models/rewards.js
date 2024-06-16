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
	},
	username:{
		type: String
	}
});

module.exports=mongoose.model('reward_points', RewardSchema);