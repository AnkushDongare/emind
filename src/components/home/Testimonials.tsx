"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { testimonials } from "@/data/data"


const Testimonials = () => {
    return (
        <section className="about py-12 sm:py-16">
            <div className="container mx-auto text-center px-4 sm:px-0">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">Testimonials</h2>
                <Carousel>
                    <CarouselContent>
                        {testimonials.map((testimonial, index) => (
                            <CarouselItem key={index} className="p-6">
                                <p className="text-lg font-semibold text-center">&ldquo;{testimonial.quote}&ldquo;</p>
                                <p className="mt-2 text-sm text-gray-500 text-center">— {testimonial.name}</p>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2" />
                    <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2" />
                </Carousel>
            </div>
        </section>
    )
}
export default Testimonials