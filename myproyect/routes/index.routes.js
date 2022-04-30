const router = require("express").Router();

/* GET home page */
router.get("/home", (req, res, next) => {
  res.render("home");
});

router.get("/home/user", (req, res, next)=>{
  console.log(req.session.user);
  res.render("user/user-profile", req.session.user)
})


router.get("/home/user/edit", (req, res, next)=>{
  res.render("user/user-edit")
})

module.exports = router;
