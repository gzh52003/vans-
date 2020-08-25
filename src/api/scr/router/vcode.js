const express = require("express");
const router = express.Router();
// 验证码
const svgCaptcha = require("svg-captcha");

const { formatData } = require("../utils/tools");

// 生成验证码
router.get("/", async (req, res) => {
  // 生成图像验证码：svg-captcha
  const options = {
    noise: 3,
    ignoreChars: "0o1il",
    background: "#e9eef3",
    color: true,
    fontSize: 40,
    height: 40,
    width : 100
  };

  // 验证码在这里生成
  const captcha = svgCaptcha.create(options);

  // 把验证码存入会话Session
  req.session.vcode = captcha.text.toLowerCase();
  console.log('4234234324342',req.session)
  res.send(formatData({ data: captcha.data }));
});

module.exports = router;
