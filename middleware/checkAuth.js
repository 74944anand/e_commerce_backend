const jwt = require('jsonwebtoken');
const {redisClient,isRedisConnected} = require('../config/redisConfig');
const models = require('../models');

exports.checkAuth = async (req, res, next) => {
    try {
        const bearer = req.header("Authorization");
        if (!bearer) {
            return res.status(401).send({ result: "Please Login First" });
        }

        const token = bearer.split(" ")[1];
        if (!token) {
            return res.status(401).send({ result: "Please Login First" });
        }

        const tokenObj = jwt.decode(token);
        if (!tokenObj) {
            return res.status(401).send({ result: "Please Login First" });
        }
        let cachedToken ;
        if(isRedisConnected){
            cachedToken = await redisClient.get(`user:${tokenObj.id}:token`);
        }
        
        if (!cachedToken) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                const find = await models.userToken.findOne({ where: { token: token } });
                if (!find) {
                    return res.status(401).send({ result: "Please Login First" });
                }
                if(isRedisConnected){
                    await redisClient.set(`user:${tokenObj.id}:token`, 3600, token);
                }
                
                req.decoded = decoded;
                next();
            } catch (error) {
                return res.status(401).send({ result: "Please Login First" });
            }
        } else {
            req.decoded = tokenObj; 
            next();
        }
    } catch (error) {
        return res.status(401).send({ result: "Please Login First" });
    }
};
