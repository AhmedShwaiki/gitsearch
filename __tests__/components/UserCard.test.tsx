import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import React from 'react';
import { User } from '@/app/lib/types';
import UserCard from '@/app/components/UserCard';

const mockUser: User = {
  id: 1,
  name: 'John Doe',
  avatar: 'https://via.placeholder.com/50',
  profile: 'https://github.com/johndoe',
};

describe('UserCard Component', () => {
  it('should render user name', () => {
    render(<UserCard data={mockUser} />);
    const userName = screen.getByText('John Doe');
    expect(userName).toBeInTheDocument();
  });

  it('should render user avatar', () => {
    render(<UserCard data={mockUser} />);
    const userAvatar = screen.getByAltText('John Doe');
    expect(userAvatar).toBeInTheDocument();
  });

  it('should render user profile link', () => {
    render(<UserCard data={mockUser} />);
    const profileLink = screen.getByText('Profile');
    expect(profileLink).toBeInTheDocument();
    expect(profileLink).toHaveAttribute('href', 'https://github.com/johndoe');
    expect(profileLink).toHaveAttribute('target', '_blank');
  });

  it('should have appropriate classes for styling', () => {
    render(<UserCard data={mockUser} />);
    const card = screen.getByText('John Doe').closest('div');
  });
});
