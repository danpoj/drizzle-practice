import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { db } from '@/db/drizzle';
import { postTable } from '@/db/schema';
import { cn } from '@/lib/utils';
import { faker } from '@faker-js/faker';
import { desc } from 'drizzle-orm';
import Image from 'next/image';

const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export default async function Page() {
  const posts = await db
    .select()
    .from(postTable)
    .orderBy(desc(postTable.createdAt));

  return (
    <div
      className={cn(
        'w-screen h-screen p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2'
      )}
    >
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <div
                className={cn(
                  'w-9 h-9 rounded-full overflow-hidden relative shrink-0 bg-slate-100',
                  shimmer
                )}
              >
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
            <div
              className={cn(
                'relative aspect-square rounded-xl overflow-hidden bg-slate-100',
                shimmer
              )}
            >
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
