export default (err, req, res, next)=>{
    const code = err.statusCode || 500
    console.log(err.message);
    res.status(code).json({
        status: "fail",
        message: process.env.NODE_ENV === "development" ? err.message : 'Something went wrong 💩'
    })
}