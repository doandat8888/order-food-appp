const Food = require('../models/Food');

const getAllFood = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const foodList = await Food.find({});
            if(foodList) {
                resolve({
                    errCode: 0,
                    data: foodList
                })
            }
        } 
        catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    getAllFood
}