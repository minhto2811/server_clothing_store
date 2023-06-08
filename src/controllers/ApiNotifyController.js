
const Notify = require('../models/Notify');
const { convertleObject } = require('../utils/convertObj');




class ApiController {

 
    getAll(req, res, next) {
        const id_user = req.params.id_user;
        Notify.find({ id_user: id_user })
            .then((arr) => {
                res.json(arr);
            })
            .catch(err => res.json(null));
    }



}





module.exports = new ApiController;