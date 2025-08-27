const huj_User = require("../Model/userShema");

exports.user_data = async(req,res) => {
    
    try {   
        const {id} = req.query

        console.log("data",id);
        

        const Users = await huj_User.find({coverId : id ,submit: 0 })
        
        const length_data = Users.length

        if(!Users || Users.length === 0 ){
                return res.status(404).json({
                success : false ,
                message : "not found"
            })
        }

        res.status(200).json({
            success : true,
            message : "fetched successfull",
            Users
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

exports.user_pages_data = async(req,res) => {
    
    try {   

        let { pages = 1  , limit = 15 } = req.query

        query = { ch: "Ch" ,   submit: Number(0)};
        
         pages = parseInt(pages)
         limit = parseInt(limit) 

         if(pages < 1) pages = 1 
         if(limit < 1) limit = 10

         const skip = (pages - 1) *  limit

        
         
       const Users = await huj_User.find(query ).skip(skip).limit(limit)

        const totalUsers = await huj_User.countDocuments(query);

        totalpage = Math.ceil(totalUsers / limit)
        
        
        if(!Users || Users.length === 0 ){
                return res.status(404).json({
                success : false ,
                message : "not found"
            })
        }

        res.status(200).json({
            success : true,
            message : "fetched successfull",
            pages : totalpage,
            Users
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

exports.cov_search = async (req, res) => {
  const { query } = req.body;
    
  if (!query) {
    return res.status(400).json({
      success: false,
      message: "Enter the cover id"
    });
  }

  try {
   
    const data = new RegExp(query.split("").join("-?"), "i");

    
    const cov_data = await huj_User.find({
      coverId: { $regex: data },
      ch: 'Ch',
      submit: 0
    });

    if (!cov_data || cov_data.length === 0) {
      return res.status(200).json({
        success: false,
        message: "no data found"
      });
    }

    res.status(200).json({
      success: true,
      result: cov_data
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


