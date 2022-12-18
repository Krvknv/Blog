import React from 'react';
import { NavLink } from 'react-router-dom';

import { deleteComment } from 'API/articlesApi';
import { Button, Typography } from 'antd';
import { Delete } from 'components/';
import { modifyDate } from 'features/helpers/modify-date';
import { useAppSelector } from 'features/redux';
import { TArcticle, TComment } from 'types/types';

import styles from './comment.module.css';

const { Text } = Typography;

export const Comment = (props: {
  comment: TComment;
  articleDta: TArcticle;
  setSend: (value: string) => void;
}) => {
  const { username, token } = useAppSelector((state) => state.userSlice);

  const { comment, articleDta, setSend } = props;
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
