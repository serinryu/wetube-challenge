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

export const profile = (req, res) => {
    const pageTitle = req.session.user.name;
    return res.render("user/profile", { pageTitle })
}