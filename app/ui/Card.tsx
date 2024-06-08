import Image from 'next/image';
import React from 'react';

interface CardProps<T> {
    data: T;
}

export interface User {
    id: number;
    name: string;
    avatar: string;
    profile: string;
}

function Card<T extends User>({ data }: CardProps<T>) {
    return (
        <div className="p-4 shadow-sm shadow-border bg-gradient-to-r from-primary to-secondary border border-border rounded flex items-center transform transition-transform duration-200 hover:scale-105 hover:border-accent">
            <Image
                src={data.avatar}
                alt={data.name}
                width={50}
                height={50}
                className="w-12 h-12 rounded-full mr-4"
            />
            <div>
                <h2 className="text-h2">{data.name}</h2>
                <a href={data.profile} className="text-accent hover:text-foreground">Profile</a>
            </div>
        </div>
    );
};

export default Card;
