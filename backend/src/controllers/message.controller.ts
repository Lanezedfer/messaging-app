import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import { io, getReceiverSocketId } from "../socket/socket.js";

export const getMessages = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const { id: userToChatId } = req.params;
    const senderID = req.user.id;

    const conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderID, userToChatId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!conversation) {
      return res.status(200).json([]);
    }

    res.status(200).json(conversation.messages);
  } catch (error: any) {
    console.log("Error in getMessages controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUsersForSidebar = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const authUserId = req.user.id;
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: authUserId,
        },
      },
      select: {
        id: true,
        fullname: true,
        profilePic: true,
      },
    });

    res.status(200).json(users);
  } catch (error: any) {
    console.log("Error in getUsersForSidebar controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendMessage = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderID = req.user.id;

    let conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderID, receiverId],
        },
      },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participantIds: {
            set: [senderID, receiverId],
          },
        },
      });
    }

    const newMessage = await prisma.message.create({
      data: {
        senderID,
        content: message,
        conversationID: conversation.id,
      },
    });

    if (newMessage) {
      conversation = await prisma.conversation.update({
        where: {
          id: conversation.id,
        },
        data: {
          messages: {
            connect: {
              id: newMessage.id,
            },
          },
        },
      });
    }

    const receiverSocketId = getReceiverSocketId(receiverId)

    if(receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage)
    }

    res.status(201).json(newMessage);
  } catch (error: any) {
    console.log("Error in sendMessage controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
