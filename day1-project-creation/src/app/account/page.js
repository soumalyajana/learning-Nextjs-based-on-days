// ✅ Server Component
import { redirect } from "next/navigation";

export default function Account() {
  const userProfieInfo = null;

  if (userProfieInfo === null) {
    redirect('/cart?search=product1&randomvalue=abcde');
  }

  return <h1>Account page</h1>;
}
