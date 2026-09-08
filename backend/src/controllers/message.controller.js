import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js";
import User from "../models/Users.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    console.log(filteredUsers);
    res.status(200).json({
      filteredUsers,
    });
  } catch (error) {
    console.log({ message: "Error in getAllContacts controller:", error });
    res.status(500).json({ messgae: "Server Error" });
  }
};

export const getChatsByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getChatByUserId controller", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { id: receiverId } = req.params;
    const { text, image } = req.body;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "Chat Media",
      });
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    // todo: send message in real-time if uer is online with socket.io.

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller", error);
    res.status(500).json({ messsage: "Server error" });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // find all the messages where the logged-in user is either sender or receiver.
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const chatPartnersIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString(),
        ),
      ),
    ];

    const chatPartners = await User.find({
      _id: { $in: chatPartnersIds },
    }).select("-password");
    console.log("chatPartners:", chatPartners);
    res.status(200).json(chatPartners);
  } catch (error) {
    console.log("Error in getChatPartners controller", error);
    res.status(500).json({ message: "Server error" });
  }
};
