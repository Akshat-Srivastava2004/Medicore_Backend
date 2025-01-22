const logoutUser = async (req, res) => {
    try {
      // Clear the tokens by setting cookies with an expired date
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none", // For cross-origin cookies
      });
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none", // For cross-origin cookies
      });
  
      return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Error during logout:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  export { logoutUser };