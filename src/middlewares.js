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
    const url = req.url;
    if (url === "/protected") {
        return res.status(403).redirect("/");        
    }
    next();
};