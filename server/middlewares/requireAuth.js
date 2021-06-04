function requireAuth(req, res, next) {
    // console.log('isAuthenticated?');
    if (req.isAuthenticated()) {
        // console.log('yes');
        next();
    } else {
        // console.log('no');
        res.status(401).send({ message: 'User authentication is required' });
    }
}

module.exports = requireAuth;