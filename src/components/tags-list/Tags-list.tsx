import { Card, Tag } from 'antd';
import { getTags } from 'API/articlesApi';
import React, { useEffect, useState } from 'react';

const TagsList = (props: { setShowTabs: (value: string) => void }) => {
  const { setShowTabs } = props;

  const [tagsList, setTagsList] = useState([]);

  const handleClick = (item: string) => {
    setShowTabs(item);
  };

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
        <Tag key={index} color="lime" onClick={handleClick.bind(this, item)}>
          {item}
        </Tag>
      ))}
    </Card>
  );
};

export default TagsList;
