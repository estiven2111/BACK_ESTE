const { Message } = require("../../db");

const delMessage = async(msgId) => {
  try {
    const conversationDel = await Message.destroy({ where: { id: msgId } })
    
    return "Ha elimina el mensaje correctamente";
  } catch (err) {
    return err
  }
}

module.exports = delMessage;