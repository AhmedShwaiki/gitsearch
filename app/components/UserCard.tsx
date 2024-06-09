import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { User } from '@/app/lib/types';

interface CardProps<T> {
  data: T;
}

function UserCard<T extends User>({ data }: CardProps<T>) {
  return (
    <div className="flex items-center rounded border border-border bg-gradient-to-r from-primary to-secondary p-4 shadow-sm shadow-border duration-200 hover:scale-105 hover:border-accent">
      <Image
        src={data.avatar}
        alt={data.name}
        width={50}
        height={50}
        className="mr-4 h-12 w-12 rounded-full"
      />
      <div>
        <h2 className="text-h2">{data.name}</h2>
        <Link href={data.profile} className="text-accent hover:text-foreground">
          Profile
        </Link>
      </div>
    </div>
  );
}

export default UserCard;
