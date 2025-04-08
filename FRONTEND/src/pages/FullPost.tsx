import { Post, Index, CommentsBlock } from '../components';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../axios.ts';

export const FullPost = () => {
  const [postData, setPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`posts/${id}`)
      .then((res) => {
        setPostData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoading && !postData) {
    return <Post isLoading={isLoading} />;
  } else {
    return (
      <>
        <Post
          _id={postData._id}
          title="Roast the code #1 | Rock Paper Scissors"
          imageUrl="https://i.postimg.cc/hvDLT9b9/https-dev-to-uploads-s3-amazonaws-com-uploads-articles-icohm5g0axh9wjmu4oc3.png"
          user={{
            avatarUrl:
              'https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
            fullName: 'Keff',
          }}
          createdAt={'12 июня 2022 г.'}
          viewsCount={150}
          commentsCount={3}
          tags={['react', 'fun', 'typescript']}
          isFullPost
        >
          <p>
            Hey there! 👋 I'm starting a new series called "Roast the Code", where I will share some code, and let YOU
            roast and improve it. There's not much more to it, just be polite and constructive, this is an exercise so
            we can all learn together. Now then, head over to the repo and roast as hard as you can!!
          </p>
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
