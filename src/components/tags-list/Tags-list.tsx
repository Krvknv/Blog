import { Card, Tag } from 'antd';
import { getTags } from 'API/articlesApi';
import React, { useEffect, useState } from 'react';

const TagsList = () => {
  const [tagsList, setTagsList] = useState([]);
  useEffect(() => {
    const request = async () => {
      const tags = await getTags();
      setTagsList(tags);
    };

    request();
  }, []);

  const tagsStyle = {
    width: 1200,
    marginBottom: '20px',
  };

  return (
    <Card title="Popular tags" bordered={true} style={tagsStyle}>
      {tagsList.map((item, index) => (
        <Tag key={index} color="lime">
          {item}
        </Tag>
      ))}
    </Card>
  );
};
export default TagsList;
