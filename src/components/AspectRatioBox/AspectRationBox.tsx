import React from 'react';
import { styled } from '@mui/system';

interface AspectRatioBoxProps {
  ratio: number;
  children: React.ReactNode;
}

const AspectRatioBoxRoot = styled('div')<{ ratio: number }>(
  ({ ratio }) => ({
    position: 'relative',
    width: '100%',
   
    paddingTop: `${(1 / ratio) * 100}%`,
    '& > .content': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    
    },
  })
);

const AspectRatioBox: React.FC<AspectRatioBoxProps> = ({ ratio, children }) => {
  return (
    <AspectRatioBoxRoot ratio={ratio} >
      <div className="content">{children}</div>
    </AspectRatioBoxRoot>
  );
};

export default AspectRatioBox;
