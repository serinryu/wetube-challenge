export const localsMiddleware = (req, res, next) => {
    res.locals.siteTitle = "Nomad Movies";
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user;
    next();
};
export const urlLogger = (req, res, next) => {
    console.log(`Path : ${req.url}`);
    next();
};
export const timeLogger = (req, res, next) => {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();
    console.log(`Time : ${todayYear}.${todayMonth+1}.${todayDate} `);
    next();
};
export const securityLogger = (req, res, next) => {
    const inSecure = req.protocol === "http" ? "✅ Secure" : "❌ Insecure" ; 
    console.log("Insecure ", inSecure)
    next();
};

export const protectorMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
      return next(); //로그인 되어 있으면 통과
    } else {
      return res.redirect("/user/login");
    }
};