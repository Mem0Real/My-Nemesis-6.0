"use server";

import { sendMail } from "@/lib/mailService";

export async function sendMessage(data) {
  let status;
  if (data.email === "" || data.message === "")
    return { error: `Empty email or message` };

  try {
    await sendMail(data.email, data.fullName, data.message);

    status = { success: `Message sent!` };
  } catch (error) {
    status = { error: `Error sending message` };
  }

  return status;
}
