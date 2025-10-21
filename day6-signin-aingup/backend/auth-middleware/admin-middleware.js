const isAdminUser = (req, res, next)=>{
    if(!req.user || req.user.role !== "admin"){
        return res.status(403).json({
            success : false,
            message : "Access denied. Only admin is allowed"
        })
    }
    next();
}

module.exports = isAdminUser;