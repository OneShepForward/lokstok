import '../style/App.css';

import QRCode from 'qrcode.react';

import logo from "../image/lokstok_cover_photo.png";

function ItemSticker({ item }) {
 
  return (
    <div className="itemSticker">
      <div className="sticker-container" id={`sticker-${item.id}`}>
        <div className='qr-code'>
          {/* The QR Code will provide the item to fetch in the ItemGet component
              in the format "items/{item.id}" */}
          <QRCode value={`items/${item.id}`} />
        </div>
        <div className='text'>
          <p>Item #: {item.id}</p>
          <p>Part #{item.part.id}: {item.part.description} </p>
        </div> 
        <div className='sticker-imgbox'>
          <img src={logo} alt="LokStok logo" className='sticker-img' />
        </div>
      </div>
    </div>
  );
}

export default ItemSticker;
