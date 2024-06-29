//high order function
const asyncHandler = (responseHandler) => {
    (req,res,next) => {
        Promise.resolve(responseHandler(req,res,next))
        .catch((err) => next(err));
    }
}

export {asyncHandler};