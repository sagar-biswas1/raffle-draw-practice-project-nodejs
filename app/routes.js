const router = require('express').Router();

router.use('/api/v1/tickets', require('../routes/tickets'));

router.get('/health', (_req, res) => {
    //const error =new Error('hello error');
    //error.status = 404;
   // throw error;
	res.status(200).json({ message: 'Success' });
});

module.exports = router;