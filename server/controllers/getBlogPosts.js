const {get} = require('../models/getBlogPosts.js')

module.exports = {
    resCallback: async (req, res) => {
        let results = await get()

        if (results) {
            res.status(200).json(results)
        } else {
            res.status(404).send('Not Found')
        } 
    }
}