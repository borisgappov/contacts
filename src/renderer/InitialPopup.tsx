import { Popup } from 'devextreme-react';
import { Position, ToolbarItem } from 'devextreme-react/popup';
import { useState } from 'react';

export default function InitialPopup() {
  const [popupVisible, setPopupVisible] = useState(true);

  return (
    <Popup
      visible={popupVisible}
      dragEnabled={false}
      closeOnOutsideClick={false}
      showCloseButton={false}
      showTitle
      title="Information"
      container=".dx-viewport"
      width={300}
      height={280}
    >
      <Position at="center" my="center" of={window} />
      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location="before"
        options={{
          icon: 'email',
          text: 'Send',
          onClick: () => {},
        }}
      />
      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location="after"
        options={{
          text: 'Close',
          onClick: () => {
            setPopupVisible(false);
          },
        }}
      />
      <p>Some info</p>
    </Popup>
  );
}
