import mongoose from 'mongoose';
import Course from '../models/course.js';

// create new cause
export function createCourse (req, res) {
    const course = new Course({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
    });

    return course
        .save()
        .then((newCourse) => {
            return res.status(201).json({
                success: true,
                message: 'New cause created successfully',
                Course: newCourse,
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
            });
        });
}

// Get all course
export function getAllCourse( req, res){
    Course.find()
        .select('_id title description')
        .then((allCourse) => {
            return res.status(200).json({
                success: true,
                message: 'A list of all course',
                Course: allCourse,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err.message,
            });
        });
}