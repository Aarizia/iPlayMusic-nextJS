import Heading from "@/components/heading";
import Link from "next/link";

export default function NotFound() {

    return (
        <>
            <Heading>Sorry</Heading>
            <p>The page you are looking for does not exist.</p>
            <Link href="/">Go back to the front page</Link>
        </>
    );
}