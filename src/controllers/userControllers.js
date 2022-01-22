// globalRouter
export const join = (req, res) =>
  res.render("users/join", { pageTitle: "Join" });
export const login = (req, res) =>
  res.render("users/login", { pageTitle: "Login" });

// userRouter
export const users = (req, res) =>
  res.render("users/users", { pageTitle: "Users" });
export const userProfile = (req, res) => {
  const {
    params: { id }
  } = req;
  res.render("users/userprofile", { pageTitle: "Profile", id });
};
export const editProfile = (req, res) =>
  res.render("users/edit-profile", { pageTitle: "Edit-Profile" });
