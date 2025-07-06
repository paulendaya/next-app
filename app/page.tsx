import Image from "next/image";
import Link from "next/link";
import ProductCart from "./components/ProductCard/ProductCart";

export default function Home() {
  return (
    //Client side navigation
    // All components inside the app folder are server components by default
    <main>
      <h1>Hello World</h1>
      <Link href="/users">Users</Link>
      <ProductCart />
    </main>
  );
}
