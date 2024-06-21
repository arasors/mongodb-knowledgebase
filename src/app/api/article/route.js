import clientPromise from '@/lib/mongodb';
import {NextResponse} from "next/server";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export async function GET(req) {
    const slug = req.nextUrl.searchParams.get("slug");
    const query = req.nextUrl.searchParams.get("query");


    const client = await clientPromise;
    const db = client.db(process.env.NEXT_PUBLIC_MONGODB_DB);


    if(slug && slug?.length > 3){
        const article = await db.collection('articles').findOne({ slug: slug });

        return NextResponse.json(article);
    }
    else if (!!query && query.length >= 3) {
        const articles = await db.collection('articles').find({
            title: { $regex: query, $options: 'i' }
        }).limit(5).toArray();

        return NextResponse.json(articles);
    }
    else {
        const articles = await db.collection('articles').aggregate([
            {
                $group: {
                    _id: '$category',
                    articles: {
                        $push: {
                            title: '$title',
                            slug: '$slug'
                        }
                    }
                }
            }
        ]).toArray();

        return NextResponse.json(articles);
    }



}
