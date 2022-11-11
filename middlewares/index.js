const admin = (req, res, next) =>{
    try{
        const role = req.body.admin;
        if (role) {
            next();
            return;
        }
        return res
            .status (403)
            .json ({
                error: 403,
                message:`Access denied. You can't access to ${req.baseUrl} `
            });
    }catch (error) {return res.status(500).send({message:error})};
}

module.exports =admin