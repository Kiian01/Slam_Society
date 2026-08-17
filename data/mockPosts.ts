import { Post } from '@/types/models';

// Placeholder data — replace with a Firestore "posts" query (ordered by
// createdAt, paginated) later.
export const mockPosts: Post[] = [
  {
    id: 'post-1',
    authorName: 'Sarah Miller',
    authorAvatar: 'https://i.pravatar.cc/150?img=47',
    postedAt: '2 hours ago',
    content:
      'Just captured this amazing sunset at the pier. The colors were absolutely unreal! 🌅 #SummerVibes #Photography',
    image: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&q=80',
    likeCount: 1200,
    commentCount: 48,
  },
  {
    id: 'post-2',
    authorName: 'Amma Watson',
    authorAvatar: 'https://i.pravatar.cc/150?img=44',
    postedAt: '5 hours ago',
    content:
      "The community meetup today was electric! So many new ideas for the SLAM platform. Can't wait to share what's next. 🚀",
    likeCount: 856,
    commentCount: 24,
  },
  {
    id: 'post-3',
    authorName: 'Priya Nair',
    authorAvatar: 'https://i.pravatar.cc/150?img=49',
    postedAt: '8 hours ago',
    content:
      'Coffee, good conversation, and new friends — exactly what the Walk and Talk event delivered this morning. Already looking forward to the next one!',
    likeCount: 412,
    commentCount: 19,
  },
  {
    id: 'post-4',
    authorName: 'Jack Nguyen',
    authorAvatar: 'https://i.pravatar.cc/150?img=13',
    postedAt: '1 day ago',
    content:
      'Grateful for this community — met three genuinely great people at the mixer last week. This is exactly the kind of connection I was hoping to find.',
    image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&q=80',
    likeCount: 631,
    commentCount: 33,
  },
  {
    id: 'post-5',
    authorName: 'Emily Zhao',
    authorAvatar: 'https://i.pravatar.cc/150?img=48',
    postedAt: '2 days ago',
    content:
      'Quick reminder: the Women in Business Summit tickets are moving fast. If you were on the fence, this is your sign. See you there! 💼',
    likeCount: 298,
    commentCount: 12,
  },
];