const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { authenticateJWT } = require('../jwtMiddleware');

router.route('/login').post(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ userId: user.email }, process.env.JWT_SECRET, { expiresIn: '30m' })
  res.json({
    message: 'Login successful',
    token,
  });
});

router.route('/').get(authenticateJWT, (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get(authenticateJWT, (req, res) => {
  User.findById(req.params.id)
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(authenticateJWT, (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({ username, email, password });
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
//validate token
router.post('/validateToken', authenticateJWT, (req, res) => {
  // If the token is valid, the user is authenticated.
  res.status(200).json(
    {
      valid: true,
      message: 'Token is valid'
    }
  );
});
module.exports = router;