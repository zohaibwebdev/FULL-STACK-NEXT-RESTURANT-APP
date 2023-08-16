import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

//FETCH ALL THE ORDERS

export const GET = async (req: NextRequest) => {
  const session = await getAuthSession();
  const user = await prisma.user.findUnique({
    where: { email: session?.user.email },
  });
  if (session) {
    try {
      if (session.user.isAdmin) {
        const orders = prisma.order.findMany();
        return new NextResponse(JSON.stringify(orders), { status: 200 });
      }
    } catch (error) {
      console.log(error);
      return new NextResponse(
        JSON.stringify({ message: "something went wrong" }),
        { status: 500 }
      );
    }
  }
};
