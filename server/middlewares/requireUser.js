export function requireUser(req, res, next) {
  if (!req.user) {
    return res.status(403).json({ login: false, message: "Invalid session" });
  }

  return next();
}

export function requireAdmin(req, res, next) {
  const isAdmin = req.user.role === "Admin";
  if (!req.user && isAdmin) {
    return res.status(403).json({ login: false, message: "Invalid session" });
  }

  return next();
}
