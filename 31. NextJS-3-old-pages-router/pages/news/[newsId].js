// our-domain.com/news/something-important

import { useRouter } from "next/router";

export default function DetailPage() {
    const router = useRouter();
    const newsId = router.query.newsId;

    console.log(newsId);

    return <h1>Detail Page</h1>;
}
