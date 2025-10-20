import Image from "next/image";
import Link from "next/link";
import ProductCart from "./components/ProductCard/ProductCart";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/authOptions";
import image from "@/public/images/shutterstock_1683582157.jpg";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    //Client side navigation
    // All components inside the app folder are server components by default
    <main>
      {/* <h1>Hello World {session && <span>{session.user!.name}</span>}</h1>
      <Link href="/users">Users</Link>
      <ProductCart /> */}
      <Image
        src={image}
        alt="Bahrain National Museum Front view with two local Bahraini standing"
        width={400}
      />
    </main>
  );
}
