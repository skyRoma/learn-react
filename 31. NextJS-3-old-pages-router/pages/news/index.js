// our-domain.com/news

import Link from "next/link";

export default function NewsPage() {
    return (
        <>
            <h1>Welcome to our news page!</h1>;
            <ul>
                <li>
                    <Link href="/news/something-important">Something Important</Link>
                </li>
                <li>
                    <Link href="/news/another-news-item">Another News Item</Link>
                </li>
            </ul>
        </>
    )

}
