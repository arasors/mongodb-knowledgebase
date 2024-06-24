import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from "@/lib/mongodb";
import bcrypt from 'bcryptjs';


export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {

                const client = await clientPromise;
                const db = client.db(process.env.NEXT_PUBLIC_MONGODB_DB);
                const usersCollection = db.collection('users');

                // Kullanıcıyı e-posta ile bul
                const user = await usersCollection.findOne({ email: credentials.email });
                if (!user) {
                    throw new Error('No user found with the email');
                }

                // Şifreyi doğrula
                const isValid = bcrypt.compareSync(credentials.password, user.password);
                if (!isValid) {
                    throw new Error('Password is incorrect');
                }

                return Promise.resolve({
                    id: user._id.toString(),
                    email: user.email,
                    name: `${user.firstName} ${user.lastName}`
                });
                // try {
                //     const userCredential = await signInWithEmailAndPassword(
                //         auth,
                //         credentials.email,
                //         credentials.password
                //     );
                //
                //
                //     if (userCredential){
                //         return Promise.resolve({
                //             email: credentials?.email,
                //             name: userCredential?.['_tokenResponse']?.displayName,
                //             accessToken: userCredential?.idToken,
                //             id: userCredential?.['_tokenResponse']?.localId
                //         });
                //     } else return null;
                // } catch (error) {
                //     throw new Error('Invalid email or password');
                // }
            },
        }),
        // Facebook({
        //     clientId: process.env.FACEBOOK_AD_CLIENT_ID,
        //     clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        // }),
        // Google({
        //     clientId: process.env.GOOGLE_CLIENT_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // }),
        // Twitter({
        //     clientId: process.env.TWITTER_ID,
        //     clientSecret: process.env.TWITTER_SECRET,
        //     version: "2.0"
        // }),
    ],
    // adapter: FirestoreAdapter({
    //     credential: cert({
    //         projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
    //         clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    //         privateKey: process.env.FIREBASE_PRIVATE_KEY,
    //     }),
    // }),
    pages: {
        signIn: '/auth/signin',
        signUp: '/auth/signup',
        // signOut: '/auth/signout',
    },
    session: {
        jwt: true
    },
    callbacks: {
        jwt: async (prop) => {
            const {token, user} = prop;
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        session: async (session, user) =>  {

            return Promise.resolve(session.token);
        }
    },
    secret: process.env.SECRET_KEY
}
