const fs = require('fs')

let route = (req,res) =>{
    const url = req.url;
    if (url === '/') {
        fs.readFile("data.txt",(err,data)=>{
            const name = data.toString()
            res.setHeader('Content-Type', 'text/html')
            res.end(`<h2>${name}</h2>
            <form method="POST" action="/message">
                <label>Name:
                    <input name="username">
                </label>
                <button type="submit">Add</button>
            </form>`);
        })
    }else if(url === '/message'){
        let dataChunks = [];
        req.on("data",(chunks)=>{
            dataChunks.push(chunks)
        })
        req.on("end",()=>{
            let ans = Buffer.concat(dataChunks)
            let name = ans.toString().split("=")[1]
            fs.readFile("data.txt",(err,data)=>{
                const updatedData = name + '\n' + (data || '');
                fs.writeFile("data.txt",updatedData,(err)=>{
                    res.statusCode = 302
                    res.setHeader('Location','/')
                    res.end()
                })
            })
        })
    } else if (url === '/home') {
        res.end('<h1>Welcome home</h1>');
    } else if (url === '/about') {
        res.end('<h1>Welcome to About Us</h1>');
    } else if (url === '/node') {
        res.end('<h1>Welcome to my Node Js project</h1>');
    } else {
        res.statusCode(404);
        res.end('<h1>Page Not Found</h1>');
    }
}

let show = (req,res)=>{
    console.log("Hi")
}

// module.exports = route

// module.exports.route = route

// module.exports = {
//     routeFunction:route,
//     showFunction: show
// }

module.exports = {
    route,
    show
}