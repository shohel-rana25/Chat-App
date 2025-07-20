
import Conversation from '../Models/conversationModel.js';
import Message from '../Models/messageModel.js';
import mongoose from 'mongoose';


// export const sendMessage=async(req, res)=>{
//     try {
//         const {message}=req.body;
//         const {id:receiverId}=req.params;
//         const senderId=req.user._id

//         let chats=await Conversation.findOne({
//             participants:{$all:[senderId, receiverId]}
//         });

//         if(!chats)
//         {
//             chats=await Conversation.create({
//                participants:[senderId, receiverId]
//             });
//         }

//         const newMessage=new Message({
//             senderId,
//             receiverId,
//             message : message.message,
//             conversationId : chats._id
//         });
//         chats.messages.push(newMessage._id)
        
//         console.log("Saved message:", newMessage);
//         console.log("Saved in conversation:", chats._id);


//         //soket.io function
//         await Promise.all([chats.save(), newMessage.save()]);
//         res.status(200).send(newMessage)
        
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message:error.message});
//     }
// }
export const sendMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.user._id;

    console.log("Receiver ID from params:", receiverId);
    console.log("Sender ID from auth:", senderId);

    if (!receiverId || !senderId) {
      return res.status(400).json({ message: "Missing sender or receiver ID" });
    }

    // খেয়াল রাখো receiverId এবং senderId আলাদা হতে হবে
    if (receiverId === senderId.toString()) {
      return res.status(400).json({ message: "Sender and receiver cannot be the same" });
    }

    // Conversation খুঁজো অথবা তৈরি করো
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message: req.body.message.message,
      conversationId: conversation._id,
    });

    await newMessage.save();

    conversation.messages.push(newMessage._id);
    await conversation.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ message: error.message });
  }
};



export const getMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const receiverId = new mongoose.Types.ObjectId(id);
    const senderId = req.user._id;

    // Conversation খুঁজে বের করো
    let chat = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (!chat) {
      // যদি conversation না থাকে, তৈরি করো
      chat = await Conversation.create({
        participants: [senderId, receiverId],
      });

      return res.status(200).json({ messages: [] });
    }

    // Message মডেল থেকে সব মেসেজ বের করো
    const messages = await Message.find({ conversationId: chat._id });

    res.status(200).json({ messages });

  } catch (error) {
    console.error("Error in getMessage:", error);
    res.status(500).json({ message: error.message });
  }
};
