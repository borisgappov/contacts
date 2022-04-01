import styled from 'styled-components';
import Brand from './Brand';

const MessageText = styled.div`
  padding-top: 10px;
`;

export default function Message(props: { text: string }) {
  const { text } = props;
  return (
    <>
      <Brand />
      <MessageText>{text}</MessageText>
    </>
  );
}
