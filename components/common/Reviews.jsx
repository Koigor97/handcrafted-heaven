import Image from "next/image";
import StarRating from './Rating';

export default function Reviews({reviews}) {

    return (
        Array.isArray(reviews) && reviews.length > 0 ? (
            <div className='flex flex-col gap-4 mt-3'>
                <h1 className='font-bold'>Product Reviews</h1>
                {
                    reviews.map((review, i) => {
                        return (
                            <div key={i} className='flex flex-col gap-1'>
                                <div className='flex flex-row gap-2 items-center'>
                                    <Image src={review.user_image_url} alt={review.user_name} width={40} height={40} className='rounded-full'/>
                                    <p>{review.user_name}</p>
                                 </div>
                                 <div className='flex flex-row gap-2 items-center'>
                                    <span>Rating:</span>
                                    <StarRating defaultRating={review.rating} className='pointer-events-none cursor-default' size={20}/>
                                </div>
                                 <p>{review.review_text}</p>
                            </div>
                        )
                    })
                }
            </div>
        ) : (
            <div>
                <h1 className='font-bold'>No Reviews Yet</h1>
            </div>
        )
    )
}