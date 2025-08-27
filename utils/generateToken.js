const jwt = require('jsonwebtoken')

exports.generateToken = async (req ,res)=>{

   const payload = {
  id: req.user.id.toString(),  
  name: req.user.name,
  time: Date.now(),
};

    console.log("payload",payload);
    
    const jwtToken = await jwt.sign(payload , process.env.SECRET_KEY , {expiresIn : '1h'})

    if(!jwtToken){
        return res.status(500).json({
            success : false ,
            message : "error in generating token"
        })
    }

    res.cookie("token" ,jwtToken ),{
        httpOnly: true,       
        secure: true,        
        sameSite: "none",     
        maxAge: 60 * 60 * 1000
    }

    res.status(200).json({
        success : true,
        message : "login successfull",
        token :jwtToken,
        isauthenticated : true,
        user :{
            name : req.user.id,
        }
    })
}