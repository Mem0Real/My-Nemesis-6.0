import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import Navbar from "./Navbar";

export const NavbarBase = async () => {
	const session = await getServerSession(authOptions);

	return <Navbar session={session} />;
};

export default Navbar;
