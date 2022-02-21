import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({ 
    credentials: {
      accessKeyId: process.env.AWS_ID,
      secretAccessKey: process.env.AWS_SECRET
    }
})

const isHeroku = process.env.NODE_ENV === "production";

const s3ImageUploader = multerS3({
  s3: s3,
  bucket: "youtube-clone-challenge/images",
  acl: "public-read",
});

const s3VideoUploader = multerS3({
  s3: s3,
  bucket: "youtube-clone-challenge/videos",
  acl: "public-read",
});

export const localsMiddleware = (req, res, next) => {
    res.locals.siteTitle = "Nomad Movies";
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user;
    res.locals.isHeroku = isHeroku;
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
      req.flash("error", "Not authorized. Log in first");
      return res.redirect("/user/login");
    }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next(); //로그인 되어 있지 않으면 통과
  } else {
    req.flash("error", "Not authorized. Log out first.");
    return res.redirect("/");
  }
};


export const uploadProfile = multer({ 
  dest: "uploads/profile/",
  limits: {
    fileSize: 1000000,
  },
  storage: isHeroku ? s3ImageUploader : undefined , //storage 가 있으면 dest 는 무시가 된다.
});

export const uploadMovie = multer({ 
  dest: "uploads/movies/",
  limits: {
    fileSize: 3000000,
  },
  storage: isHeroku ? s3VideoUploader : undefined ,
});

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'texts/');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
});
export const convertFiles = multer({ storage: storage });

