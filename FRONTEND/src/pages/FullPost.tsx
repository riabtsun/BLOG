import { Post, Index, CommentsBlock } from '../components';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IPostProps } from '../components';
import axios from '../axios.ts';

export const FullPost = () => {
  const [postData, setPostData] = useState<IPostProps>();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setPostData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading && !postData) {
    return <Post isLoading={isLoading} />;
  } else {
    return (
      <>
        <Post
          _id={postData?._id}
          title={postData?.title}
          imageUrl={postData?.imageUrl}
          user={postData?.user}
          createdAt={postData?.createdAt}
          viewsCount={postData?.viewsCount}
          commentsCount={3}
          tags={postData?.tags}
          isFullPost
        >
          <p>{postData?.text}</p>
        </Post>
        <CommentsBlock
          items={[
            {
              user: {
                fullName: 'Вася Пупкин',
                avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
              },
              text: 'Это тестовый комментарий 555555',
            },
            {
              user: {
                fullName: 'Иван Иванов',
                avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
              },
              text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
            },
          ]}
          isLoading={false}
        >
          <Index />
        </CommentsBlock>
      </>
    );
  }
};
