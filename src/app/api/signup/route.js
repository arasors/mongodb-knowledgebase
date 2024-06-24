import {NextResponse} from "next/server";
import clientPromise from "@/lib/mongodb";
import CryptoJS from "crypto-js";
import bcrypt from 'bcryptjs';

export async function POST(req) {
    const query = req.nextUrl.searchParams.get("query");
    const data = await req.json();

    const {email, firstName, lastName, password} = data;

    try {
        const client = await clientPromise;
        const db = client.db(process.env.NEXT_PUBLIC_MONGODB_DB);

        const usersCollection = db.collection('users');

        // E-posta adresinin kayıtlı olup olmadığını kontrol edelim
        const existingUser = await usersCollection.findOne({email});
        if (existingUser) {
            return NextResponse.json({code: 'Bu e-mail adresi zaten kayıtlı', isError: true});
        }

        // Şifreyi hashleyelim
        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = {
            email,
            firstName,
            lastName,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
        };

        const result = await usersCollection.insertOne(newUser);

        return NextResponse.json({code: 'Kayıt başarılı', userId: result.insertedId, success: true});
    } catch (error) {
        console.error(error);
        return NextResponse.json({code: 'Kayıt işlemi başarısız', isError: true});
    }
}
