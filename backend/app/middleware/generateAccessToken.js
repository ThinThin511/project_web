const jwt = require("jsonwebtoken");

// const SignToken = {
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      user, // Truyền role người dùng trong payload
    },
    process.env.ACCESS_TOKEN_SECRET,
    console.log(process.env.ACCESS_TOKEN_SECRET), // Kiểm tra giá trị của ACCESS_TOKEN_SECRET

    { expiresIn: "1d" }
  );
};

// generateRefreshToken: (user) => {
//     jwt.sign(
//         {
//             id: user.id,
//             role: user.role
//         },
//         process.env.REFRESH_TOKEN_SECRET,
//         {expiresIn: "30d"}
//     )
// }
// }
module.exports = generateAccessToken;
