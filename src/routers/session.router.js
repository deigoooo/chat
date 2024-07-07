import { Router } from "express";
import passport from "passport";
import { UserDTO } from "../dto/user.dto.js";

const router = Router();

router.get("/register", async (req, res) => {
  res.render("login/register");
});

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/session/failRegister",
    failureFlash: true,
  }),
  async (req, res) => {
    res.status(200).redirect("/session/login");
  }
);

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/session/failLogin",
    failureFlash: true,
  }),
  async (req, res) => {
    req.session.user = new UserDTO(req.user);
    res.render("main", req.session.user);
  }
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/session/failLogin" }),
  async (req, res) => {
    req.session.user = new UserDTO(req.user);
    res.render("main", req.session.user);
  }
);

router.get(
  "/googlecallback",
  passport.authenticate("google", { failureRedirect: "/session/failLogin" }),
  async (req, res) => {
    req.session.user = new UserDTO(req.user);
    res.render("main", req.session.user);
  }
);

router.get("/failRegister", async (req, res) => {
  const newError = req.flash("error");
  res.status(400).send({ error: `${newError}`, statusCode: 400 });
});
router.get("/failLogin", async (req, res) => {
  const newError = req.flash("error");
  res.send({ error: `${newError}` });
});

router.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).render("errors/base", { error: err });
    } else res.status(200).redirect("/");
  });
});

export default router;
