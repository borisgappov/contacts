import styled from 'styled-components';
import logo from '../../../assets/icon.png';

const BrandWrapper = styled.div`
  display: flex;
  justify-content: center;
  .brand-line {
    display: flex;
    img {
      width: 32px;
      height: 32px;
    }
    .title {
      margin-left: 7px;
      font-size: 22px;
      font-weight: bold;
    }
  }
`;

export default function Brand() {
  return (
    <BrandWrapper>
      <div className="brand-line">
        <div>
          <img src={logo} alt="Contacts" />
        </div>
        <div className="title">Contacts</div>
      </div>
    </BrandWrapper>
  );
}
