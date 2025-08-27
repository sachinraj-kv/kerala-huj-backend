const jwt = require('jsonwebtoken')

exports.authorization = async (req ,res ,next)=>{


    const login_token = req.cookies.token;

    

    jwt.verify(login_token , process.env.SECRET_KEY,(err , decode)=>{
        if(err){
            res.status(401).json({
                success : false,
                message : "please login"
            })
        }
        

        req.id = decode.id
        req.name = decode.name

        
         next()
    })
   

}
