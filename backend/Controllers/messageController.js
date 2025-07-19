
import Conversation from '../Models/conversationModel.js';
import Message from '../Models/messageModel.js';

export const sendMessage=async(req, res)=>{
    try {
        const {message}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id

        let chats=await Conversation.findOne({
            participants:{$all:[senderId, receiverId]}
        });

        if(!chats)
        {
            chats=await Conversation.create({
               participants:[senderId, receiverId]
            });
        }

        const newMessage=new Message({
            senderId,
            receiverId,
            message : message.message,
            conversationId : chats._id
        });
        chats.messages.push(newMessage._id)
        
        //soket.io function
        await Promise.all([chats.save(), newMessage.save()]);
        res.status(200).send(newMessage)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
}

// export const getMessage=async(req, res)=>{
//     try {

//         const {id:receiverId}=req.params;
//         const senderId=req.user._id;

//         const chats=await Conversation.find({
//             participants:{$all:[senderId, receiverId]}
//         }).populate("messages");
        
        
//         if (!chats) {
//         return res.status(404).json({ message: "Conversation not found" });
//         }
//         const message=chats.messages;
//         res.status(200).send({message});

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message:error.message});
//     }
// }


export const getMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const chats = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    }).populate("messages");

    if (!chats) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    res.status(200).json({ messages: chats.messages });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
