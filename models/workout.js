const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const workoutSchema = new Schema ({
        day: {
            type: Date,
            default: () => new Date()
        },
        exercises: [
            {
                type: {
                    type: String,
                    trim: true,
                    required: "Please enter excercise type."
                },

                name: {
                    type: String,
                    trim: true,
                    required: "PLease enter excercise name. "
                },

                duration: {
                    type: Number,
                    required: "Please enter an excercise lenght."
                },

                weight: {
                    type: Number
                },

                reps:{
                    type: Number
                },

                sets:{
                    type: Number
                },

                distance: {
                    type: Number
                }
            }
        ]
    },
    {
        toJSON:{
            virtuals:true
        }
    }

)
workoutSchema.virtual("totalDuration").get(function (){
    return this.exercises.reduce((total, excercise)=>{
        return total + excercise.duration
    }, 0)
});

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;