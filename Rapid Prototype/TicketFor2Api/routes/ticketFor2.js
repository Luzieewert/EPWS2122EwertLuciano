const express = require('express')
const router = express.Router()

// sample route
router.get('/', (req,res) => {
    res.send('Hello im alive')
})

module.exports = router

