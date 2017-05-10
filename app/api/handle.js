
export function handleError(res, statusCode) {
    statusCode = 500;
    return function(err) {
        res.status(statusCode).json({
            statusCode : 0,
            message : "Fail",
        });
    };
}

export function handleSuccess(res) {
    let statusCode = 200;
    return function(err) {
        res.status(statusCode).json({
            statusCode : 1,
            message : "Success",
        });
    };
}
