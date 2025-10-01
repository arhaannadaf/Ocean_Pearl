import Header from "@/components/header"
import Footer from "@/components/footer"
import MenuHeroSection from "@/components/menu-hero-section"
import MenuSection from "@/components/menu-section"
import WorkingHoursSection from "@/components/working-hours-section"
import Loader from "@/components/loader";
import SearchBar from "@/components/searchbox"


const MenuItems = [
{'id': 1, 'name': 'Tomato Soup', 'slug': 'tomato-soup'},
{'id': 2, 'name': 'Mushroom Soup', 'slug': 'mushroom-soup'},
{'id': 3, 'name': 'Chicken Soup', 'slug': 'chicken-soup'},
{'id': 4, 'name': 'Chicken Biryani', 'slug': 'chicken-biryani'},
{'id': 5, 'name': 'Mutton Biryani', 'slug': 'mutton-biryani'},
{'id': 6, 'name': 'Grilled Salmon', 'slug': 'grilled-salmon'},
{'id': 7, 'name': 'Butter Chicken', 'slug': 'butter-chicken'},
{'id': 8, 'name': 'Paneer Butter Masala', 'slug': 'paneer-butter-masala'},
{'id': 9, 'name': 'Palak Paneer', 'slug': 'palak-paneer'},
{'id': 10, 'name': 'Pepperoni Pizza', 'slug': 'pepperoni-pizza'},
{'id': 11, 'name': 'Margherita Pizza', 'slug': 'margherita-pizza'},
{'id': 12, 'name': 'Veggie Burger', 'slug': 'veggie-burger'},
{'id': 13, 'name': 'Gulab Jamun', 'slug': 'gulab-jamun'},
{'id': 14, 'name': 'Rasgulla', 'slug': 'rasgulla'},
{'id': 15, 'name': 'Tiramisu', 'slug': 'tiramisu'},
{'id': 16, 'name': 'Ice Cream Sundae', 'slug': 'ice-cream-sundae'},
{'id': 17, 'name': 'French Fries', 'slug': 'french-fries'},
{'id': 18, 'name': 'Veg Hakka Noodles', 'slug': 'veg-hakka-noodles'},
{'id': 19, 'name': 'Chicken Hakka Noodles', 'slug': 'chicken-hakka-noodles'},
{'id': 20, 'name': 'Veg Fried Rice', 'slug': 'veg-fried-rice'},
{'id': 21, 'name': 'Chicken Fried Rice', 'slug': 'chicken-fried-rice'},
{'id': 22, 'name': 'Paneer Tikka', 'slug': 'paneer-tikka'},
{'id': 23, 'name': 'Chicken Tikka', 'slug': 'chicken-tikka'},
{'id': 24, 'name': 'Samosa', 'slug': 'samosa'},
{'id': 25, 'name': 'Spring Rolls', 'slug': 'spring-rolls'},
{'id': 26, 'name': 'Pasta Alfredo', 'slug': 'pasta-alfredo'},
{'id': 27, 'name': 'Pasta Arrabbiata', 'slug': 'pasta-arrabbiata'},
{'id': 28, 'name': 'Caesar Salad', 'slug': 'caesar-salad'},
{'id': 29, 'name': 'Greek Salad', 'slug': 'greek-salad'},
{'id': 30, 'name': 'Shahi Paneer', 'slug': 'shahi-paneer'},
{'id': 31, 'name': 'Mutton Rogan Josh', 'slug': 'mutton-rogan-josh'},
{'id': 32, 'name': 'Fish Curry', 'slug': 'fish-curry'},
{'id': 33, 'name': 'Dal Tadka', 'slug': 'dal-tadka'},
{'id': 34, 'name': 'Rajma Chawal', 'slug': 'rajma-chawal'},
{'id': 35, 'name': 'Chole Bhature', 'slug': 'chole-bhature'},
{'id': 36, 'name': 'Pav Bhaji', 'slug': 'pav-bhaji'},
{'id': 37, 'name': 'Biryani Veg', 'slug': 'biryani-veg'},
{'id': 38, 'name': 'Mutton Biryani', 'slug': 'mutton-biryani'},
{'id': 39, 'name': 'Masala Dosa', 'slug': 'masala-dosa'},
{'id': 40, 'name': 'Idli Sambar', 'slug': 'idli-sambar'},
{'id': 41, 'name': 'Vada Sambar', 'slug': 'vada-sambar'},
{'id': 42, 'name': 'Medu Vada', 'slug': 'medu-vada'},
{'id': 43, 'name': 'Onion Uttapam', 'slug': 'onion-uttapam'},
{'id': 44, 'name': 'Hyderabadi Haleem', 'slug': 'hyderabadi-haleem'},
{'id': 45, 'name': 'Egg Curry', 'slug': 'egg-curry'},
{'id': 46, 'name': 'Kadai Paneer', 'slug': 'kadai-paneer'},
{'id': 47, 'name': 'Bhindi Masala', 'slug': 'bhindi-masala'},
{'id': 48, 'name': 'Baingan Bharta', 'slug': 'baingan-bharta'},
{'id': 49, 'name': 'Aloo Gobi', 'slug': 'aloo-gobi'},
{'id': 50, 'name': 'Jeera Rice', 'slug': 'jeera-rice'},
{'id': 51, 'name': 'Tandoori Chicken', 'slug': 'tandoori-chicken'},
{'id': 52, 'name': 'Chicken Tikka Masala', 'slug': 'chicken-tikka-masala'},
{'id': 53, 'name': 'Veg Pulao', 'slug': 'veg-pulao'},
{'id': 54, 'name': 'Egg Biryani', 'slug': 'egg-biryani'},
{'id': 55, 'name': 'Vegetable Korma', 'slug': 'vegetable-korma'},
{'id': 56, 'name': 'Dal Makhani', 'slug': 'dal-makhani'},
{'id': 57, 'name': 'Prawn Masala', 'slug': 'prawn-masala'},
{'id': 58, 'name': 'Crab Curry', 'slug': 'crab-curry'},
{'id': 59, 'name': 'Veg Manchurian', 'slug': 'veg-manchurian'},
{'id': 60, 'name': 'Chicken Manchurian', 'slug': 'chicken-manchurian'},
{'id': 61, 'name': 'Veg Spring Rolls', 'slug': 'veg-spring-rolls'},
{'id': 62, 'name': 'Chicken Spring Rolls', 'slug': 'chicken-spring-rolls'},
{'id': 63, 'name': 'Chili Paneer', 'slug': 'chili-paneer'},
{'id': 64, 'name': 'Chili Chicken', 'slug': 'chili-chicken'},
{'id': 65, 'name': 'Schezwan Fried Rice', 'slug': 'schezwan-fried-rice'},
{'id': 66, 'name': 'Schezwan Chicken Fried Rice', 'slug': 'schezwan-chicken-fried-rice'},
{'id': 67, 'name': 'Veg Schezwan Noodles', 'slug': 'veg-schezwan-noodles'},
{'id': 68, 'name': 'Chicken Schezwan Noodles', 'slug': 'chicken-schezwan-noodles'},
{'id': 69, 'name': 'Hot & Sour Soup (Veg)', 'slug': 'hot-sour-soup-veg'},
{'id': 70, 'name': 'Hot & Sour Soup (Chicken)', 'slug': 'hot-sour-soup-chicken'},
{'id': 71, 'name': 'Sweet Corn Soup (Veg)', 'slug': 'sweet-corn-soup-veg'},
{'id': 72, 'name': 'Sweet Corn Soup (Chicken)', 'slug': 'sweet-corn-soup-chicken'},
{'id': 73, 'name': 'Veg Clear Soup', 'slug': 'veg-clear-soup'},
{'id': 74, 'name': 'Chicken Clear Soup', 'slug': 'chicken-clear-soup'},
{'id': 75, 'name': 'Veg Momos', 'slug': 'veg-momos'},
{'id': 76, 'name': 'Chicken Momos', 'slug': 'chicken-momos'},
{'id': 77, 'name': 'Paneer Momos', 'slug': 'paneer-momos'},
{'id': 78, 'name': 'Fried Momos (Veg)', 'slug': 'fried-momos-veg'},
{'id': 79, 'name': 'Fried Momos (Chicken)', 'slug': 'fried-momos-chicken'},
{'id': 80, 'name': 'Tandoori Momos', 'slug': 'tandoori-momos'},
{'id': 81, 'name': 'Biryani (Veg)', 'slug': 'biryani-veg'},
{'id': 82, 'name': 'Fish Curry (Goan)', 'slug': 'fish-curry-goan'},
{'id': 83, 'name': 'Malai Kofta', 'slug': 'malai-kofta'},
{'id': 84, 'name': 'Seekh Kebab', 'slug': 'seekh-kebab'},
{'id': 85, 'name': 'Veg Thali', 'slug': 'veg-thali'},
{'id': 86, 'name': 'Non-Veg Thali', 'slug': 'non-veg-thali'},
{'id': 87, 'name': 'Uttapam', 'slug': 'uttapam'},
{'id': 88, 'name': 'Vada Pav', 'slug': 'vada-pav'},
{'id': 89, 'name': 'Misal Pav', 'slug': 'misal-pav'},
{'id': 90, 'name': 'Pani Puri', 'slug': 'pani-puri'},
{'id': 91, 'name': 'Chana Masala', 'slug': 'chana-masala'},
{'id': 92, 'name': 'Kadhi Pakora', 'slug': 'kadhi-pakora'},
{'id': 93, 'name': 'Matar Paneer', 'slug': 'matar-paneer'},
{'id': 94, 'name': 'Butter Naan', 'slug': 'butter-naan'},
{'id': 95, 'name': 'Garlic Naan', 'slug': 'garlic-naan'},
{'id': 96, 'name': 'Club Sandwich', 'slug': 'club-sandwich'},
{'id': 97, 'name': 'Grilled Cheese Sandwich', 'slug': 'grilled-cheese-sandwich'},
{'id': 98, 'name': 'Paneer Kathi Roll', 'slug': 'paneer-kathi-roll'},
{'id': 99, 'name': 'Chicken Kathi Roll', 'slug': 'chicken-kathi-roll'},
{'id': 100, 'name': 'Veg Wrap', 'slug': 'veg-wrap'},
{'id': 101, 'name': 'Veggie Sub', 'slug': 'veggie-sub'},
{'id': 102, 'name': 'Chicken Sub', 'slug': 'chicken-sub'},
{'id': 103, 'name': 'Paneer Frankie', 'slug': 'paneer-frankie'},
{'id': 104, 'name': 'Chicken Frankie', 'slug': 'chicken-frankie'},
{'id': 105, 'name': 'Paneer Burger', 'slug': 'paneer-burger'},
{'id': 106, 'name': 'Chicken Burger', 'slug': 'chicken-burger'},
{'id': 107, 'name': 'Paneer Shawarma', 'slug': 'paneer-shawarma'},
{'id': 108, 'name': 'Chicken Shawarma', 'slug': 'chicken-shawarma'},
{'id': 109, 'name': 'Cheese Sandwich', 'slug': 'cheese-sandwich'},
{'id': 110, 'name': 'Paneer Sandwich', 'slug': 'paneer-sandwich'},
{'id': 111, 'name': 'Egg Sandwich', 'slug': 'egg-sandwich'},
{'id': 112, 'name': 'Paneer Parantha', 'slug': 'paneer-parantha'},
{'id': 113, 'name': 'Aloo Parantha', 'slug': 'aloo-parantha'},
{'id': 114, 'name': 'Veg Frankie Roll', 'slug': 'veg-frankie-roll'},
{'id': 115, 'name': 'Chicken Kathi Roll', 'slug': 'chicken-kathi-roll'},
{'id': 116, 'name': 'Paneer Bhurji Sandwich', 'slug': 'paneer-bhurji-sandwich'},
{'id': 117, 'name': 'Egg Mayo Sandwich', 'slug': 'egg-mayo-sandwich'},
{'id': 118, 'name': 'Tuna Melt Sandwich', 'slug': 'tuna-melt-sandwich'},
{'id': 119, 'name': 'Veg Paneer Wrap', 'slug': 'veg-paneer-wrap'},
{'id': 120, 'name': 'Peri Peri Chicken Wings', 'slug': 'peri-peri-chicken-wings'},
{'id': 121, 'name': 'Cheese Garlic Bread', 'slug': 'cheese-garlic-bread'},
{'id': 122, 'name': 'Falafel Wrap', 'slug': 'falafel-wrap'},
{'id': 123, 'name': 'Chicken Caesar Wrap', 'slug': 'chicken-caesar-wrap'},
{'id': 124, 'name': 'Grilled Veg Panini', 'slug': 'grilled-veg-panini'},
{'id': 125, 'name': 'BBQ Chicken Pizza Sandwich', 'slug': 'bbq-chicken-pizza-sandwich'},
{'id': 126, 'name': 'Corn & Cheese Sandwich', 'slug': 'corn-cheese-sandwich'},
{'id': 127, 'name': 'Mutton Seekh Kebab Roll', 'slug': 'mutton-seekh-kebab-roll'},
{'id': 128, 'name': 'Paneer Tandoori Wrap', 'slug': 'paneer-tandoori-wrap'},
{'id': 129, 'name': 'Smoked Chicken Sub', 'slug': 'smoked-chicken-sub'},
{'id': 130, 'name': 'Veggie Delight Sub', 'slug': 'veggie-delight-sub'},
{'id': 131, 'name': 'Avocado Toast', 'slug': 'avocado-toast'},
{'id': 132, 'name': 'Club Chicken Sandwich', 'slug': 'club-chicken-sandwich'},
];
export default function MenuPage() {
  return (
    <>
     <Loader />
    <main className="min-h-screen">
      <Header />
      <MenuHeroSection />
      
      {/* Search Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <SearchBar items={MenuItems} />
          </div>

          {/* Starters Section */}
          <MenuSection
            title="Starters"
            subtitle="Begin your meal with delightful flavors, A perfect start to your dining experience."
            items={[
 
              { id: 1, slug: "tomato-soup", name: "Tomato Soup", price: 180, description: "Smooth, tangy tomato soup flavored with herbs.", image: "/static/assets/Tomato_Soup.jpg" },
  { id: 2, slug: "mushroom-soup", name: "Mushroom Soup", price: 200, description: "Creamy and earthy mushroom soup with a smooth finish.", image: "/static/assets/Mashroom_Soup.jpg" },
  { id: 3, slug: "chicken-soup", name: "Chicken Soup", price: 220, description: "A warm, hearty bowl of chicken simmered with herbs and spices, perfect comfort food.", image: "/static/assets/Chicken_Soup.jpg" },
  { id: 4, slug: "french-fries", name: "French Fries", price: 120, description: "Golden and crispy potato fries, lightly salted for the perfect snack.", image: "/static/assets/French_Fries.jpg" },
  { id: 5, slug: "paneer-tikka", name: "Paneer Tikka", price: 280, description: "Paneer cubes marinated in spices and grilled smoky.", image: "/static/assets/Paneer_Tikka.jpg" },
  { id: 6, slug: "chicken-tikka", name: "Chicken Tikka", price: 320, description: "Succulent chicken marinated in yogurt and spices, grilled to smoky perfection.", image: "/static/assets/Chicken_Tikka.jpg" },
  { id: 7, slug: "samosa", name: "Samosa", price: 100, description: "Golden-fried pastry stuffed with spiced potatoes and peas.", image: "/static/assets/Samosa.jpg" },
  { id: 8, slug: "egg-spring-rolls", name: "Egg Spring Rolls", price: 220, description: "Crispy rolls filled with Egg.", image: "/static/assets/Spring_Rolls.jpg" },
  { id: 9, slug: "veg-manchurian", name: "Veg Manchurian", price: 240, description: "Crispy vegetable balls cooked in a spicy, tangy sauce.", image: "/static/assets/Veg_Manchurian.jpg" },
  { id: 10, slug: "chicken-manchurian", name: "Chicken Manchurian", price: 280, description: "Crispy chicken balls tossed in a spicy, tangy Indo-Chinese sauce.", image: "/static/assets/Chicken_Manchurian.jpg" },
  { id: 11, slug: "veg-spring-rolls", name: "Veg Spring Rolls", price: 220, description: "Crispy rolls filled with seasoned vegetables.", image: "/static/assets/Veg_Spring_Roll.jpg" },
  { id: 12, slug: "chicken-spring-rolls", name: "Chicken Spring Rolls", price: 260, description: "Crispy rolls stuffed with seasoned chicken, fried golden brown.", image: "/static/assets/Chicken_Spring_Roll.jpg" },
  { id: 13, slug: "chili-paneer", name: "Chili Paneer", price: 280, description: "Paneer cubes tossed with capsicum and chili sauce for a zesty flavor.", image: "/static/assets/Chilli_Paneer.jpg" },
  { id: 14, slug: "chili-chicken", name: "Chili Chicken", price: 340, description: "A fiery Indo-Chinese favorite with chicken tossed in spicy, tangy sauce.", image: "/static/assets/Chilli_Chicken.jpg" },
  { id: 15, slug: "hot-and-sour-soup-veg", name: "Hot & Sour Soup (Veg)", price: 160, description: "Spicy, tangy soup loaded with fresh vegetables.", image: "/static/assets/Hot_n_Sour_Soup_Veg.jpg" },
  { id: 16, slug: "hot-and-sour-soup-chicken", name: "Hot & Sour Soup (Chicken)", price: 200, description: "Tangy, spicy soup with chicken and bold flavors.", image: "/static/assets/Hot_n_Sour_Soup_Non_Veg.jpg" },
  { id: 17, slug: "sweet-corn-soup-veg", name: "Sweet Corn Soup (Veg)", price: 140, description: "Comforting sweet corn soup with vegetables.", image: "/static/assets/Sweet_Corn_Soup.jpg" },
  { id: 18, slug: "sweet-corn-soup-chicken", name: "Sweet Corn Soup (Chicken)", price: 180, description: "Light creamy soup with chicken and sweet corn.", image: "/static/assets/Chicken_Corn_Soup.png" },
  { id: 19, slug: "veg-clear-soup", name: "Veg Clear Soup", price: 120, description: "A light and healthy broth made with fresh seasonal vegetables.", image: "/static/assets/Veg_Clear_Soup.JPG" },
  { id: 20, slug: "chicken-clear-soup", name: "Chicken Clear Soup", price: 160, description: "Light and nourishing soup with tender chicken pieces and a clean, delicate broth.", image: "/static/assets/Chicken_Clear_Soup.jpg" },
  { id: 21, slug: "veg-momos", name: "Veg Momos", price: 180, description: "Steamed dumplings stuffed with mixed vegetables.", image: "/static/assets/Fried_Veg_Momo.jpg" },
  { id: 22, slug: "chicken-momos", name: "Chicken Momos", price: 220, description: "Crispy fried dumplings filled with spiced chicken.", image: "/static/assets/Chicken_Momo.jpg" },
  { id: 23, slug: "paneer-momos", name: "Paneer Momos", price: 200, description: "Steamed dumplings filled with paneer and spices.", image: "/static/assets/Paneer_Momo.jpg" },
  { id: 24, slug: "fried-momos-veg", name: "Fried Momos (Veg)", price: 200, description: "Crunchy golden momos with a savory vegetable filling.", image: "/static/assets/Fried_Veg_Momo.jpg" },
  { id: 25, slug: "fried-momos-chicken", name: "Fried Momos (Chicken)", price: 240, description: "Crispy fried dumplings filled with spiced chicken.", image: "/static/assets/Fried_Chicken_Momo.jpeg" },
  { id: 26, slug: "tandoori-momos", name: "Tandoori Momos", price: 260, description: "Spicy dumplings roasted in the tandoor for smoky flavor.", image: "/static/assets/Tandoor_Chicken_Momo.jpg" },
  { id: 27, slug: "seekh-kebab", name: "Seekh Kebab", price: 400, description: "Minced meat skewers grilled with spices.", image: "/static/assets/Mutton_Seekh_Kabab_Roll.jpg" },
            ]}
          />
 
          {/* Non Veg Meal Section */}
          <MenuSection
            sectionNumber="02"
            title="Non Veg Meal"
            subtitle="Tender cuts cooked with bold spices. Authentic taste of tradition."
            items={[
              
              { id: 1, slug: "mutton-rogan-josh", name: "Mutton Rogan Josh", price: 520, description: "Kashmiri curry with tender mutton slow-cooked in aromatic spices.", image: "/static/assets/Mutton_Rogan_Josh.png" },
  { id: 2, slug: "fish-curry", name: "Fish Curry", price: 400, description: "Tender fish simmered in a spicy, tangy curry with coastal spices.", image: "/static/assets/Fish_Curry.jpg" },
  { id: 3, slug: "hyderabadi-haleem", name: "Hyderabadi Haleem", price: 500, description: "A slow-cooked dish of meat, lentils, and wheat, creamy and flavorful.", image: "/static/assets/Hyderabad_Haleem.jpg" },
  { id: 4, slug: "egg-curry", name: "Egg Curry", price: 280, description: "Boiled eggs simmered in a spicy onion-tomato gravy with bold flavors.", image: "/static/assets/Egg_Curry.jpg" },
  { id: 5, slug: "tandoori-chicken", name: "Tandoori Chicken", price: 460, description: "Classic clay-oven roasted chicken marinated in yogurt and spices.", image: "/static/assets/Tandoor_Chicken.jpg" },
  { id: 6, slug: "prawn-masala", name: "Prawn Masala", price: 460, description: "Spicy prawns cooked in rich, tangy masala.", image: "/static/assets/Prawns_Masala.jpg" },
  { id: 7, slug: "crab-curry", name: "Crab Curry", price: 520, description: "Fresh crab simmered in a spicy, tangy curry bursting with coastal flavors.", image: "/static/assets/Crab_Curry.jpg" },]}
          />
<MenuSection
            title="Main Course"
            items={[
{ id: 1, slug: "fish-curry-goan", name: "Fish Curry (Goan)", price: 380, description: "Coconut-based Goan curry with a perfect balance of spice and tang.", image: "/static/assets/Fish_Curry_Goan.jpg" },
  { id: 2, slug: "malai-kofta", name: "Malai Kofta", price: 340, description: "Fried paneer-potato dumplings simmered in a creamy cashew sauce.", image: "/static/assets/Malai_Kofta.jpg" },
  { id: 3, slug: "chana-masala", name: "Chana Masala", price: 260, description: "Spicy chickpea curry simmered in a rich onion-tomato gravy, best enjoyed with rice or bread.", image: "/static/assets/Chana_Masala.jpg" },
  { id: 4, slug: "kadhi-pakora", name: "Kadhi Pakora", price: 300, description: "Tangy yogurt curry with crispy gram flour fritters.", image: "/static/assets/Kadhi_Pakora.jpg" },
  { id: 5, slug: "matar-paneer", name: "Matar Paneer", price: 340, description: "Cottage cheese and peas cooked in spiced tomato gravy.", image: "/static/assets/Matar_Paneer.jpg" },
  { id: 6, slug: "butter-chicken", name: "Butter Chicken", price: 495, description: "Juicy chicken simmered in a creamy tomato-based gravy, rich with butter and subtle spices.", image: "/static/assets/Butter_Chicken.jpg" },
            ]}
            />
<MenuSection 
            title="Roti & Bread"
            items={[
 { id: 1, slug: "butter-naan", name: "Butter Naan", price: 60, description: "Soft, fluffy naan brushed with butter, perfect for pairing with curries.", image: "/static/assets/Butter_Naan.jpg" },
  { id: 2, slug: "garlic-naan", name: "Garlic Naan", price: 70, description: "Fluffy naan infused with garlic butter, fresh from the tandoor.", image: "/static/assets/Cheese_Garlic_Naan.jpg" },
  { id: 3, slug: "paneer-parantha", name: "Paneer Parantha", price: 90, description: "Indian flatbread stuffed with spiced paneer filling.", image: "/static/assets/Paneer_Parantha.jpg" },
  { id: 4, slug: "aloo-parantha", name: "Aloo Parantha", price: 80, description: "Classic North Indian flatbread stuffed with spiced mashed potatoes, served hot with butter or yogurt.", image: "/static/assets/Aloo_Parantha.jpg" },
  { id: 5, slug: "cheese-garlic-bread", name: "Cheese Garlic Bread", price: 110, description: "Warm bread loaded with cheese and garlic butter, baked until golden and gooey.", image: "/static/assets/Cheese_Garlic_Bread.jpg" },]}
            />

<MenuSection
            title="Veg Meal"
            items={[
 { id: 1, slug: "paneer-butter-masala", name: "Paneer Butter Masala", price: 380, description: "Paneer cubes simmered in a creamy, buttery tomato gravy.", image: "/static/assets/Paneer_Butter_Masala.jpg" },
  { id: 2, slug: "palak-paneer", name: "Palak Paneer", price: 360, description: "Spinach-based curry with soft paneer cubes, wholesome and flavorful.", image: "/static/assets/Palak_Panner.jpg" },
  { id: 3, slug: "shahi-paneer", name: "Shahi Paneer", price: 400, description: "Royal paneer curry simmered in creamy cashew-based gravy.", image: "/static/assets/Shahi_Paneer.jpg" },
  { id: 4, slug: "dal-tadka", name: "Dal Tadka", price: 260, description: "Yellow lentils tempered with ghee, garlic, and cumin for a homestyle taste.", image: "/static/assets/Dal_Tadka.jpg" },
  { id: 5, slug: "rajma-chawal", name: "Rajma Chawal", price: 300, description: "Red kidney beans curry served with steamed rice.", image: "/static/assets/Rajma_Chawal.jpg" },
  { id: 6, slug: "chole-bhature", name: "Chole Bhature", price: 280, description: "Spicy chickpea curry served with fluffy deep-fried bread, a street-food classic.", image: "/static/assets/Chole_Bhature.jpg" },
  { id: 7, slug: "pav-bhaji", name: "Pav Bhaji", price: 220, description: "Spicy mashed vegetables served with buttered pav bread.", image: "/static/assets/Pav_Bhaji.jpg" },
  { id: 8, slug: "masala-dosa", name: "Masala Dosa", price: 180, description: "Crispy rice crepe stuffed with spiced potato filling.", image: "/static/assets/Masala_Dosa.jpg" },
  { id: 9, slug: "idli-sambar", name: "Idli Sambar", price: 160, description: "Soft rice cakes served with tangy, spiced lentil soup.", image: "/static/assets/Idli_Sambhar.jpg" },
  { id: 10, slug: "vada-sambar", name: "Vada Sambar", price: 170, description: "Crispy fried lentil fritters served with tangy sambar.", image: "/static/assets/Sambar_Vada.jpg" },
  { id: 11, slug: "medu-vada", name: "Medu Vada", price: 150, description: "Crispy South Indian lentil fritters shaped like doughnuts.", image: "/static/assets/Medu_Vada.jpg" },
  { id: 12, slug: "onion-uttapam", name: "Onion Uttapam", price: 160, description: "Thick rice pancake topped with onions, chilies, and spices.", image: "/static/assets/Onion_Uttampam.jpg" },
  { id: 13, slug: "kadai-paneer", name: "Kadai Paneer", price: 360, description: "Paneer cubes stir-fried with onions, peppers, and spices in a kadai.", image: "/static/assets/Kadai_Paneer.jpg" },
  { id: 14, slug: "bhindi-masala", name: "Bhindi Masala", price: 240, description: "Tender okra stir-fried with onions, tomatoes, and aromatic spices, creating a flavorful and homestyle North Indian classic.", image: "/static/assets/Bhindi_Masala.jpg" },
  { id: 15, slug: "baingan-bharta", name: "Baingan Bharta", price: 260, description: "Smoky mashed eggplant sautéed with onions, tomatoes, and spices for a rustic, earthy taste.", image: "/static/assets/Baigan_Bharta.jpg" },
  { id: 16, slug: "aloo-gobi", name: "Aloo Gobi", price: 220, description: "A comforting vegetarian dish made with potatoes and cauliflower, gently cooked with traditional spices for homely flavors.", image: "/static/assets/Aloo_Gobi.jpg" },
  { id: 17, slug: "veg-korma", name: "Veg Korma", price: 320, description: "A rich and creamy curry made with mixed vegetables,simmered in a cashew-coconut gravy .", image: "/static/assets/Veg_Korma.jpg" },
  { id: 18, slug: "dal-makhani", name: "Dal Makhani", price: 340, description: "Black lentils slow-cooked with butter and cream, rich and flavorful.", image: "/static/assets/Dal_Makhani.jpg" }, ]}
/>
            <MenuSection
            title = "Rice and Noodles"
            subtitle=""
            items={[
             { id: 1, slug: "veg-hakka-noodles", name: "Veg Hakka Noodles", price: 220, description: "Noodles tossed with vegetables and soy for street-style flavor.", image: "/static/assets/Veg_Hakka_Noodles.jpg" },
  { id: 2, slug: "chicken-hakka-noodles", name: "Chicken Hakka Noodles", price: 260, description: "Stir-fried noodles with chicken, crunchy veggies, and soy sauce for a classic Indo-Chinese flavor.", image: "/static/assets/Chicken_Hakka_Noodles.jpg" },
  { id: 3, slug: "veg-fried-rice", name: "Veg Fried Rice", price: 200, description: "Stir-fried rice with vegetables and light soy sauce.", image: "/static/assets/Veg_Fried_Rice.jpg" },
  { id: 4, slug: "chicken-fried-rice", name: "Chicken Fried Rice", price: 240, description: "Wok-tossed rice with chicken, vegetables, and savory sauces for a hearty meal.", image: "/static/assets/Chicken_Fried_Rice.jpg" },
  { id: 5, slug: "jeera-rice", name: "Jeera Rice", price: 180, description: "Fluffy basmati rice tempered with roasted cumin seeds.", image: "/static/assets/Jeera_Rice.jpg" },
  { id: 6, slug: "veg-kaju-pulao", name: "Veg Kaju Pulao", price: 240, description: "Basmati rice cooked with vegetables and light spices.", image: "/static/assets/Veg_Kaju_Pulao.JPG" },
  { id: 7, slug: "schezwan-chicken-fried-rice", name: "Schezwan Chicken Fried Rice", price: 280, description: "Fiery fried rice tossed with Schezwan sauce, chicken, and bold flavors.", image: "/static/assets/Shezwan_Fried_Rice_Chicken.png" },
  { id: 8, slug: "veg-shezwan-noodles", name: "Veg Shezwan Noodles", price: 240, description: "Spicy noodles tossed with vegetables and Schezwan sauce.", image: "/static/assets/Veg_Shezwan_Noodles.jpg" },
  { id: 9, slug: "chicken-schezwan-noodles", name: "Chicken Schezwan Noodles", price: 280, description: "Spicy noodles tossed with chicken and Schezwan sauce.", image: "/static/assets/Chicken_Shezwan_Noodles.jpg" },]}
            />
          {/* Special Dishes Section */}
          <MenuSection
            title="Special Dishes"
            items={[
             { id: 1, slug: "fish-curry-goan", name: "Fish Curry (Goan)", price: 380, description: "Coconut-based Goan curry with tangy, spicy flavors.", image: "/static/assets/Fish_Curry_Goan.jpg" },
  { id: 2, slug: "hyderabadi-haleem", name: "Hyderabadi Haleem", price: 500, description: "A slow-cooked blend of wheat, lentils, and meat with rich flavors.", image: "/static/assets/Hyderabad_Haleem.jpg" },
  { id: 3, slug: "butter-chicken", name: "Butter Chicken", price: 495, description: "Juicy chicken simmered in a buttery tomato gravy, rich, creamy, and perfectly spiced.", image: "/static/assets/Butter_Chicken.jpg" },
  { id: 4, slug: "mutton-biryani", name: "Mutton Biryani", price: 480, description: "Slow-cooked biryani with tender mutton, saffron, and fragrant spices.", image: "static/assets/Mutton_Biryani.jpeg" },
 ]}
          />

          <MenuSection
          title="Salads and Thali"
          subtitle=""
          items={[
{ id: 1, slug: "veg-thali", name: "Veg Thali", price: 360, description: "A complete platter of traditional vegetarian dishes.", image: "/static/assets/Veg_Thali.jpg" },
  { id: 2, slug: "non-veg-thali", name: "Non-Veg Thali", price: 440, description: "A wholesome platter featuring a variety of non-vegetarian dishes.", image: "/static/assets/Non_Veg_Thali.jpg" },
  { id: 3, slug: "chicken-biryani", name: "Chicken Biryani", price: 440, description: "Long-grain rice layered with juicy chicken and aromatic spices, slow-cooked for a royal meal.", image: "/static/assets/Chicken_Biryani.jpg" },
  { id: 4, slug: "mutton-biryani", name: "Mutton Biryani", price: 480, description: "Slow-cooked biryani with tender mutton, saffron, and fragrant spices.", image: "/static/assets/Mutton_Biryani.jpeg" },
  { id: 5, slug: "briyani-veg", name: "Briyani Veg", price: 320, description: "Aromatic basmati rice cooked with seasonal vegetables and spices for a flavorful vegetarian feast.", image: "/static/assets/Veg_Briyani.jpg" },
  { id: 6, slug: "egg-biryani", name: "Egg Biryani", price: 340, description: "Flavored rice layered with boiled eggs and aromatic spices for a wholesome meal.", image: "/static/assets/Egg_Biryani.jpeg" },
  { id: 7, slug: "grilled-salmon", name: "Grilled Salmon", price: 500, description: "Fresh salmon grilled to perfection with smoky char and tender flesh.", image: "/static/assets/Grilled_Salmon.jpg" },
  { id: 8, slug: "caesar-salad", name: "Caesar Salad", price: 280, description: "Crisp lettuce, crunchy croutons, parmesan, and creamy Caesar dressing for a refreshing, classic salad.", image: "/static/assets/Caesar_Salad.jpg" },
  { id: 9, slug: "greek-salad", name: "Greek Salad", price: 260, description: "A refreshing mix of cucumbers, olives, feta, and olive oil for a healthy bite.", image: "/static/assets/Greek_Salad.jpg" }, ]}
          />
          <MenuSection
          title="Snacks"
          subtitle=""
          items={[
 { id: 1, slug: "veg-frankie-roll", name: "Veg Frankie Roll", price: 80, description: "Spiced vegetable filling wrapped in soft flatbread.", image: "/static/assets/Veg_Frankie.jpg" },
  { id: 2, slug: "paneer-bhurji-sandwich", name: "Paneer Bhurji Sandwich", price: 75, description: "Spiced crumbled paneer stuffed between bread slices.", image: "/static/assets/Paneer_Bhurji_Sandwich.jpg" },
  { id: 3, slug: "egg-sandwich", name: "Egg Sandwich", price: 110, description: "Boiled eggs with seasoning tucked between slices of soft bread.", image: "/static/assets/Egg_Sandwich.jpg" },
  { id: 4, slug: "tuna-melt-sandwich", name: "Tuna Melt Sandwich", price: 140, description: "Sandwich with tuna and melted cheese grilled golden.", image: "/static/assets/Tuna_Sandwich.jpg" },
  { id: 5, slug: "grilled-veg-panini", name: "Grilled Veg Panini", price: 140, description: "Italian-style grilled sandwich with fresh vegetables and melted cheese.", image: "/static/assets/Veg_Grilled_Panini.jpg" },
  { id: 6, slug: "peri-peri-chicken-wings", name: "Peri Peri Chicken Wings", price: 180, description: "Fiery chicken wings marinated in peri-peri spices.", image: "/static/assets/Peri_Peri_Chicken_Wings.jpg" },
  { id: 7, slug: "falafel-wrap", name: "Falafel Wrap", price: 130, description: "Crispy chickpea fritters wrapped in flatbread with fresh veggies and sauce.", image: "/static/assets/Falafel_Roll.jpg" },
  { id: 8, slug: "chicken-panini", name: "Chicken Panini", price: 140, description: "Triple-layer sandwich with juicy chicken, sauces, and crunchy fillings.", image: "/static/assets/Chicken_Panini.jpeg" },
  { id: 9, slug: "bbq-chicken-pizza-sandwich", name: "BBQ Chicken Pizza Sandwich", price: 160, description: "A fusion favorite, loaded with smoky chicken, and melted cheese between toasted bread.", image: "/static/assets/BBQ_Chicken_Sandwich.jpg" },
  { id: 10, slug: "corn-and-cheese-sandwich", name: "Corn & Cheese Sandwich", price: 90, description: "Creamy corn and melted cheese sandwiched inside toasted bread.", image: "/static/assets/Corn_Chessy_Sandwich.jpg" },
  { id: 11, slug: "mutton-seekh-kebab-roll", name: "Mutton Seekh Kebab Roll", price: 170, description: "Spicy minced mutton skewers wrapped in a soft roll.", image: "/static/assets/Mutton_Seekh_Kabab_Roll.jpg" },
  { id: 12, slug: "paneer-sandwich", name: "Paneer Sandwich", price: 120, description: "Paneer slices layered inside soft bread with seasonings.", image: "/static/assets/Paneer_Sandwich.jpeg" },
  { id: 13, slug: "smoked-chicken-sub", name: "Smoked Chicken Sub", price: 160, description: "Sub sandwich with smoky chicken and sauces.", image: "/static/assets/Smoked_Chicken_Sub.jpg" },
  { id: 14, slug: "veggie-delight-sub", name: "Veggie Delight Sub", price: 120, description: "Sub sandwich loaded with crunchy garden-fresh vegetables.", image: "/static/assets/Veggie_Delight_Sub.jpg" },
  { id: 15, slug: "club-sandwich", name: "Club Sandwich", price: 160, description: "Triple-decker sandwich packed with vegetables, cheese, and sauces.", image: "/static/assets/Club_Sandwich.jpg" },]}
          />
          <MenuSection
          title="Desserts"
          subtitle=""
          items={[
 { id: 1, slug: "veggie-burger", name: "Veggie Burger", price: 250, description: "A patty of fresh vegetables inside a bun with toppings.", image: "/static/assets/Veggie_Burger.jpg" },
  { id: 2, slug: "paneer-burger", name: "Paneer Burger", price: 140, description: "Crispy paneer patty sandwiched with sauces and veggies in a bun.", image: "/static/assets/Paneer_Burger.jpg" },
  { id: 3, slug: "chicken-burger", name: "Chicken Burger", price: 160, description: "Juicy chicken patty served inside a bun with fresh veggies and sauces.", image: "/static/assets/Chicken_Burger.jpg" },
  { id: 4, slug: "pepperoni-pizza", name: "Pepperoni Pizza", price: 368, description: "Cheesy pizza topped with spicy slices of pepperoni.", image: "/static/assets/Pepperoni_Pizza.jpeg" },
  { id: 5, slug: "margherita-pizza", name: "Margherita Pizza", price: 330, description: "Classic pizza topped with tomatoes, mozzarella, and basil.", image: "/static/assets/Margherita_Pizza.jpg" },
  { id: 6, slug: "club-sandwich", name: "Club Sandwich", price: 160, description: "Triple-decker sandwich packed with vegetables, cheese, and sauces.", image: "/static/assets/Club_Sandwich.jpg" },
  { id: 7, slug: "grilled-cheese-sandwich", name: "Grilled Cheese Sandwich", price: 120, description: "Classic toasted sandwich with gooey melted cheese.", image: "/static/assets/Grilled_Cheesy_Sandwich.jpg" },
  { id: 8, slug: "veg-wrap", name: "Veg Wrap", price: 130, description: "Fresh vegetables wrapped in a soft roll with sauces.", image: "/static/assets/Veggie_Wrap.jpg" },
  { id: 9, slug: "veggie-sub", name: "Veggie Sub", price: 150, description: "Simple and fresh sub with assorted vegetables.", image: "/static/assets/Veggie_Sub.jpg" },
  { id: 10, slug: "chicken-sub", name: "Chicken Sub", price: 180, description: "A simple, cheesy classic chicken with Mayo between soft bread.", image: "/static/assets/Chicken_Sub.jpeg" },
  { id: 11, slug: "cheese-sandwich", name: "Cheese Sandwich", price: 100, description: "A simple, cheesy classic with melty cheese layered between soft bread.", image: "/static/assets/Ham_Cheese_Sandwich.jpg" },
  { id: 12, slug: "paneer-sandwich", name: "Paneer Sandwich", price: 120, description: "Paneer slices layered inside soft bread with seasonings.", image: "/static/assets/Paneer_Sandwich.jpeg" },
  { id: 13, slug: "egg-sandwich", name: "Egg Sandwich", price: 110, description: "Boiled eggs with seasoning tucked between slices of soft bread.", image: "/static/assets/Egg_Sandwich.jpg" },
  { id: 14, slug: "paneer-kathi-roll", name: "Paneer Kathi Roll", price: 140, description: "Juicy paneer filling wrapped in a paratha with onions.", image: "/static/assets/Paneer_Kathi_Roll.jpg" },
  { id: 15, slug: "chicken-kathi-roll", name: "Chicken Kathi Roll", price: 120, description: "Spiced chicken wrapped in a flaky paratha, packed with Indian flavors.", image: "/static/assets/Chicken_Kathi_Roll.jpg" },
  { id: 16, slug: "paneer-frankie", name: "Paneer Frankie", price: 130, description: "Spiced paneer wrapped in a roll with chutneys and sauces.", image: "/static/assets/Paneer_Frankie.jpg" },
  { id: 17, slug: "chicken-frankie", name: "Chicken Frankie", price: 150, description: "Juicy chicken filling rolled inside a soft flatbread with tangy sauces.", image: "/static/assets/Chicken_Frankie.jpg" },
  { id: 18, slug: "paneer-shawarma", name: "Paneer Shawarma", price: 150, description: "Middle Eastern wrap with Indian paneer twist.", image: "/static/assets/Paneer_Shawarma.jpg" },
  { id: 19, slug: "chicken-shawarma", name: "Chicken Shawarma", price: 170, description: "Spiced chicken wrapped in pita bread with garlic sauce and fresh veggies.", image: "/static/assets/Shawarma_Roll.jpg" },
  { id: 20, slug: "pasta-alfredo", name: "Pasta Alfredo", price: 320, description: "Pasta in creamy white sauce with cheese and herbs.", image: "/static/assets/Pasta_Alfredo.jpg" },
  { id: 21, slug: "pasta-arrabbiata", name: "Pasta Arrabbiata", price: 300, description: "Pasta tossed in spicy red chili-tomato sauce.", image: "/static/assets/Pasta_Arrabbiata.jpg" },
  { id: 22, slug: "onion-uttapam", name: "Onion Uttapam", price: 160, description: "Thick rice pancake topped with onions, chilies, and spices.", image: "/static/assets/Onion_Uttampam.jpg" },
  { id: 23, slug: "vada-pav", name: "Vada Pav", price: 120, description: "Spicy potato fritter served inside a pav bun.", image: "/static/assets/Vada_Pav.jpg" },
  { id: 24, slug: "misal-pav", name: "Misal Pav", price: 160, description: "Spicy sprouted curry topped with farsan, served with pav bread.", image: "/static/assets/Misal_Pav.jpeg" },
  { id: 25, slug: "pani-puri", name: "Pani Puri", price: 100, description: "Crispy puris filled with tangy, spicy water and stuffing.", image: "/static/assets/Pani_Puri.png" },
  { id: 26, slug: "gulab-jamun", name: "Gulab Jamun", price: 150, description: "Soft dumplings soaked in cardamom-flavored sugar syrup, sweet and indulgent.", image: "/static/assets/Gulab_Jamun.jpg" },
  { id: 27, slug: "rasgulla", name: "Rasgulla", price: 140, description: "Spongy cheese balls soaked in sugar syrup.", image: "/static/assets/Rasagulla.jpg" }, 
  { id: 28, slug: "tiramisu", name: "Tiramisu", price: 280, description: "Italian dessert layered with coffee-soaked sponge and mascarpone.", image: "/static/assets/Tiramisu.jpg" },
  { id: 29, slug: "ice-cream-sundae", name: "Ice Cream Sundae", price: 200, description: "Scoops of ice cream topped with sauces, nuts, and toppings.", image: "/static/assets/IceCream_Sundae.jpg" }, ]}
            />
              </div>
              
</div><WorkingHoursSection />
      <Footer />
    </main>
    </>
  )
}
