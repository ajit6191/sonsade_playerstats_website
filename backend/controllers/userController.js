import jwt from "jsonwebtoken";

/* ======================================================
   ADMIN ONLY LOGIN (ENV BASED)
====================================================== */
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
      console.log(email)
    // 1. Validate
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2. Compare with ENV
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    // 3. Create JWT (ADMIN ONLY)
    const token = jwt.sign(
      {
        role: "admin",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 4. Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 5. Response
    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      user: {
        email,
        role: "admin",
      },
    });
  } catch (error) {
    console.error("Admin Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const getAdminMe = (req, res) => {
  try {
    // adminAuth middleware already verified token
    // and attached req.admin

    return res.status(200).json({
      success: true,
      role: "admin",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};
