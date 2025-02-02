import { products } from "@wix/stores"
import Link from "next/link"
import WixImage from "./WixImage"
import { Badge } from "./ui/badge"
import DiscountBadge from "./DiscountBadge"
import { formatCurrency } from "@/lib/utils"

interface ProductCardProps {
  product: products.Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.media?.mainMedia?.image

  return (
    <Link href={`/products/${product.slug}`} className="group relative block">
      <div className="relative overflow-hidden">
        <WixImage
          mediaIdentifier={mainImage?.url}
          alt={mainImage?.altText}
          width={700}
          height={700}
          className="transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-3 right-3 flex flex-wrap items-center gap-2">
          {product.ribbon && <Badge>{product.ribbon}</Badge>}
          {product.discount && <DiscountBadge data={product.discount} />}

          <Badge variant="secondary">{getFormattedPrice(product)}</Badge>
        </div>
      </div>
      <div className="space-y-3 py-3">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <div className="prose-sm line-clamp-5 md:prose">
          {product.description}
        </div>
      </div>
    </Link>
  )
}

function getFormattedPrice(product: products.Product) {
  const minPrice = product.priceRange?.minValue
  const maxPrice = product.priceRange?.maxValue

  if (minPrice && maxPrice && minPrice !== maxPrice) {
    return `from ${formatCurrency(minPrice, product.priceData?.currency)}`
  } else {
    return (
      product.priceData?.formatted?.discountedPrice ||
      product.priceData?.formatted?.price ||
      "n/a"
    )
  }
}
