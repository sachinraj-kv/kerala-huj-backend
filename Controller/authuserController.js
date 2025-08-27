const register = require("../Model/authSchema");
const { generateToken } = require("../utils/generateToken");

exports.register = async(req ,res)=>{

    const {name , password} = req.body

    console.log("req.body",req.body);
    
   try {
    
        const user = await register.create({
            name ,
            password
        })

        if(!user || user=== 0){
            return res.status(400).json({
                success : false ,
                message : 'not created'
            })
        }

        res.status(200).json({
            success : true,
            message : "accout created",
            user
        })
   } catch (error) {
    res.status(500).json({
        success : false ,
        message : "internal error"
    })
   }
}

exports.login = async(req ,res)=>{
    const {name , password} = req.body


    if(!name , !password){
        return res.status(400).json({
            success : false ,
            message : "plz fill the feilds"
        })
    }
    
    try {
        const user = await register.findOne({name})
        
  
        

    if(!user || user === 0){
        return res.status(404).json({
            success : false ,
            message : "uesr not found"
        })
    }

    const ispassword = password === user.password



    if(!ispassword){
        return res.status(400).json({
            success : false,
            message : 'password invalid'
        })
    }
    
        const log_Data = {
            id : user?._id,
            name : user?.name
        }

        
        req.user = log_Data

        generateToken(req ,res);

    } catch (error) {
        res.status(500).json({
            success : false ,
            message : "Internal error"
        })
    }
}

exports.logout = async (req, res) => {
  const token = req.cookies.token;

  if (!token || token.length === 0) {
    return res.status(200).json({
      success: true,
      message: "Please login",
    });
  }

  res.clearCookie("token", {
    httpOnly: true,  
    secure: true,       
    sameSite: "strict", 
  });

  return res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
};
