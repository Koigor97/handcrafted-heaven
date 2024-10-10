import Hero from '../common/Hero';

export default function HeroMain() {
    const imageDesktop = {
        path: "/hero-desktop.png",
        alt: "Limited offer TV Stand",
        width: 610,
        height: 250,
        className: "max-w-[610px] m-auto",
    }

    const imageMobile = {
        path: "/hero-mobile.png",
        alt: "Limited offer TV Stand",
        width: 300,
        height: 123,
        className: "w-full m-auto",
    }
    return (
        <>
            <Hero
            classNameSection="flex flex-col bg-secondary1-800 text-text-50 p-8 items-center gap-5 sm:flex-row sm:justify-center md:p-16 md:gap-10"
            classNameMessage="w-full"
            classNameImage="flex items-center w-full "
            title="Nordic Oak TV Stand"
            description="Elevate your living space with the sleek and modern design of the Nordic Oak TV Stand. Crafted from high-quality oak wood with a natural finish, this minimalist TV stand features spacious drawers and shelves for all your entertainment essentials."
            classNameBtn="bg-background1-900 text-text-50 h-7 md:hover:bg-background md:hover:text-foreground"
            btnAction="Limited Offer"
            pageLink="#"
            imageDesktop={imageDesktop}
            imageMobile={imageMobile}
            />
        </>
    )
}