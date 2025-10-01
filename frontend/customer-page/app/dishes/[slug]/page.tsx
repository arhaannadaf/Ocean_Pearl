import { dishes } from "@/dishes_data/dishes"
import DishPageClient from "./dish-page-client"

export default function DishPage({ params }: { params: { slug: string } }) {
  return <DishPageClient params={params} />
}

export async function generateStaticParams() {
  return dishes.map((dish) => ({
    slug: dish.slug,
  }))
}
