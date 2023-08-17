const UsersModel = require("../models/UsersModel");
const jwt = require("jsonwebtoken");


exports.registration = async (req, res) => {
    let reqBody = req.body;
    try {
        const result = await UsersModel.create(reqBody);
        res.status(200).json({ status: "success", data: result });
    } catch (e) {
        res.status(200).json({ status: "fail", data: e });
    }
}

exports.login = async (req, res) => {
    try {
        let reqBody = req.body;
        let result = await UsersModel.find(reqBody).count('total');

        if (result == 1) {
            // Token issue
            let user = await UsersModel.findOne(reqBody).select("_id name")
            console.log(user)
            let Payload = {
                exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
                data: user
            }
            let token = jwt.sign(Payload, 'SecretKey123456789', { algorithm: 'HS256' });
            // let data = await UsersModel.findOne(reqBody);
            let data = await UsersModel.findOne(reqBody).select('_id name');
            res.status(200).json({ status: "success", token: token, data: data })
        }
        else {
            res.status(200).json({ status: "fail", data: result })
        }

    }
    catch (e) {
        res.status(200).json({ status: "fail", data: e })
    }
}
