"use server"

import prisma from "./prisma"
import { currentUser } from "@clerk/nextjs/server"

export const onAuthenticatedUser = async () => {
  try {
    const clerk = await currentUser()
    if (!clerk) return {status: 404, message: "User not found"}
    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerk.id,
      },
      select:{
        id:true,
        name:true,
      },
    })
    if(user)
      return {
        status: 200,
        id:user.id,
        name:user.name,
      }
      return {status: 404, message: "User not found"}
  } catch (error) {
    return {status: 400,
    }
  }