import User from "../models/User.js";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
    res.render("user/join", { pageTitle: "Join" } )
};

export const postJoin = async (req, res) => {
    const { 
        body : { name, email, username, password, password2 } 
    } = req;
    const pageTitle = "Join";
    if ( password !== password2 ) {
        return res.status(400).render("user/join", { 
            pageTitle , 
            errorMessage: "wrong password confirmation."
        });
    }
    try {
        const userExists = await User.exists({ $or: [{ username }, { email }] });
        if ( userExists ) {
            return res.status(400).render("user/join", { 
                pageTitle , 
                errorMessage: "username or email was already taken."
            })
        }
        await User.create({
            name, email, username, password,
        })
        return res.status(200).render("user/login", {
            pageTitle : "Login",
            errorMessage: "회원가입 성공. 로그인 해주세요!"
        });
    } catch (err) {
        console.error(err);
    }
};

export const getLogin = (req, res) => {
    res.render("user/login", { pageTitle: "Login" })
};

export const postLogin = async (req, res) => {
    const { 
        body : { username, password }
    } = req;
    const pageTitle = "Login";
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).render("user/login", { 
                pageTitle, 
                errorMessage: "Did you join? Please join first!"
            })
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch){
            return res.status(400).render("login", {
                pageTitle,
                errorMessage: "Wrong password"
            });
        }
        //LOGIN
        req.session.loggedIn = true;
        req.session.user = user;
        return res.status(200).redirect('/');
    } catch (err) {
        console.error(err)
    }
};

export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
} 

export const profile = async (req, res) => {
    const { username } = req.params;
    return res.render("user/profile", { pageTitle : `${username}'s profile` })
};

export const getEditprofile = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({username});
        if (!user) {
            return res.status(404).render("partials/404", { pageTitle: "User is not found"})
        }
        return res.render("user/editprofile", { pageTitle : `Edit  ${user.username}'s profile`, user })
    } catch (err) {
        console.error(err);
    }
};

export const postEditprofile = async (req, res) => {
    const {
        params: { username },
        body: { name , email }
    } = req;
    try {
        const existsUser = await User.exists({username});
        if (!existsUser) {
            return res.status(404).render("partials/404", { pageTitle: "User is not found"})
        }
        const updatedUser = await User.findOneAndUpdate({username}, {
            name,
            email
        }, { new: true }
        );
        req.session.user = updatedUser;
        return res.redirect(`/user/profile/${username}`)
    } catch (err) {
        console.error(err);
    }
};

export const getChangePassword = async (req, res) => {
    return res.render("user/changepassword", { pageTitle : "Change password" })
}

export const postChangePassword = async (req, res) => {
    const {
        session: {
            user: { _id },
        },
        body: { oldPassword, newPassword, newPasswordConfirmation },
    } = req;
    const user = await User.findById(_id);
    const passwordCompare = await bcrypt.compare(oldPassword, user.password);
    //1단계: New password confirmation 틀리면 아웃
    if (newPassword !== newPasswordConfirmation){
        return res.status(400).render("user/changepassword", {
            pageTitle: "Change Password",
            errorMessage: "The password does not match the confirmation",
        });
    }
    //2단계: oldPassword 와 user.password 해싱값 다르면 아웃
    if (!passwordCompare) {
        return res.status(400).render("user/changepassword", {
            pageTitle: "Change Password",
            errorMessage: "The current password is incorrect",
        });
    } 
    //세션 업데이트
    user.password = newPassword; //DB 업데이트
    await user.save(); //해싱
    return res.redirect("/user/logout"); //비번 바꾸면 로그아웃
}
