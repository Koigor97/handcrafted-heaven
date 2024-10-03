import Hero from '../common/Hero';

export default function BannerArrivals() {
    const imageDesktop = {
        path: "/chair-desk.png",
        alt: "Discover Our Latest Arrivals",
        width: 260,
        height: 400,
        className: "w-full m-auto",
    }

    const imageMobile = {
        path: "/chair-mob.png",
        alt: "Discover Our Latest Arrivals",
        width: 130,
        height: 200,
        className: "w-full m-auto",
    }

    return (
        <Hero
        classNameSection="flex flex-col my-4 items-center sm:flex-row sm:justify-center"
        classNameMessage="w-full px-8 md:px-16"
        classNameImage="flex justify-center items-center w-full sm:bg-primary"
        title="Discover Our Latest Arrivals"
        description="Explore fresh designs, unique craftsmanship, and the newest additions to our collection. Handcrafted with care, just for you."
        classNameBtn="bg-background1-900 text-text-50 h-7 md:hover:bg-secondary md:hover:text-text-50"
        pageLink="#"
        btnAction="Shop the Latest"
        imageDesktop={imageDesktop}
        imageMobile={imageMobile}
        />
    )
}