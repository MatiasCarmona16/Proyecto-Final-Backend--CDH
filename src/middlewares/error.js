import EErrors from "../services/errors/enums.js";

export default (error,req,res,next) => {
    console.log(error.cause);
    switch (error.code) {
        case EErrors.INVALID_TYPES_ERROR:
            res.status(400).send({ status:"error",error: error.name})
            break;
        default:
            res.status(500).send({ status:"error" ,error: "Unhandled error"});
    }
}