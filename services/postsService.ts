import { Post } from '@/types/models';
import { mockPosts } from '@/data/mockPosts';
import { mockCurrentUser } from '@/data/mockUser';

/**
 * Returns the latest posts, newest first.
 * TODO(firebase): replace with .collection('posts').orderBy('createdAt', 'desc').limit(10)
 */
export async function getLatestPosts(): Promise<Post[]> {
  return Promise.resolve(mockPosts);
}

let nextPostId = mockPosts.length + 1;

/**
 * Creates a new post as the current (mock) user and adds it to the top of
 * the feed. In-memory only — resets on app reload.
 *
 * TODO(firebase): replace the body with
 *   await firestore().collection('posts').add({ authorId, content, createdAt: serverTimestamp(), ... })
 * Everything that calls createPost() (the composer, the modal) stays the same.
 */
export async function createPost(content: string): Promise<Post> {
  const newPost: Post = {
    id: `post-${nextPostId++}`,
    authorName: mockCurrentUser.name,
    authorAvatar: mockCurrentUser.avatar,
    postedAt: 'Just now',
    content,
    likeCount: 0,
    commentCount: 0,
  };
  mockPosts.unshift(newPost);
  return Promise.resolve(newPost);
}