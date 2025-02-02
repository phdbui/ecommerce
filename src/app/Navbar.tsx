import { getWixClient } from "@/lib/wix-client.base"
import Image from "next/image"
import Link from "next/link"

export default async function Navbar() {
  const cart = await getCart()

  const totalQuantity =
    cart?.lineItems.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0

  return (
    <header className="bg-background shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 p-5">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="PhDBui Shop logo"
            width={40}
            height={40}
          />
          <span className="text-xl font-bold">PhDBui Shop</span>
        </Link>
        {totalQuantity} items in your cart
      </div>
    </header>
  )
}

async function getCart() {
  const wixClient = getWixClient()
  try {
    return await wixClient.currentCart.getCurrentCart()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error?.details.applicationError?.code === "OWNED_CART_NOT_FOUND") {
      return null
    }

    throw error
  }
}
