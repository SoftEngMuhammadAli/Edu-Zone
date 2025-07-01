=> To fetch lessons with course details:
    Lesson.find({}).populate("courseId").exec();


=> To get assignments with both lesson and course:
    Assignment.find({})
        .populate("courseId")
        .populate("lessonId")
        .exec();