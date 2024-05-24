import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { db } from '@/db/drizzle';
import { postTable } from '@/db/schema';
import { faker } from '@faker-js/faker';
import { desc } from 'drizzle-orm';
import Image from 'next/image';

export default async function Page() {
  const posts = await db
    .select()
    .from(postTable)
    .orderBy(desc(postTable.createdAt));

  return (
    <div className='w-screen h-screen p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-2'>
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <div className='w-9 h-9 rounded-full overflow-hidden relative shrink-0'>
                <Image
                  unoptimized
                  src={post.avatar}
                  width={60}
                  height={60}
                  alt='avatar'
                  className='inset-0 absolute object-cover'
                />
              </div>
              <p className='truncate text-lg'>{post.username}</p>
            </CardTitle>
            <CardDescription className='flex-col flex'>
              <>
                <span>{new Date(post.createdAt!).toLocaleDateString()}</span>
                <span>{post.email}</span>
              </>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='relative aspect-square rounded-xl overflow-hidden'>
              <Image
                unoptimized
                src={post.image}
                fill
                alt='image'
                className='inset-0 absolute object-cover'
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function createRandomUser() {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    createdAt: faker.date.past(),
    image: faker.image.url(),
  };
}
