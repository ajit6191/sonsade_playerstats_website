import jwt from "jsonwebtoken";

/* ======================================================
   ADMIN AUTH MIDDLEWARE (COOKIE BASED)
====================================================== */
export const adminAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Only admin allowed
    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access only",
      });
    }

    // Attach admin info (optional)
    req.admin = decoded; // { role: "admin" }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
