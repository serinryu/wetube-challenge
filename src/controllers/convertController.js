import { readdir, readFile } from 'fs';

export const getConvert = (req, res) => {
    readdir('texts', (err, files) => {
        try{
            console.log(files)
            return res.render("convert/convert.pug", {pageTitle : "추가 서비스: TXT to HTML", files})
        }catch(err){
            return res.render("convert/convert.pug", {pageTitle : "추가 서비스: TXT to HTML"}, {errorMessage : "Error"})
        }
    })
}

export const postConvert = (req, res) => {
    const { file } = req;
    readFile(`texts/${file.filename}`,  'utf8', (err, data) => {
        try{
            readdir('texts', (err, files) => {
                return res.render("convert/convert.pug", {pageTitle : "추가 서비스: TXT to HTML", data, files }
                )}
            )
        } catch(err) {
            return res.render("convert/convert.pug", {pageTitle : "추가 서비스: TXT to HTML"}, {errorMessage : "Error"})
        }
    });
}

export const converDetail = (req, res) => {
    const { 
        params : 
            { id }
    } = req;
    console.log(id);
    readFile(`texts/${id}`,  'utf8', (err, data) => {
        try{
            console.log(data)
            return res.render("convert/detail.pug", {pageTitle : `${id}`, data})
        } catch(err) {
            return res.render("convert/detail.pug", {pageTitle : `${id}` , errorMessage : "Error"})
        }
    });
}