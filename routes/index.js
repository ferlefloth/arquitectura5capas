const express = require('express');
const authRoutes = require( './auth');
const router = {
    api: express.Router(),
    app: express.Router()
}
 
router.api.use('/auth',authRoutes);
//router.app.use('')
module.exports = router;