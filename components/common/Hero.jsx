import Link from 'next/link';
import { eb_Garamond, nunito } from '@/app/font';
import { Button } from '../ui/button';
import Image from 'next/image';

export default function Hero({
    classNameSection,
    classNameMessage,
    classNameImage,
    title,
    description,
    classNameBtn,
    pageLink,
    btnAction,
    imageDesktop,
    imageMobile,
}) {
    const {path, alt, width, height, classImgDesk} = imageDesktop;
    const {path: pathMobile, alt: altMobile, width: widthMobile, height: heightMobile, className: classImgMob} = imageMobile;
    return (
    <section className={classNameSection}>
        <div className={classNameMessage}>
            <h2 className={`${eb_Garamond.className} text-2xl font-bold`}>{title}</h2>
            <p className='my-4'>{description}</p>
            <Button asChild size="sm" className={classNameBtn}>
                <Link href={pageLink} className='text-sm md:text-base'>
                    {btnAction}
                </Link>
            </Button>
        </div>
        <div className={classNameImage}>
            <div className="hidden md:block">
                <Image src={path} alt={alt} width={width} height={height} className={classImgDesk}/>
            </div>
            <div className="block md:hidden">
                <Image src={pathMobile} alt={altMobile} width={widthMobile} height={heightMobile} className={classImgMob}/>
            </div>
        </div>
    </section>
  )
}