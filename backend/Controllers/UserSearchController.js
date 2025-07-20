import Conversation from "../Models/conversationModel.js";
import User from "../Models/userModel.js";


export const getUserBySearch=async (req, res)=>{
    try {
        const search=req.query.search || '';
        const currentUserId=req.user._id;

        const user=await User.find({
            _id:{$ne:currentUserId}, // nijar id chara  
            $or:[
                    {username:{$regex:'.*'+search+'.*', $options:'i'}},
                    {fullname:{$regex:'.*'+search+'.*', $options:'i'}}

                    // username: { $regex: '.*john.*', $options: 'i'
                    // options:'i' mean capital or small
                    //regex path matching 
                ]
        
        }).select("-password");
        
        res.status(200).send({user});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

export const getcurrentchatters=async(req, res)=>{
    try {
         const currentUserId=req.user._id;
         const currentchatters=await Conversation.find({
            participants:currentUserId
         }).sort({updatedAt:-1})

         if(!currentchatters || currentchatters.length===0)
         {
            return res.status(200).send([])
         }

         const participants=currentchatters.reduce((ids, conservation)=>{
            const other=conservation.participants.filter(id=>id.toString()!==currentUserId.toString());
            return[...ids, ...other];

         },[]);

         const otherparticipantIDS=participants
         .filter(id=>id.toString()!==currentUserId.toString())
         .map(id=>id.toString());
        

         
         const users=await User.find({
            _id:{$in:otherparticipantIDS}

        }).select("-password").select("-email");
         

         res.status(200).send({users});
    
        } catch (error) {
         res.status(500).json({ message: error.message });
    }
}

