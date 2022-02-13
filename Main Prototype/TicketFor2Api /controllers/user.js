const getUserById = (req, res) => {
    if(!req.isAuthenticated()) return res.status(200).json({result: {}})
    const {id} = req.params
    User.findById(id,null,null, (err,user) => {
        if (err) res.send(err)
        else res.status(200).json({result: user});
    })
}

module.exports = {getUserById}