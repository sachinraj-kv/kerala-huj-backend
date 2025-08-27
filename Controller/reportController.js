const Cover = require("../Model/reportSchema");
const huj_User = require("../Model/userShema");

exports.submitReport = async (req, res) => {
  try {
    const { cover_id, records  } = req.body;

    console.log("cover_id",cover_id);
    console.log("records",records);
    
    const id = req.id

    console.log("id",id);

    
    
    if (!cover_id) {
      return res.status(400).json({
        success: false,
        message: "cover_id  required",
      });
    }

   const existed = await Cover.find({ cover_id: cover_id });

if (existed.length > 0) {
  return res.status(409).json({
    success: false,
    message: "already exist",
  });
}

     let lastCover = await Cover.findOne().sort({ reciptNo: -1 }); 
     let nextReciptNo = "0001";

    if (lastCover && lastCover.reciptNo) {
      let lastNo = parseInt(lastCover.reciptNo, 10);
      nextReciptNo = String(lastNo + 1).padStart(4, "0"); 
    }

const dataRecords = records.map(ele => ({
      record_id: ele.record_id,
      payment_slip: Boolean(ele.payment_slip),
      medical_certificate: Boolean(ele.medical_certificate),
      application: Boolean(ele.application),
      declaration: Boolean(ele.declaration),
      remarks: ele.remarks || "",
    }));

      

 const completed = dataRecords.every(r =>
  r.payment_slip && r.medical_certificate && r.application && r.declaration
);

const payload = {
  cover_id,
  records: dataRecords,
  completed,
  recererId : id,
  reciptNo: nextReciptNo,
}
   let cover = await Cover.create(payload);

cover = await cover.populate([
  { path: "recererId", select: "name" },
  { path: "records.record_id", model: huj_User ,select: "applicantName  ch"  }
]);

    console.log("cover",cover);
    
     

  const submituser = await huj_User.findOneAndUpdate(
  { coverId: cover_id, ch: "Ch" },  
  { $set: { submit: 1 } },      
  { new: true }   
);              

console.log("submituser",submituser);

    if(!submituser || submituser === 0){
      return res.status(404).json({
        success : false ,
        message : "not found"
      })
    }
  

    res.status(200).json({ 
      success: true,
      message:"submited successfully",
      data: cover
     });


  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Internal error",
      error: err.message
     });
  }
};


exports.viewReport = async (req, res) => {


  try {
    const reports = await Cover.find()
  .populate({ path: "recererId", select: "name" })
  .populate({ path: "records.record_id", model: "huj_user", select: "applicantName ch" });



      console.log("reports",reports);
      

    if (!reports || reports.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No reports found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data found",
      result: reports,
    });

  } catch (error) {
    console.error("viewReport error:", error);
    res.status(500).json({
      success: false,
      message: "Internal error",
      error: error.message,
    });
  }
};


exports.report = async(req , res)=>{
  const id = use.Params.id

  if(!id){
    return res.status(404).json({
      success : false ,
      message : "report not found"
    })
  }

  try {
    const fetch_data = await cover.find({id})

    if(!fetch_data || fetch_data.length === 0){
      return res.status(404).json({
        success : false,
        message : "not found "
      })
    }

    res.status(200).json({
      success : true ,
      message : "fetched successfully",
      result : fetch_data
    })
  } catch (error) {
    
  }
}



exports.Update = async (req, res) => {

  try {
    const { cover_id, records } = req.body;
    

    if (!cover_id) {
      return res.status(400).json({
        success: false,
        message: "cover_id is required",
      });
    }

  
    const dataRecords = (records || []).map((ele) => ({
      record_id: ele.record_id,
      payment: Boolean(ele.payment),
      documents: Boolean(ele.documents),
      receipt: Boolean(ele.receipt),
      passport: Boolean(ele.passport),
      remarks: ele.remarks || "",
    }));

   const completed = dataRecords.every(
      (r) => r.payment && r.documents && r.receipt && r.passport
    );

    const updatedCover = await Cover.findOneAndUpdate(
      { cover_id },
      { 
        $set: { 
          records: dataRecords,
          completed: completed ? 1 : 0
        }
      },
      { new: true }
    );

    if (!updatedCover) {
      return res.status(404).json({
        success: false,
        message: "Cover not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cover updated successfully",
      data: updatedCover,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal error",
      error: error.message,
    });
  }
};



exports.reportsearch = async(req ,res)=>{
  const {Query} = req.body
  
 
    
  if(!Query){
    return res.status(400).json({
      success : false,
      message : "enter the cover id"
    })
  }

  try {
    const result = new RegExp(Query.split("").join("-?"), "i");


    const serch_data = await Cover.find({ cover_id: { $regex: result }}).populate({ path: "recererId", select: "name" })
  .populate({ path: "records.record_id", model: "huj_user", select: "applicantName ch" });

    if(!serch_data || serch_data === 0){
      return res.status(404).json({
        success : false ,
        message : "not found"
      })
    }

    res.status(200).json({
      success  : true ,
      result : serch_data
    })

  } catch (error) {
    return res.status(500).json({
      success : false ,
      message : "Internal error"
    })
  }

}


