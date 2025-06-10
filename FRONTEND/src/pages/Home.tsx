import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { useDispatch, useSelector } from 'react-redux';
import { Post, TagsBlock, CommentsBlock, IPostProps } from '../components';
import { useEffect } from 'react';
import { fetchPosts, fetchTags } from '../redux/slices/posts.ts';
import { AppDispatch, RootState } from '../redux/store.ts';

export interface IComments {
  user: {
    fullName: string;
    avatarUrl: string;
  };
  text: string;
}

const comments = [
  {
    user: {
      fullName: 'Вася Пупкин',
      avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
    },
    text: 'Это тестовый комментарий',
  },
  {
    user: {
      fullName: 'Иван Иванов',
      avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
    },
    text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
  },
];

export const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, tags } = useSelector((state: RootState) => state.posts);

  const uniqueTags = Array.from(new Set(tags.items));

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>

      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((post: IPostProps, index) =>
            isPostsLoading ? (
              <Post isLoading={true} key={index} />
            ) : (
              <Post
                _id={post._id}
                title={post.title}
                imageUrl={post.imageUrl}
                user={post.user}
                createdAt={post.createdAt}
                viewsCount={post.viewsCount}
                commentsCount={3}
                tags={post.tags}
                isEditable
              />
            ),
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={uniqueTags} isLoading={isTagsLoading} />
          <CommentsBlock items={comments} isLoading={false} />
        </Grid>
      </Grid>
    </>
  );
};
