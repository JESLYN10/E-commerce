const authenticateUser = (req, res, next) => {
  const userId = req.body?.userId || req.params.userId || req.query.userId;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  req.userId = userId; 
  next();
};

module.exports = authenticateUser; 