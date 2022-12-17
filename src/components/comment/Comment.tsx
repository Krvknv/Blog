import { Button } from 'antd';
import { useAppSelector } from 'features/redux';
import React from 'react';
import { TArcticle, TComment } from 'types/types';

import { Typography } from 'antd';

const { Text } = Typography;

import styles from './comment.module.css';
import { NavLink } from 'react-router-dom';
import { modifyDate } from 'features/helpers/modify-date';
import Delete from 'components/icons/Detele';
import { deleteComment } from 'API/articlesApi';

interface ICommentProps {
  comment: TComment;
  articleDta: TArcticle;
  setSend: (value: string) => void;
}

const Comment: React.FC<ICommentProps> = ({ comment, articleDta, setSend }) => {
  const { username, token } = useAppSelector((state) => state.userSlice);

  const handleDeleteComment = async () => {
    const response = await deleteComment(articleDta.slug, comment.id, token);
    setSend(String(response));
  };

  return (
    <div className={styles.comment}>
      <Text className={styles.text}>{comment.body}</Text>

      <div className={styles['comment-footer']}>
        <NavLink to={`/profile/${comment.author.username}`} className={styles.link}>
          <img className={styles.avatar} src={comment.author.image} alt="" />
          <span className={styles.name}>{comment.author.username}</span>
        </NavLink>
        <span className={styles.date}>{modifyDate(comment.createdAt)}</span>
        {comment.author.username === username && (
          <Button
            className={styles.delete}
            type="primary"
            shape="circle"
            icon={<Delete />}
            onClick={handleDeleteComment}
          />
        )}
      </div>
    </div>
  );
};

export default Comment;
