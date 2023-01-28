const foodService = require("../services/foodService");

let getAllFood = async(req, res) => {
    try {
        let response = await foodService.getAllFood();
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        })
    }
}

module.exports = {
    getAllFood,
};