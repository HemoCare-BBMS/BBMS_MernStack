const testController = (req,res) => {
    res.status(200).send({
        message: 'welcome all',
        success: true,
    });
};

module.exports = {testController};