import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import placeholderMan from "../../../public/Placeholder-Man.jpg"

const DATA = 
{title: "", url: "../../../public/Placeholder-Man.jpg"}

export default function CourseCard()
{
    return (
        <Card
        // isFooterBlurred
        radius="lg"
        className="max-w-[200px] border-none">
            <Image alt="Sample Course Image" className="object-cover" width={200} height={200} src={placeholderMan.src} ></Image>
            <CardFooter className="justify-between before:bg-white border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80 text-nowrap pr-1">Available soon.</p>
                <Button className="text-tiny text-white bg-green-600" variant="flat" color="default" radius="sm" size="sm">
                Notify me
                </Button>
            </CardFooter>
        </Card>
    )   
}