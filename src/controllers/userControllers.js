//globalRouter
export const join = (req, res) => res.send("Join");
export const login = (req, res) => res.send("Login");

//userRouter
export const users = (req, res) => res.send("Users");
export const userProfile = (req, res) => {
    const {
        params : { id }
    } = req;
    return res.send(`See a userprofile of ${id}`);

};
export const editProfile = (req, res) => res.send("Editprofile");


